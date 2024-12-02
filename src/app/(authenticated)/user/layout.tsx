export const metadata = {
  title: 'Perfil | User',
  description: 'perfil do usuário',
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
