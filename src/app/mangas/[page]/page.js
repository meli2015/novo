import { Suspense } from "react";

import { ListSkeleton } from "@/components/list/skeleton";
import { MangaList } from "@/components/mangas/mangaList";
import { SearchAnchor } from "@/components/searchAnchor";
import { getAllMangas, mount } from "@/sdk/api";

import { title } from "@/metadata/default";

export async function generateMetadata({ params }) {
  const { page } = params;

  return {
    title: title + " | Explorar",
    alternates: {
      canonical: "/mangas/" + page,
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
            title="Explorar"
            get={getAllMangas}
            currentPage={params.page}
            mountList={mount.allMangas}
            paginate
          />
        </Suspense>
      </div>
    </div>
  );
}
