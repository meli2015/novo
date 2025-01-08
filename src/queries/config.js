export const getNextPageParam = (lastPage) => {
  return lastPage?.nextPageNumber ?? null;
};