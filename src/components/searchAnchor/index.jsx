import { Search } from "@/components/mangas/search";
import { Button } from "@/components/ui/button";

export const SearchAnchor = () => {
  return (
    <div className="max-w-96 mx-auto flex flex-col justify-center items-center gap-4">
      <p className="text-center text-muted-foreground">
        Use a ferramenta de busca para encontrar mais rápido o mangá que você
        procura!
      </p>
      <Search>
        <Button variant="outline">Buscar mangás</Button>
      </Search>
    </div>
  );
};
