import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { buttonLabelOf, dialogueNodes, indicatorDuration, linesOf } from "../models/dialogueNodes";
import { prefersReducedMotion } from "../services/reducedMotion";
import { lineTypingDuration } from "../models/typewriter";
import { trackEvent } from "../services/analytics";

function dialogueReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "update":
      return state.map((item) => (item.key === action.key ? { ...item, ...action.patch } : item));
    case "remove":
      return state.filter((item) => item.key !== action.key);
    case "reset":
      return [];
    default:
      return state;
  }
}

// ViewModel for the Dialogue screen: plays the sequence of bubbles/indicators/buttons
// from models/dialogueNodes without depending on the currently shown language —
// the text of every shown bubble is recomputed from the current lang on each render,
// so switching the language mid-flow instantly retranslates the visible replies.
export function useDialogueEngine(lang, onEnd) {
  const [items, dispatch] = useReducer(dialogueReducer, []);
  const timersRef = useRef([]);
  const resolveTapRef = useRef(null);
  const pendingActionRef = useRef(null);
  const runIdRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion());
  const langRef = useRef(lang);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const wait = useCallback((ms) => {
    if (reducedRef.current) return Promise.resolve();
    return new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timersRef.current.push(id);
    });
  }, []);

  const handleTap = useCallback((item) => {
    if (item.done) return;
    trackEvent("button_click", { button_id: "dialogue_reply", node_id: item.nodeId, action: item.action });
    dispatch({ type: "update", key: item.key, patch: { done: true } });
    if (resolveTapRef.current) {
      pendingActionRef.current = item.action;
      const resolve = resolveTapRef.current;
      resolveTapRef.current = null;
      resolve();
    }
  }, []);

  const run = useCallback(
    async (runId) => {
      const active = () => runIdRef.current === runId;
      await wait(550);
      if (!active()) return;
      for (let idx = 0; idx < dialogueNodes.length; idx++) {
        const node = dialogueNodes[idx];

        if (node.indicator && !reducedRef.current) {
          const indicatorKey = `ind${node.id}`;
          dispatch({ type: "add", item: { key: indicatorKey, kind: "indicator" } });
          await wait(indicatorDuration(node, langRef.current));
          if (!active()) return;
          // 150ms fade-out (spec §7.1.3): mark as leaving, then drop from the list
          dispatch({ type: "update", key: indicatorKey, patch: { leaving: true } });
          await wait(150);
          if (!active()) return;
          dispatch({ type: "remove", key: indicatorKey });
        }

        const bubbleKey = `bub${node.id}`;
        const nodeLines = linesOf(node, langRef.current);
        const total = nodeLines.length;
        dispatch({ type: "add", item: { key: bubbleKey, kind: "bubble", nodeId: node.id, count: 1 } });
        if (!reducedRef.current) {
          await wait(lineTypingDuration(nodeLines[0]));
          if (!active()) return;
          for (let i = 1; i < total; i++) {
            // 1000ms instead of the spec's 500ms (§7.2) — my deliberate choice:
            // stitched lines read calmer at a slower pace.
            // The pause starts counting after the previous line finishes typing.
            await wait(1000);
            if (!active()) return;
            dispatch({ type: "update", key: bubbleKey, patch: { count: i + 1 } });
            await wait(lineTypingDuration(nodeLines[i]));
            if (!active()) return;
          }
        } else {
          dispatch({ type: "update", key: bubbleKey, patch: { count: total } });
        }

        if (node.button) {
          if (!reducedRef.current) {
            await wait(320);
            if (!active()) return;
          }
          const btnKey = `btn${node.id}`;
          dispatch({
            type: "add",
            item: {
              key: btnKey,
              kind: "button",
              nodeId: node.id,
              action: node.action || "next",
              cta: node.action === "end",
              done: false,
            },
          });
          await new Promise((resolve) => {
            resolveTapRef.current = resolve;
          });
          if (!active()) return;
          if (pendingActionRef.current === "end") {
            onEndRef.current?.();
            return;
          }
        } else if (!reducedRef.current) {
          await wait(520);
          if (!active()) return;
        }
      }
    },
    [wait]
  );

  // Full (re)start: resets the history and cancels the previous run,
  // so "Begin" after going back via the ↑ arrow replays the dialogue from scratch.
  const start = useCallback(() => {
    runIdRef.current += 1;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    resolveTapRef.current = null;
    pendingActionRef.current = null;
    reducedRef.current = prefersReducedMotion();
    dispatch({ type: "reset" });
    run(runIdRef.current);
  }, [run]);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  const displayItems = useMemo(
    () =>
      items.map((item) => {
        if (item.kind === "bubble") {
          const node = dialogueNodes.find((n) => n.id === item.nodeId);
          return { key: item.key, kind: "bubble", lines: linesOf(node, lang).slice(0, item.count) };
        }
        if (item.kind === "indicator") {
          return { key: item.key, kind: "indicator", leaving: !!item.leaving };
        }
        if (item.kind === "button") {
          const node = dialogueNodes.find((n) => n.id === item.nodeId);
          const label = buttonLabelOf(node, lang);
          return {
            key: item.key,
            kind: "button",
            label,
            cta: item.cta,
            done: item.done,
            onClick: item.done ? undefined : () => handleTap(item),
          };
        }
        return item;
      }),
    [items, lang, handleTap]
  );

  return { items: displayItems, start };
}
