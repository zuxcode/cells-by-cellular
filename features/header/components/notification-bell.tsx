import { type LucideIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationBellContextType = {
  hasNotification?: boolean;
  notificationCount?: number;
  notificationColor?: string;
};

const NotificationBellContext = createContext<NotificationBellContextType>({});

function NotificationBellIcon({
  className,
  ...props
}: React.ComponentProps<LucideIcon>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-5 h-5", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

/**
 * Root component for NotificationButton
 *
 * @param hasNotification - Whether to show notification indicator
 * @param notificationCount - Number to display in count badge
 * @param notificationColor - Tailwind class for indicator color
 * @param className - Additional class names
 *
 * @default
 * hasNotification: false
 * notificationColor: "fill-red-500"
 */
const NotificationButtonRoot = ({
  hasNotification,
  notificationCount,
  notificationColor = "fill-red-500",
  className,
  children,
  ...props
}: ButtonProps & NotificationBellContextType) => {
  return (
    <NotificationBellContext.Provider
      value={{ hasNotification, notificationCount, notificationColor }}
    >
      <span className="sr-only">View notifications</span>
      <Button
        size="icon"
        className={cn(
          "relative rounded-full bg-white text-black hover:text-white p-0 w-9 h-9",
          className
        )}
        {...props}
      >
        {children || (
          <>
            <NotificationButton.Icon />
            <NotificationButton.Indicator />
          </>
        )}
      </Button>
    </NotificationBellContext.Provider>
  );
};

/**
 * Icon subcomponent for NotificationButton
 *
 * @example
 * // Custom icon size
 * <NotificationButton.Icon className="w-8 h-8" />
 */
const NotificationButtonIcon = ({ className }: { className?: string }) => {
  return <NotificationBellIcon className={cn("w-5 h-5", className)} />;
};

/**
 * Indicator subcomponent that shows notification status
 *
 * @remarks
 * Automatically switches between dot and count indicators
 * based on notificationCount prop
 *
 * @example
 * // Custom indicator position
 * <NotificationButton.Indicator className="-top-2 -right-2" />
 */
const NotificationButtonIndicator = () => {
  const { hasNotification, notificationCount, notificationColor } = useContext(
    NotificationBellContext
  );

  if (!hasNotification) return null;

  return (
    <>
      {notificationCount ? (
        <span className="absolute right-1 top-1 bg-red-500 rounded-full h-3 w-3 p-2">
          <span
            className={cn(
              "flex items-center justify-center text-center h-full w-full text-[10px] font-medium text-white",
              notificationColor
            )}
          >
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        </span>
      ) : (
        <span
          className={cn(
            "absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full ring-2 ring-white ring-background bg-red-500",
            notificationColor
          )}
        />
      )}
    </>
  );
};

/**
 * Notification button component with indicator capabilities.
 * Composed with subcomponents for flexible customization.
 *
 * @example
 * // Basic usage with dot indicator
 * <NotificationButton hasNotification />
 *
 * @example
 * // With notification count
 * <NotificationButton hasNotification notificationCount={5} />
 *
 * @example
 * // Custom styling
 * <NotificationButton
 *   hasNotification
 *   notificationCount={12}
 *   notificationColor="fill-blue-500"
 *   className="h-10 w-10"
 * >
 *   <NotificationButton.Icon className="w-6 h-6" />
 *   <NotificationButton.Indicator />
 * </NotificationButton>
 *
 * @example
 * // Custom composition
 * <NotificationButton>
 *   <NotificationButton.Icon />
 *   <div className="absolute top-0 right-0">⚠️</div>
 * </NotificationButton>
 */
export const NotificationButton = Object.assign(NotificationButtonRoot, {
  Icon: NotificationButtonIcon,
  Indicator: NotificationButtonIndicator,
});
