export const ListSkeleton = ({ length }) => {
  return (
    <div className="grid gap-y-12 grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="animate-pulse bg-muted rounded-t-lg h-72"></div>
      ))}
    </div>
  );
};

ListSkeleton.displayName = "ListSkeleton";
