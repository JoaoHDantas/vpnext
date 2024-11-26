import { useState, useEffect } from 'react'
import '../styles/Home.css'
import logo from '../../../public/logo.png'
// import rightchoice from '../../../public/rightchoice.svg'
// import leftchoice from '../../../public/leftchoice.svg'
function Home(){
    return(
        <div className='master-div'>
            <header className='header'>
                <div className='left-header'>
                    <a href="#" className='home'><img alt="" className='imagem' /></a>
                    <a href="#" className='home'>Home</a>
                    <a href="#"><p>Sobre nós</p></a>
                </div>
                <div className='right-header'>
                    <a href="#"><p>Suporte</p></a>
                </div>
            </header>
            <nav className='navbar'>
                <div className='links-navbar'>
                    <a href="#" className='links-escolha'>agentes</a>
                    <a href="#" className='links-escolha'>mapas</a>
                    <a href="#" className='links-escolha'>top ajudantes</a>
                    <a href = "#" className='links-escolha'>comunidade</a>
                </div>
                <div>
                    <div></div>
                    <a href="#">Hi, joao</a>
                </div>
            </nav>
            <main className='main'>
                <div className='background'>

                </div>
                <div className="Main-content-area">
                    <div className='boxsize-button'>
                    <a href = "#" className='link-middle-right'><img  alt="" />
                    </a>
                    </div>
                    
                    <img className='logo-middle'  alt="" />
                    <div className='boxsize-button'>
                        <a href = "#" className='link-middle-right'><img  alt="" />
                       </a>
                    </div>
                </div>
               <div className='redes-container'>
                    <div className='lista-redes'>
                        <a href="https://www.instagram.com/joaod_tx/" ></a>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                    </div>
                        
                    
               </div>
            </main>

            
            
        </div>
    )
}

export default Home