import { useState, useEffect } from 'react'
import '../styles/Home.css'
import logo from '../../../public/logo.png'
// import rightchoice from '../../../public/rightchoice.svg'
// import leftchoice from '../../../public/leftchoice.svg'
import {FaXTwitter } from "react-icons/fa6";
import { TiSocialInstagram , TiSocialFacebook, } from "react-icons/ti";
import { FaReddit } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from 'next/image';
function Home(){



    return(
        <div className='master-div'>
            <header className='header'>
                <div className='left-header'>
                    <a href="#" className='home'> <img src="/logo.png" width={50} height={50}/></a>
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
                        <a href="https://www.instagram.com/joaod_tx/" ><TiSocialInstagram></TiSocialInstagram></a>
                        <a href="#"><FaXTwitter></FaXTwitter></a>
                        <a href="#"><FaReddit></FaReddit></a>
                        <a href="#"><TiSocialFacebook></TiSocialFacebook></a>
                    </div>
                        
                    
               </div>
            </main>

            
            
        </div>
    )
}

export default Home