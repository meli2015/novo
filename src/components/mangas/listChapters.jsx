"use client";

import { useChapterStore } from "@/store/chapter";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/select";

const orderOptions = [
  { name: "Antigo", value: "asc" },
  { name: "Recente", value: "desc" },
];

const limitOptions = [
  { name: "Todos", value: undefined },
  { name: "10 itens", value: 10 },
  { name: "15 itens", value: 15 },
  { name: "20 itens", value: 20 },
];

const defaultLimit = 10;
const defaultOrder = "asc";

export const ListChaptersSkeleton = () => {
  return (
    <div className="mt-4">
      <header>
        <div className="animate-pulse bg-muted rounded-lg h-6 w-full max-w-44" />
      </header>
      <ul className="flex flex-col gap-2 mt-4">
        {Array.from({ length: defaultLimit })?.map((_, index) => (
          <div key={index} className="animate-pulse bg-muted rounded-lg h-10" />
        ))}
      </ul>
    </div>
  );
};

ListChaptersSkeleton.displayName = "ListChaptersSkeleton";

export const ListChapters = ({ data, error }) => {
  const { readChapter } = useChapterStore();

  const [limit, setLimit] = useState(defaultLimit);
  const [displayLimit, setDisplayLimit] = useState(defaultLimit);
  const [order, setOrder] = useState(defaultOrder);

  const seeMore = useCallback(() => {
    setLimit((prev) => {
      const next = prev * 2;
      return next > data?.length ? data?.length : next;
    });
  }, [data?.length]);

  if (error) {
    return <p>Nada encontrado</p>;
  }

  return (
    <div className="mt-4">
      <header className="flex flex-col gap-2 sticky top-16 z-20 bg-background py-4">
        <h2 className="text-lg text-muted-foreground font-bold">Capítulos</h2>
        <div className="self-start flex items-center gap-2 flex-wrap">
          <Select value={order} onChange={setOrder} options={orderOptions}>
            <span className="text-muted-foreground mr-2">Ordenar:</span>
            {orderOptions.find((item) => item?.value === order)?.name}
          </Select>
          <Select
            value={displayLimit}
            onChange={(value) => {
              setLimit(value);
              setDisplayLimit(value);
            }}
            options={limitOptions}
          >
            <span className="text-muted-foreground mr-2">Exibir:</span>
            {limitOptions.find((item) => item?.value === displayLimit)?.name}
          </Select>
        </div>
      </header>

      <ul className="flex flex-col gap-2 mt-4">
        {data
          ?.sort((a, b) => {
            if (order === "asc") {
              return a?.id - b?.id;
            }
            return b?.id - a?.id;
          })
          ?.slice(0, limit)
          ?.map((item) => (
            <li
              key={item?.id}
              className="cursor-pointer flex flex-col bg-muted p-2 pl-4 rounded-md relative overflow-hidden shadow-sm hover:underline"
              onClick={() =>
                readChapter({ link: item?.link, title: item?.title })
              }
            >
              <div className="w-1 h-full absolute top-0 left-0 bg-muted-foreground" />
              <p className="text-foreground">{item?.title}</p>
            </li>
          ))}
      </ul>

      {data?.length > 0 && limit < data?.length && (
        <div className="flex justify-center mt-12">
          <Button onClick={seeMore}>Ver mais</Button>
        </div>
      )}
    </div>
  );
};

ListChapters.displayName = "ListChapters";
