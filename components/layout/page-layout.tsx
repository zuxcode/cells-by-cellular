import { cn } from "@/lib/utils";
import { Element } from "@/types/global-type";

function PageLayout({ className, children, as: Layout = 'div', ...props }: Element<"div">) {
  return (
    <Layout
      className={cn(
          "w-full p-4 flex flex-col gap-4 bg-canvas-cool",
          "md:pl-11 ", // median screen
        className
      )}
      {...props}
    >
      {children}
    </Layout>
  );
}

export { PageLayout };
