"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const searchVariants = cva(
  "flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-primary/50",
  {
    variants: {
      variant: {
        default: "bg-white rounded-full",
        secondary: "bg-white rounded-lg",
        tertiary: "bg-muted/50 border border-transparent",
      },
      size: {
        sm: "h-9 px-3 text-small",
        md: "h-9 px-4 text-small",
        lg: "h-9 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type SearchContextValue = {
  query: string;
  deferredQuery: string;
  handleSearch: (value: string) => void;
  clearSearch: () => void;
};

interface SearchProviderProps
  extends VariantProps<typeof searchVariants>,
  React.PropsWithChildren {
  className?: string;
  onSearch?: (query: string) => void;
}

interface SearchLabelProps extends React.PropsWithChildren {
  className?: string;
}

interface SearchIconProps {
  className?: string;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  "aria-label"?: string;
}

interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  showClearButton?: boolean;
  onChange?: (value: string) => void;
}

const SearchContext = React.createContext<SearchContextValue | undefined>(undefined);

function SearchProvider({
  children,
  className,
  variant,
  size,
  onSearch,
}: SearchProviderProps) {
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  React.useEffect(() => {
    onSearch?.(deferredQuery);
  }, [deferredQuery, onSearch]);

  const clearSearch = React.useCallback(() => {
    setQuery("");
    onSearch?.("");
  }, [onSearch]);

  const handleSearch = React.useCallback((value: string) => {
    setQuery(value);
  }, []);

  const value = React.useMemo(
    () => ({ query, deferredQuery, handleSearch, clearSearch }),
    [query, deferredQuery, handleSearch, clearSearch]
  );

  return (
    <SearchContext.Provider value={value}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(searchVariants({ variant, size, className }), "min-w-[200px]")}
        role="search"
        aria-labelledby="search-form-label"
      >
        {children}
      </form>
    </SearchContext.Provider>
  );
}

const SearchLabel = React.forwardRef<HTMLLabelElement, SearchLabelProps>(
  ({ className, children, ...props }, ref) => (
    <Label
      ref={ref}
      id="search-form-label"
      className={cn("sr-only", className)}
      {...props}
    >
      {children}
    </Label>
  )
);

const SearchIcon = React.forwardRef<HTMLButtonElement, SearchIconProps>(
  ({ className, clickable = false, onClick, "aria-label": ariaLabel, ...props }, ref) => {
    const context = useSearchContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      } else if (clickable) {
        // Add default click behavior for search icon if needed
        context.handleSearch(context.query);
      }
    };


    return(
    <button
      ref={ref}
      type={clickable ? "button" : undefined}
      onClick={handleClick}
      className={cn(
        "text-muted-foreground",
        clickable && "cursor-pointer hover:text-foreground transition-colors",
        className
      )}
      aria-label={clickable ? ariaLabel : undefined}
      {...props}
    >
      <Search className="w-4 h-4" />
    </button>
  )}
);

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      placeholder = "Search...",
      showClearButton = true,
      onChange,
      ...props
    },
    ref
  ) => {
    const context = useSearchContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      context.handleSearch(value);
      onChange?.(value);
    };

    return (
      <div className="relative flex-1">
        <input
          ref={ref}
          type="text"
          value={context.query}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent border-none outline-none",
            "placeholder:text-muted-foreground text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {showClearButton && context.query && (
          <button
            type="button"
            onClick={context.clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <span className="sr-only">Clear search</span>
            <span aria-hidden="true" className="text-lg leading-none">×</span>
          </button>
        )}
      </div>
    );
  }
);

function useSearchContext(): SearchContextValue {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "Search components must be used within a SearchProvider. Wrap your search components in <SearchProvider> and try again."
    );
  }
  return context;
}

SearchField.displayName = "SearchField";
SearchIcon.displayName = "SearchIcon";
SearchLabel.displayName = "SearchLabel";

export { SearchProvider, SearchLabel, SearchIcon, SearchField, useSearchContext };