import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "pesquise ou poste os melhores pixels da comunidade de Valorant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
