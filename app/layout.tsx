import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { OrbBackground } from "@/components/orb-background";
import "./globals.css";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "LOOP Client Portal",
  description: "Portal informativo para clientes LOOP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${heading.variable} ${body.variable} relative min-h-screen overflow-x-hidden`}>
        <OrbBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
