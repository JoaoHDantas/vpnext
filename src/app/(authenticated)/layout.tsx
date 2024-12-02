import type { Metadata } from "next";
import Link from 'next/link'

import '../styles/layoutHeader.css'

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
        <header className='header'>
          <div className='left-header'>
            <Link href="/home" className='home'> <img src="/logo.png" width={50} height={40} /></Link>
            <Link href="/home" className='home'>Home</Link>
            <Link href="/home"><p>Sobre nós</p></Link>
          </div>
          <div className='right-header'>
            <a href="#"><p>Suporte</p></a>
          </div>
        </header>
        <nav className='navbar'>
          <div className='links-navbar'>
            <Link href="#" className='links-escolha'>agentes</Link>
            <Link href="#" className='links-escolha'>mapas</Link>
            <Link href="/topAjudantes" className='links-escolha'>top ajudantes</Link>
            <Link href="/pixels" className='links-escolha'>comunidade</Link>
          </div>
          <div>
            <div></div>
            <a href="/user/profile">Hi, joao</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
