import Link from "next/link";
import { cn } from "@/lib/utils";

export const Manga = ({ published_at, href, title, tags, image, link }) => {
  const Action = href ? Link : "div";
  const actionProps = href
    ? { href: href, prefetch: false }
    : {
        onClick: () => console.log(link),
        className: "cursor-pointer",
      };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-lg flex flex-col gap-1",
        actionProps?.className
      )}
    >
      <Action {...actionProps} className="absolute inset-0 z-30">
        <span className="sr-only">View Manga</span>
      </Action>
      <div className="relative overflow-hidden">
        {published_at && (
          <span className="absolute top-2 left-2 text-xs text-white bg-violet-600 rounded-md px-1 py-0.5">
            {published_at}
          </span>
        )}
        <div
          className="w-full h-72 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="absolute h-10 z-20 bottom-0 w-full bg-gradient-to-t from-background p-2"></div>
      </div>
      <p className="text-sm text-foreground font-bold">{title}</p>
      {Array.isArray(tags) && !!tags?.length && (
        <ul className="flex flex-wrap items-center gap-2 mt-2">
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
    </div>
  );
};
