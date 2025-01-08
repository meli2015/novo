"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

export function CategoriesList({ options }) {
  const pathname = usePathname();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[120px] justify-between">
            Buscar
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="end">
          <List options={options} setOpen={setOpen} currentValue={pathname} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-between">
          Buscar
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <List options={options} setOpen={setOpen} currentValue={pathname} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function List({ options, currentValue, setOpen }) {
  return (
    <Command>
      <CommandInput placeholder="Buscar página..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
        <CommandGroup>
          {options?.map((item) => (
            <CommandItem
              key={item?.href}
              value={item?.href}
              onSelect={(value) => {
                setOpen(false);
              }}
              asChild
              disabled={currentValue.startsWith(item?.href)}
            >
              <Link href={item?.href}>
                {item?.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentValue.startsWith(item?.href)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
