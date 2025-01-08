"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = ({ children }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSearch = (event) => {
    event.preventDefault();
    setOpen(false);

    router.push(`/search?query=${searchValue}`, { scroll: true });
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buscar Mangás</DialogTitle>
            <DialogDescription>
              Utilize o campo de busca abaixo e pesquise pelo nome do mangá que
              você está procurando
            </DialogDescription>
          </DialogHeader>

          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Digite o nome do mangá"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" onClick={onSearch}>
                Buscar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Buscar Mangás</DrawerTitle>
          <DrawerDescription>
            Utilize o campo de busca abaixo e pesquise pelo nome do mangá que
            você está procurando
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Digite o nome do mangá"
          />
        </DrawerBody>

        <DrawerFooter className="pt-8">
          <DrawerClose asChild>
            <Button variant="secondary" onClick={onSearch}>
              Buscar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

Search.displayName = "Search";
