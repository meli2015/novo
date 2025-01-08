import { Suspense } from "react";

import {
  MangaDetails,
  MangaDetailsSkeleton,
} from "@/components/mangas/mangaDetails";

import { getMangaDetails, mount } from "@/sdk/api";
import { description, title } from "@/metadata/default";

export async function generateMetadata({ searchParams }) {
  const { link } = searchParams;

  const detailsResponse = await getMangaDetails({ link });
  const details = mount.mangaDetails(detailsResponse);

  const _title =
    title +
    " | " +
    (!!details?.error ? "404 - Não encontrado" : details?.data?.title);
  const _description = !!details?.error
    ? description
    : details?.data?.description;

  return {
    title: _title,
    description: _description,
    alternates: {
      canonical: "/details?link=" + link,
    },
    openGraph: {
      title: _title,
      description: _description,
      siteName: "Mangás Livre",
      images: [
        {
          url: details?.data?.image,
          width: 580,
          height: 580,
        },
      ],
    },
    twitter: {
      title: _title,
      description: _description,
      card: "summary_large_image",
      images: details?.data?.image,
    },
  };
}

export default function Page({ searchParams }) {
  return (
    <div className="flex flex-col gap-24">
      <Suspense fallback={<MangaDetailsSkeleton />}>
        <MangaDetails link={searchParams?.link} />
      </Suspense>
    </div>
  );
}
