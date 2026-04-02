import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot='input'
            className={cn(
                "h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm",
                "placeholder:text-gray-500",
                "transition-colors duration-200",
                "focus:outline-none focus:border-black focus:ring-0",
                "dark:border-gray-800 dark:bg-black dark:focus:border-white",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
