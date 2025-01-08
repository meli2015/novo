"use client";
import { Suspense } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

export const AdScript = () => {
  const params = useSearchParams();
  const free = params.get("secret") === "see you space cowboy";

  return (
    <Suspense>
      {!free && (
        <>
          <Script
            strategy="afterInteractive"
            type="text/javascript"
            src=""
          ></Script>

          <Script
            strategy="beforeInteractive"
            data-id=""
            src=""
          ></Script>
        </>
      )}
    </Suspense>
  );
};

AdScript.displayName = "AdScript";