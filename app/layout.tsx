import { GrainOverlay } from "@/components/art/GrainOverlay";
import { UnverifiedTrailersNotice } from "@/components/dev/UnverifiedTrailersNotice";
import { ScrollProgressWeb } from "@/components/layout/ScrollProgressWeb";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { buildJsonLd, metadata as siteMetadata } from "@/lib/seo";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={fontVariables}>
      <body>
        <SkipLink />
        <MotionProvider>
          <GrainOverlay />
          <ScrollProgressWeb />
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <UnverifiedTrailersNotice />
        <script
          type="application/ld+json"
          // Datos estructurados: sólo lo que está verificado en content/.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
