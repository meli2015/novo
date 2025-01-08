import { getMangaDetails, getMangaChapters, mount } from "@/sdk/api";
import { Details, DetailSkeleton } from "@/components/details";
import {
  ListChapters,
  ListChaptersSkeleton,
} from "@/components/mangas/listChapters";

export const MangaDetailsSkeleton = () => {
  return (
    <div>
      <DetailSkeleton />
      <ListChaptersSkeleton />
    </div>
  );
};

MangaDetailsSkeleton.displayName = "MangaDetailsSkeleton";

export async function MangaDetails({ link }) {
  const [detailsResponse, chaptersResponse] = await Promise.all([
    getMangaDetails({ link }),
    getMangaChapters({ link }),
  ]);

  const details = mount.mangaDetails(detailsResponse);
  const chapters = mount.mangaChapters(chaptersResponse);

  return (
    <div>
      <Details {...details?.data} error={details?.error} />
      <ListChapters data={chapters?.data} error={chapters?.error} />
    </div>
  );
}

MangaDetails.displayName = "MangaDetails";
