"use client";

import { Fragment, useCallback, useState, useEffect, useRef } from "react";
import { useChapterStore } from "@/store/chapter";
import { useReaderQuery } from "@/queries/reader";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewportList } from "react-viewport-list";

import { MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_SCALE = 2;
const MIN_SCALE = 0.5;
const SCALE_RATIO = 0.1;

export const ReadChapterRoot = () => {
  const ref = useRef(null);
  const endListRef = useRef(null);
  const { link, title, reset } = useChapterStore();

  const { data, isFetched, isFetchingNextPage, hasNextPage, _loadNextPage } =
    useReaderQuery({ link });

  const [scale, setScale] = useState(1);

  const increase = useCallback(() => {
    if (scale >= MAX_SCALE) return;
    setScale((prev) => prev + SCALE_RATIO);
  }, [scale]);

  const decrease = useCallback(() => {
    if (scale <= MIN_SCALE) return;
    setScale((prev) => prev - SCALE_RATIO);
  }, [scale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          _loadNextPage();
        }
      },
      { threshold: 0.4 }
    );

    if (endListRef.current) observer.observe(endListRef.current);

    return () => {
      if (endListRef.current) observer.unobserve(endListRef.current);
    };
  }, [_loadNextPage]);

  return (
    <Dialog open={!!link} onOpenChange={reset}>
      <DialogTrigger className="hidden" asChild />
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="md:w-[70%] w-[94%] max-w-full h-[94%] overflow-hidden"
      >
        {!isFetched ? (
          <div className="h-full w-full flex justify-center items-center">
            <div className={cn("flex justify-center items-center my-2")}>
              <Spinner className="mx-auto w-8 h-8" />
            </div>
          </div>
        ) : (
          <Fragment>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <ScrollArea
              className="h-full w-full transition-all relative mx-auto"
              ref={ref}
            >
              <ViewportList viewportRef={ref} items={data?.pages}>
                {(chapter, index) => (
                  <div
                    key={index}
                    style={{ width: `${scale * 100}%` }}
                    className="transition-all"
                  >
                    <p className="text-muted-foreground my-2 text-xs font-bold uppercase">
                      {chapter?.title?.split("-").slice(-1).join("")}
                    </p>
                    <img
                      lazy
                      className="select-none pointer-events-none w-full h-full transition-transform origin-top"
                      src={chapter?.images?.[0]?.img}
                    />
                  </div>
                )}
              </ViewportList>
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                <Button
                  size="icon"
                  onClick={decrease}
                  disabled={scale <= MIN_SCALE}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <span className="p-2 bg-border rounded-md">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  size="icon"
                  onClick={increase}
                  disabled={scale >= MAX_SCALE}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>
              {!!isFetched && !!isFetchingNextPage && !!hasNextPage && (
                <div className={cn("flex justify-center items-center my-2")}>
                  <Spinner className="mx-auto w-8 h-8" />
                </div>
              )}
              <div ref={endListRef} className="h-6 w-full" />
            </ScrollArea>
          </Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

ReadChapterRoot.displayName = "ReadChapterRoot";
