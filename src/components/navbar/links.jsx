import { CategoriesList } from "@/components/categoriesList";

export function Links() {
  return (
    <CategoriesList
      options={[
        { name: "Recentes", href: "/recents/1" },
        { name: "Todos", href: "/mangas/1" },
      ]}
    />
  );
}

Links.displayName = "Links";
