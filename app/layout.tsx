import type { Metadata } from "next";
import { GrainOverlay } from "@/components/art/GrainOverlay";
import { UnverifiedTrailersNotice } from "@/components/dev/UnverifiedTrailersNotice";
import { ScrollProgressWeb } from "@/components/layout/ScrollProgressWeb";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spider-Man: la era Tom Holland",
  description:
    "El arco completo del Spider-Man de Tom Holland: Homecoming, Lejos de casa, No Way Home y Un Nuevo Día, con sus tráilers oficiales.",
};

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
      </body>
    </html>
  );
}
