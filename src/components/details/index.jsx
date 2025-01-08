import { cn } from "@/lib/utils";

export const DetailSkeleton = () => {
  return (
    <div>
      <section className="flex gap-2 max-sm:flex-col relative overflow-hidden rounded-md">
        <div className="animate-pulse bg-muted rounded-lg aspect-square min-h-96 min-w-72" />

        <header className="flex flex-col justify-between gap-2 z-10 p-2 w-full">
          <div className="flex flex-col gap-4">
            <div className="animate-pulse bg-muted rounded-lg min-h-6" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={cn("animate-pulse bg-muted rounded-lg min-h-4", {
                    "max-w-[80%]": index === 4,
                  })}
                />
              ))}
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-2 mt-4 w-full">
            {Array.from({ length: 5 })?.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "animate-pulse bg-muted rounded-lg min-h-3 max-w-14 w-full",
                  {
                    "max-w-24": index % 2 === 0,
                  }
                )}
              />
            ))}
          </ul>
        </header>
      </section>
    </div>
  );
};

DetailSkeleton.displayName = "DetailSkeleton";

export function Details({ title, image, description, tags, error }) {
  if (error) {
    return <p>Não encontrado</p>;
  }

  return (
    <div>
      <section className="flex max-sm:flex-col relative overflow-hidden rounded-md">
        <div
          className="w-full h-full absolute top-0 z-0 bg-cover blur-md opacity-20 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div
          className="z-10 min-h-96 min-w-72 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />

        <header className="flex flex-col justify-between gap-2 z-10 p-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm text-foreground text-justify">
              {description}
            </p>
          </div>

          {Array.isArray(tags) && !!tags?.length && (
            <ul className="flex flex-wrap items-center gap-2 mt-4">
              {tags?.map((tag, index) => (
                <li
                  key={index}
                  className="text-xs text-foreground bg-muted rounded-full py-1 px-2"
                >
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </header>
      </section>
    </div>
  );
}

Details.displayName = "Details";
