import { TypewriterLine } from "./TypewriterLine";

export function MessageBubble({ lines }) {
  return (
    <div className="flex max-w-[88%] flex-col gap-2.5 self-start animate-[softIn_0.15s_ease-out_both] rounded-2xl border-[3px] border-border-primary bg-bg-surface px-[22px] py-[18px] shadow-neo-flat">
      {lines.map((line, i) => (
        <TypewriterLine
          key={i}
          text={line}
          className="text-pretty m-0 font-sans text-[clamp(16px,2.7vw,17px)] leading-[1.6] text-text-primary"
        />
      ))}
    </div>
  );
}
