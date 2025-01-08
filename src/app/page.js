import { Suspense } from "react";

import { ListSkeleton } from "@/components/list/skeleton";
import { MangaList } from "@/components/mangas/mangaList";

import { getRecent, getClassified, getAllMangas, mount } from "@/sdk/api";
import { SearchAnchor } from "@/components/searchAnchor";

const listSize = 6;

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <SearchAnchor />
      <div className="flex flex-col gap-24">
        <Suspense fallback={<ListSkeleton length={listSize} />}>
          <MangaList
            title="Recentes"
            renderData={(data) =>
              data.sort(() => Math.random() - Math.random()).slice(0, listSize)
            }
            get={getRecent}
            mountList={mount.recent}
            href="/recents/1"
          />
        </Suspense>

        <Suspense fallback={<ListSkeleton length={12} />}>
          <MangaList
            title="Classificados"
            get={getClassified}
            mountList={mount.classified}
          />
        </Suspense>

        <Suspense fallback={<ListSkeleton length={listSize} />}>
          <MangaList
            title="Explorar"
            get={getAllMangas}
            mountList={mount.allMangas}
            href="/mangas/1"
            renderData={(data) =>
              data.sort(() => Math.random() - Math.random()).slice(0, listSize)
            }
          />
        </Suspense>
      </div>
      <SearchAnchor />
    </div>
  );
}
