import { Suspense } from "react";

import { ListSkeleton } from "@/components/list/skeleton";
import { MangaList } from "@/components/mangas/mangaList";
import { SearchAnchor } from "@/components/searchAnchor";
import { getRecent, mount } from "@/sdk/api";

import { title } from "@/metadata/default";

export async function generateMetadata({ params }) {
  const { page } = params;

  return {
    title: title + " | Recentes",
    alternates: {
      canonical: "/recents/" + page,
    },
  };
}

export default function Page({ params }) {
  return (
    <div className="flex flex-col gap-12">
      <SearchAnchor />
      <div className="flex flex-col gap-24">
        <Suspense fallback={<ListSkeleton length={12} />}>
          <MangaList
            title="Últimas atualizações"
            get={getRecent}
            currentPage={params.page}
            mountList={mount.recent}
            paginate
          />
        </Suspense>
      </div>
    </div>
  );
}
