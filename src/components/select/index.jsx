"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Select({ children, onChange, options }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-36">
        <Button variant="outline">
          {children}
          <span className="sr-only">select</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        {options?.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onChange(option?.value)}
            as={option?.as}
          >
            {option?.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

Select.displayName = "Select";
