import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SimpleFilterProps {
  onFilterChange: (filterValue: string) => void;
  className?: string;
  placeholder?: string;
  debounceMs?: number;
  width?: string;
}

export const SimpleFilter = ({
  onFilterChange,
  className,
  placeholder = "Search all columns...",
  debounceMs = 500,
  width = "w-[200px]",
}: SimpleFilterProps) => {
  const [filterText, setFilterText] = useState("");
  const [, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedFilterChange = useCallback(
    (value: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        onFilterChange(value);
      }, debounceMs);
    },
    [onFilterChange, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFilterText(value);
      debouncedFilterChange(value);
    },
    [debouncedFilterChange]
  );

  const handleClear = useCallback(() => {
    setFilterText("");
    onFilterChange("");
    inputRef.current?.focus();
  }, [onFilterChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClear();
      }
    },
    [handleClear]
  );

  return (
    <div
      className={cn(
        "relative flex items-center group",
        width,
        "rounded-md",
        "bg-background/5",
        "ring-1 ring-border/10",
        className
      )}
    >
      <Search
        className="absolute left-2 h-3.5 w-3.5 text-muted-foreground/50"
        aria-hidden="true"
      />

      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={filterText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-4 py-1 h-8 w-[22rem] rounded border border-[#ffffff60] focus:border-gray-500 focus:ring focus:ring-gray-300 md:text-[0.85rem]  bg-[#1A1A1A] border-none"
      />

      {filterText && (
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className={cn(
                  "absolute right-1",
                  "h-5 w-5 p-0",
                  "hover:bg-muted/50",
                  "focus-visible:ring-0",
                  "rounded-sm",
                  "transition-colors duration-200"
                )}
              >
                <X className="h-3.5 w-3.5 text-muted-foreground/50" />
                <span className="sr-only">Clear search</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-popover/95 text-xs">
              Clear search (Esc)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
