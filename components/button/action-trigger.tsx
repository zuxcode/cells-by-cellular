"use client";

import { Loader2, Plus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

// Size-to-icon mapping
const interactionIconSizes = {
  compact: 14,
  standard: 16,
  prominent: 18,
} as const;

// Interaction variants
const interactionButtonVariants = cva(
  "group/interaction-button inline-flex items-center gap-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      intent: {
        commit:
          "bg-green-forest text-white hover:text-white/90 hover:bg-green-forest/90",
        auxiliary: "rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200",
      },
      density: {
        compact: "text-sm px-3 py-1.5",
        standard: "text-base px-4 py-2",
        prominent: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      intent: "commit",
      density: "standard",
    },
  }
);

type ActionTriggerProps = ButtonProps &
  VariantProps<typeof interactionButtonVariants> & {
    /**
     * Indicates ongoing processing state
     * @defaultValue false
     */
    isProcessing?: boolean;
  };

type ActionIndicatorProps = ComponentPropsWithoutRef<"svg"> & {
  /**
   * Visual symbol for the action
   * @defaultValue Plus
   */
  symbol?: ElementType;
  /**
   * Custom symbol sizing override
   * @defaultValue Derived from density
   */
  symbolSize?: number;
};

type ActionLabelProps = ComponentPropsWithoutRef<"span">;

const DensityContext =
  React.createContext<keyof typeof interactionIconSizes>("standard");

const useActionDensity = () => {
  return React.useContext(DensityContext);
};

/**
 * Primary component for initiating user-driven actions
 *
 * @example
 * <ActionTrigger intent="commit" density="prominent">
 *   <ActionTriggerIndicator symbol={Plus} />
 *   <ActionTriggerLabel>Confirm Order</ActionTriggerLabel>
 * </ActionTrigger>
 */
const ActionTrigger = forwardRef<HTMLButtonElement, ActionTriggerProps>(
  ({ intent, density, className, children, isProcessing, ...props }, ref) => (
    <DensityContext.Provider value={density || "standard"}>
      <Button
        ref={ref}
        variant="ghost"
        size="lg"
        className={cn(
          interactionButtonVariants({ intent, density, className }),
          isProcessing && "pointer-events-none opacity-70"
        )}
        aria-disabled={isProcessing}
        {...props}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
           <Loader2 className="animate-spin" />
          <span className="animate-pulse">Processing...</span>
          </span>
        ) : (
          children
        )}
      </Button>
    </DensityContext.Provider>
  )
);

/**
 * Visual indicator for the action type
 *
 * @example
 * <ActionTrigger.Indicator symbol={Check} className="text-success" />
 */
const ActionIndicator = forwardRef<SVGSVGElement, ActionIndicatorProps>(
  (
    { symbol: SymbolComponent = Plus, symbolSize, className, ...props },
    ref
  ) => {
    const density = useActionDensity();
    const calculatedSize =
      symbolSize || interactionIconSizes[density || "standard"];

    return (
      <SymbolComponent
        ref={ref}
        className={cn(
          "shrink-0 transition-colors group-hover/interaction-button:text-current",
          className
        )}
        size={calculatedSize}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

/**
 * Descriptive text for the action
 *
 * @example
 * <ActionTrigger.Label className="font-semibold">Submit</ActionTrigger.Label>
 */
const ActionLabel = forwardRef<HTMLSpanElement, ActionLabelProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("truncate font-medium text-sm", className)}
      {...props}
    />
  )
);

// Display names for DevTools
ActionTrigger.displayName = "ActionTrigger";
ActionIndicator.displayName = "ActionTrigger.Indicator";
ActionLabel.displayName = "ActionTrigger.Label";

export { ActionTrigger, ActionIndicator, ActionLabel, useActionDensity };

export type { ActionTriggerProps, ActionIndicatorProps, ActionLabelProps };
