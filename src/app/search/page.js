import { Suspense } from "react";

import { ListSkeleton } from "@/components/list/skeleton";
import { MangaList } from "@/components/mangas/mangaList";
import { SearchAnchor } from "@/components/searchAnchor";
import { searchManga, mount } from "@/sdk/api";

export default function Page({ searchParams }) {
  return (
    <div className="flex flex-col gap-12">
      <SearchAnchor />
      <div className="flex flex-col gap-24">
        <Suspense fallback={<ListSkeleton length={12} />}>
          <MangaList
            title="Resultados da busca"
            get={() => searchManga({ name: searchParams?.query })}
            mountList={mount.search}
          />
        </Suspense>
      </div>
    </div>
  );
}
