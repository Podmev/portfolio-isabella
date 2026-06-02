import Image from "next/image";

export default function PortfolioPortrait({ src, alt, priority = false }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_22px_70px_rgba(24,20,18,0.16)]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={760}
          height={940}
          priority={priority}
          className="aspect-[4/5] h-full w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] items-center justify-center bg-surface-soft p-8 text-center text-sm text-muted-foreground">
          {alt}
        </div>
      )}
    </div>
  );
}
