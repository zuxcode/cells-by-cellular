import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Define the base props for the Header component
type HeaderProps<T extends ElementType = "header"> = {
  as?: T; // Allows customization of the root element
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

/**
 * The `Header` component provides a flexible and reusable container for displaying header content.
 * It can include the title of the page, badges, actions, and more.
 *
 * @example
 * <HeaderRoot>
 *   <HeaderContainer>
 *     <HeaderContent>
 *       <HeaderTitle level={1}>Dashboard</HeaderTitle>
 *       <Badge>New</Badge>
 *     </HeaderContent>
 *     <HeaderActions>
 *       <Button>Refresh</Button>
 *       <DropdownMenu>...</DropdownMenu>
 *     </HeaderActions>
 *   </HeaderContainer>
 * </HeaderRoot>
 *
 * @param {React.ReactNode} children - The content of the header, including nested subcomponents.
 * @returns {React.Element} The rendered Header component.
 */
function HeaderRoot({
  as: Component = "header",
  className,
  children,
  ...props
}: HeaderProps<"header">): React.JSX.Element {
  return <Component className={cn("bg-inherit", className)} {...props} />;
}

/**
 * The `Header.Container` component is a wrapper for organizing header content and actions.
 */
function HeaderContainer({
  className,
  children,
  as: Component = "div",
  ...props
}: HeaderProps<"div">) {
  return (
    <Component
      className={cn(
        "flex flex-col gap-4 md:flex-row md:justify-between md:items-center",
        className
      )}
      {...props}
    />
  );
}

/**
 * The `Header.Content` component is a wrapper for the main content of the header,
 * such as the title and badges.
 */
function HeaderContent({
  className,
  children,
  as: Component = "div",
  ...props
}: HeaderProps<"div">) {
  return (
    <Component
      {...props}
      className={cn("flex items-center gap-4 min-w-0", className)}
    >
      {children}
    </Component>
  );
}

/**
 * The `Header.Actions` component is a wrapper for action elements like buttons and dropdowns.
 */
function HeaderActions({
  className,
  children,
  as: Component = "div",
  ...props
}: HeaderProps<"div">) {
  return (
    <Component
      {...props}
      className={cn("flex flex-wrap gap-2 items-center justify-end", className)}
    >
      {children}
    </Component>
  );
}

/**
 * The `Header.Title` component is used to display the title of the header.
 * It supports different heading levels (h1 to h6) for semantic HTML.
 */
function HeaderTitle({
  className,
  children,
  level = 1,
  as,
  ...props
}: HeaderProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Tag = as || (`h${level}` as const);
  return (
    <Tag
      {...props}
      className={cn(
        "text-2xl font-bold text-gray-800 tracking-wide break-words",
        className
      )}
    >
      {children}
    </Tag>
  );
}

// Type exports for better DX
export type { HeaderProps };

// Export the Header component
export {
  HeaderRoot,
  HeaderContainer,
  HeaderContent,
  HeaderActions,
  HeaderTitle,
};
