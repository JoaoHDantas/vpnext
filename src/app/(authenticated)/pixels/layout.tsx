export const metadata = {
  title: 'Pixels | Content',
  description: 'galeria de pixels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
