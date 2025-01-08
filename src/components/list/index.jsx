"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Manga } from "@/components/manga";
import { cn } from "@/lib/utils";

export const List = ({
  title,
  data,
  error,
  seeMoreHref = null,
  paginate = false,
  pageSize = null,
  totalPages = null,
}) => {
  const currentPage = Number(useParams().page) || 1;

  if (error) {
    return <p>Não encontrado</p>;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground">
          {title}
        </h2>
        {seeMoreHref && (
          <Button asChild variant="ghost">
            <Link href={seeMoreHref}>Ver todos</Link>
          </Button>
        )}
      </div>

      {!data?.length && (
        <p className="text-foreground">Nenhum resultado encontrado</p>
      )}

      {data?.length > 0 && (
        <div className="grid gap-y-12 grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.map((item, index) => (
            <Manga
              key={index}
              published_at={item?.published_at}
              title={item?.title}
              href={item?.href}
              tags={item?.tags}
              image={item?.image}
              link={item?.link}
            />
          ))}
        </div>
      )}

      {paginate && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                firstPage
                href={1}
                className={cn({
                  "cursor-not-allowed pointer-events-none opacity-50":
                    currentPage === 1,
                })}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                href={currentPage - 1}
                className={cn({
                  "cursor-not-allowed pointer-events-none opacity-50":
                    currentPage === 1,
                })}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={currentPage + 1}
                className={cn({
                  "cursor-not-allowed pointer-events-none opacity-50":
                    currentPage === totalPages,
                })}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                lastPage
                href={totalPages}
                className={cn({
                  "cursor-not-allowed pointer-events-none opacity-50":
                    currentPage === totalPages,
                })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

List.displayName = "List";
