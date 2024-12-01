import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixels",
  description: "crie novos pixel ou veja os pixels existentes!!!",
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
