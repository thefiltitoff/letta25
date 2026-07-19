import tattoo from "../assets/tattoo-sun-moon.png";

export function StartScreen({ t, begin }) {
  return (
    <section className="absolute inset-0 flex animate-[screenIn_0.45s_ease-out_both] flex-col justify-center overflow-x-hidden overflow-y-auto py-[110px]">
      <img
        src={tattoo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[76px] w-14 -translate-x-1/2 object-contain opacity-50 dark:brightness-0 dark:invert"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[83%] top-[30%] h-[15px] w-11 rotate-[16deg] animate-[floaty_6s_ease-in-out_infinite] bg-brand-pink opacity-70 [--r:16deg]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-[36%] h-[15px] w-[15px] rounded-full bg-brand-pink opacity-70"
      />
      <svg
        aria-hidden="true"
        width="26"
        height="26"
        viewBox="0 0 30 30"
        fill="var(--brand-yellow)"
        className="pointer-events-none absolute bottom-[16%] left-[8%] animate-[floaty_7s_ease-in-out_infinite] opacity-75 [--r:-12deg]"
      >
        <path d="M15 0l2.3 6.3L22.5 2l-1.1 6.6L28 7.5l-4.3 5.2L30 15l-6.3 2.3L28 22.5l-6.6-1.1L22.5 28l-5.2-4.3L15 30l-2.3-6.3L7.5 28l1.1-6.6L2 22.5l4.3-5.2L0 15l6.3-2.3L2 7.5l6.6 1.1L7.5 2l5.2 4.3z" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[16%] left-[88%] h-[13px] w-7 rotate-[28deg] rounded-full bg-deco-sage opacity-80"
      />
      <svg
        aria-hidden="true"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--border-primary)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        className="pointer-events-none absolute bottom-[20%] left-[63%] animate-[floaty_8s_ease-in-out_infinite] opacity-60 [--r:8deg]"
      >
        <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
      </svg>

      <div className="relative z-10 mx-auto w-[min(560px,calc(100%-48px))]">
        <h1 className="m-0 whitespace-pre-line text-balance font-sans text-[clamp(34px,8.8vw,49px)] font-bold leading-[1.05] tracking-[-0.015em] text-text-primary">
          {t.startTitle}
        </h1>
        <div className="mt-4 inline-block -rotate-[1.2deg] rounded-md bg-brand-yellow px-3 py-0.5">
          <span className="font-script text-[clamp(30px,8vw,40px)] font-bold leading-none text-[#3C2E2A]">
            {t.accent}
          </span>
        </div>
        <p className="mt-7 max-w-[34ch] text-pretty font-sans text-[clamp(17px,4.6vw,20px)] leading-[1.5] text-text-secondary">
          {t.sub}
        </p>
        <div className="mt-11">
          <button
            type="button"
            onClick={begin}
            className="cursor-pointer rounded-lg border-[3px] border-border-primary bg-brand-yellow px-11 py-[17px] font-sans text-lg font-semibold text-[#3C2E2A] shadow-neo-flat transition-[transform,box-shadow,background-color] duration-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-brand-yellow-hover hover:shadow-[2px_2px_0_0_var(--border-primary)] active:translate-x-1 active:translate-y-1 active:bg-brand-yellow-active active:shadow-none"
          >
            {t.startBtn}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={begin}
        aria-label={t.aria.next}
        className="absolute bottom-10 left-1/2 z-10 h-11 w-11 -translate-x-1/2 animate-[bob_2.2s_ease-in-out_infinite] cursor-pointer rounded-full border-none bg-transparent text-lg font-bold text-text-primary shadow-[inset_0_0_0_2.5px_var(--border-primary)] md:h-12 md:w-12"
      >
        ↓
      </button>
    </section>
  );
}
