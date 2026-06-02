export default function Section({
  id,
  className = "",
  children,
  containerClassName = "",
  sectionClassName = "py-16 md:py-24",
}) {
  return (
    <section id={id} className={`${sectionClassName} ${className}`}>
      <div className={`mx-auto max-w-6xl px-6 ${containerClassName}`}>{children}</div>
    </section>
  );
}
