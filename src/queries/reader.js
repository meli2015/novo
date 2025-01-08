import { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParam } from "./config";
import { getChapter } from "@/sdk/api";

export const useReaderQuery = ({ link }) => {
  const Query = useInfiniteQuery({
    enabled: !!link,
    queryKey: ["reader", { link }],
    queryFn: async ({ queryKey, pageParam }) => {
      const [_, { link }] = queryKey;

      const chapter = await getChapter({ link, page: pageParam });

      return chapter;
    },
    staleTime: Infinity,
    keepPreviousData: true,
    initialPageParam: 1,
    placeholderData: {
      pages: [],
      pageParams: [],
    },
    getNextPageParam,
  });

  const loadNextPage = useCallback(() => {
    if (
      Query.isFetched &&
      Query.hasNextPage &&
      !Query.isFetchingNextPage &&
      !Query.isRefetching
    ) {
      Query.fetchNextPage();
    }
  }, [
    Query.isFetched,
    Query.hasNextPage,
    Query.isFetchingNextPage,
    Query.isRefetching,
    Query.fetchNextPage,
  ]);

  return { ...Query, _loadNextPage: loadNextPage };
};
