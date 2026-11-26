import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-accent text-white",
  secondary: "border border-border bg-background text-foreground",
};

/** 터치 영역 최소 44px 확보 (08) */
export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 text-[15px] font-medium disabled:opacity-40 ${VARIANT_CLASS[variant]} ${className}`}
      {...props}
    />
  );
}
