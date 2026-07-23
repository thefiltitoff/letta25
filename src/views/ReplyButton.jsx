export function ReplyButton({ label, cta, done, onClick }) {
  const wrapClass = `flex justify-end ${cta ? "mt-1.5" : ""}`;
  const baseClass = "rounded-lg border-[3px] border-border-primary bg-brand-yellow font-sans font-semibold text-[#3C2E2A]";

  if (done) {
    return (
      <div className={wrapClass}>
        <button
          type="button"
          disabled
          className={`${baseClass} cursor-default opacity-70 shadow-none ${
            cta
              ? "translate-x-[5px] translate-y-[5px] px-[34px] py-[18px] text-xl font-bold"
              : "translate-x-1 translate-y-1 px-[22px] py-[13px] text-base"
          }`}
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div className={`${wrapClass} animate-[fadeRise_0.2s_ease-out_both]`}>
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} cursor-pointer transition-[transform,box-shadow,background-color] duration-100 hover:bg-brand-yellow-hover active:bg-brand-yellow-active ${
          cta
            ? "px-[34px] py-[18px] text-xl font-bold shadow-[5px_5px_0_0_var(--border-primary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--border-primary)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
            : "px-[22px] py-[13px] text-base shadow-neo-flat hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--border-primary)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
