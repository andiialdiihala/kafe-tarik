import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: SectionTitleProps) {
  return (
    <div>
      <span
        className={cn(
          "mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]",
          light ? "text-white/70" : "text-kopte-green"
        )}
      >
        {eyebrow}
      </span>

      <h2
        className={cn(
          "font-bold leading-[0.98] tracking-[-0.03em]",
          "text-[36px] sm:text-[42px] lg:text-[48px]",
          light ? "text-white" : "text-kopte-dark"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-[470px] text-sm leading-7",
            light ? "text-white/70" : "text-kopte-text/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}