import Image from 'next/image';
import Script from 'next/script';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-muted shadow-sm">
      <div className="container flex flex-col items-center justify-center h-16 px-4 md:px-6">
        <span className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Manga Livre™. Todos os direitos
          reservados.
        </span>
        <span className="text-xs text-center text-muted-foreground">
          Este site não hospeda nenhum arquivo de vídeo, apenas os cataloga.
        </span>
        <a
          title="Google Analytics Alternative"
          href="https://clicky.com/101462355"
        >
          <Image
            alt="Clicky"
            src="//static.getclicky.com/media/links/badge.gif"
            width={50}
            height={50}
            style={{ border: 0 }}
          />
        </a>

        <Script
          src='//pl24209127.cpmrevenuegate.com/2d/4b/c8/2d4bc84bae22425dc50740235b29b5a1.js'
          strategy="lazyOnload"
        />
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
