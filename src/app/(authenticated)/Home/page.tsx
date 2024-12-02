import { useState, useEffect } from 'react'
import '../../styles/Home.css'
import logo from '../../../public/logo.png'
// import rightchoice from '../../../public/rightchoice.svg'
// import leftchoice from '../../../public/leftchoice.svg'
import {FaXTwitter } from "react-icons/fa6";
import { TiSocialInstagram , TiSocialFacebook, } from "react-icons/ti";
import { FaReddit } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from 'next/image';
import {Avatar} from "@nextui-org/react";
import Link from 'next/link'

function Home(){
    return(
        <div className='master-div'>
            <main className='main'>
                <div className='background'>
                </div>
                <div className="Main-content-area">

                    <div className='boxsize-button'>
                        <Link href = "/pixels/create/" className='link-middle-right'>
                        <img src="/leftchoice.svg" alt="" /><BiPlusMedical color='#AE3C56' size="80px" className="button icon-overlay"/></Link>
                    </div>

                    <img className='logo-middle'  alt="" src="/logo.png" />
                    <div className='boxsize-button'>
                        <Link href = "/pixels/" className='link-middle-right'>
                        <img src="/rightchoice.svg" alt=""/><BiSearchAlt2 color='#AE3C56' size="80px" className="button icon-overlay"/></Link>
                    </div>
                </div>
               <div className='redes-container'>
                    <div className='lista-redes'>
                        <a href="https://www.instagram.com/joaod_tx/"><TiSocialInstagram></TiSocialInstagram></a>
                        <a href="https://www.instagram.com/joaod_tx/"><FaXTwitter></FaXTwitter></a>
                        <a href="https://www.instagram.com/joaod_tx/"><FaReddit></FaReddit></a>
                        <a href="https://www.instagram.com/joaod_tx/"><TiSocialFacebook></TiSocialFacebook></a>
                    </div>
               </div>
            </main>
        </div>
    )
}

export default Home