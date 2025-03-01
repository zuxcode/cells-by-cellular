import { cn } from "@/lib/utils";
import { Element } from "@/types/global-type";

function Container({ as: Comp = "div", className, ...props }: Element<"div">) {
  return <Comp className={cn("space-y-3 w-4/5", className)} {...props} />;
}

function Paragraph({ as: Comp = "p", className, ...props }: Element<"p">) {
  return <Comp className={cn("text-black text-xs", className)} {...props} />;
}

function Title({ as: Comp = "h5", className, ...props }: Element<"h5">) {
  return (
    <Comp
      className={cn("text-black font-semibold text-sm", className)}
      {...props}
    />
  );
}

function BlockLayout({
  as: Comp = "form",
  className,
  ...props
}: Element<"form">) {
  return <Comp className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 h-auto", className)} {...props} />;
}

export { BlockLayout, Container, Paragraph, Title };
