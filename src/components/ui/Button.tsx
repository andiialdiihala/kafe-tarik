import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline";
  icon?: boolean;
}

export function Button({
  children,
  href,
  className,
  variant = "primary",
  icon = true,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200",
    variant === "primary" &&
      "bg-kopte-light text-kopte-dark hover:-translate-y-0.5 hover:bg-white",
    variant === "outline" &&
      "border border-kopte-dark text-kopte-dark hover:bg-kopte-dark hover:text-white",
    className
  );

  const content = (
    <>
      <span>{children}</span>

      {icon && <ArrowRight size={17} strokeWidth={2} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={styles}>
      {content}
    </button>
  );
}