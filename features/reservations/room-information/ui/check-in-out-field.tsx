// "use client";

// import { FormControl, FormField, FormItem } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { useFormContext } from "react-hook-form";

// function CheckInOutField() {
//   const method = useFormContext();

//   return (
//     <div className="w-1/2 space-y-1">
//       <p className="text-xs text-neutral-600 font-semibold">
//         Check In-Out Date
//       </p>
//       <FormField
//         control={method.control}
//         name="checkInOutDate"
//         render={({ field }) => (
//           <FormItem className="">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant={"outline"}
//                     className="bg-[#F4F5F7] border-[#D9D9D9] text-[#696969] w-full"
//                   >
//                     {field.value?.from ? (
//                       field.value.to ? (
//                         `${format(field.value.from, "d/MM")} - ${format(field.value.to, "d/MM/yy")}`
//                       ) : (
//                         format(field.value.from, "d/MM/y")
//                       )
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="range"
//                   fixedWeeks
//                   min={2}
//                   selected={field.value}
//                   onSelect={field.onChange}
//                   disabled={{ before: new Date() }}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }

// export { CheckInOutField };




"use client";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

// Type definition for date range
type DateRange = {
  from: Date;
  to: Date;
} | undefined;

function CheckInOutField() {
  const { control } = useFormContext();
  
  // Memoized date format function
  const formatDateRange = (range: DateRange) => {
    if (!range?.from) return "Pick a date";
    if (!range?.to) return format(range.from, "dd/MM/yyyy");
    return `${format(range.from, "dd/MM/yyyy")} - ${format(range.to, "dd/MM/yyyy")}`;
  };

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-neutral-600">
        Check In-Out Date
      </p>
      <FormField
        control={control}
        name="checkInOutDate"
        render={({ field }) => {
          const displayText = useMemo(
            () => formatDateRange(field.value),
            [field.value]
          );

          return (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full bg-background text-foreground",
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      aria-label="Select check-in and check-out dates"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {displayText}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={{ before: new Date() }}
                    initialFocus
                    numberOfMonths={2}
                    min={2}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}

export { CheckInOutField };
