import { cn } from "@/lib/utils";
import type { Element } from "@/types/global-type";

function SectionContainer({
  children,
  className,
  as: Component = "div",
  ...props
}: Element<"div">) {
  return (
    <Component className={cn("flex justify-between", className)} {...props}>
      {children}
    </Component>
  );
}

function SectionContent({
  children,
  className,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-1/2", className)}>{children}</div>;
}

function SectionParagraph({
  children,
  className,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-neutral-600 text-pretty", className)}>
      {children}
    </p>
  );
}

export { SectionContainer, SectionContent, SectionParagraph };
