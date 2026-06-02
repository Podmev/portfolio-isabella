export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl leading-tight md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
