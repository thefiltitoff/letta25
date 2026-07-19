export function TypingIndicator({ leaving }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-1.5 self-start rounded-full border-[2.5px] border-border-primary bg-bg-surface px-4 py-3 shadow-neo-flat ${
        leaving ? "animate-[softOut_0.15s_ease-in_both]" : "animate-[softIn_0.15s_ease-out_both]"
      }`}
    >
      <span className="h-2 w-2 animate-[dotBounce_0.9s_ease-in-out_infinite] rounded-full bg-text-secondary" />
      <span className="h-2 w-2 animate-[dotBounce_0.9s_ease-in-out_0.16s_infinite] rounded-full bg-text-secondary" />
      <span className="h-2 w-2 animate-[dotBounce_0.9s_ease-in-out_0.32s_infinite] rounded-full bg-text-secondary" />
    </div>
  );
}
