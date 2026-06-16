import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breyner Ciro | Backend & Full-Stack Developer",
  description:
    "Ingeniero de Sistemas especializado en Backend y Full-Stack. Experto en Java, Node.js, microservicios y arquitecturas escalables.",
  keywords: ["Backend Developer", "Full-Stack", "Java", "Node.js", "TypeScript", "React", "Microservicios"],
  authors: [{ name: "Breyner Ismael Ciro Otero" }],
  openGraph: {
    title: "Breyner Ciro | Backend & Full-Stack Developer",
    description: "Portafolio profesional de Breyner Ismael Ciro Otero.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
