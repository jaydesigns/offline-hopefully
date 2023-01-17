import Link from "next/link";
import Layout from '../components/layout'
import HeaderMenu from "../components/menuHeader";
import localFont from '@next/font/local'
import { useEffect } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import gsap from "gsap";
import Image from "next/image";

const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

const Bio = () => {
    useIsomorphicLayoutEffect(()=>{
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          })
        return () => ctx.revert()
      },[])

    return(
        <Layout>
            <main className={`${switzer.className} h-screen bg-grey`}>
                <div className="p-4 text-black h-screen">
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 border-darkGrey">
                        <span>Heber</span><span className="col-start-9">Jay</span>
                    </div>
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 border-darkGrey">
                        <Image src={'/images/aloha.jpg'} alt="jay indino monochromatic portrait" height={400} width={400} className="col-start-1 col-span-1"></Image>
                        <span className="col-start-5">Indino</span>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-12">
                        <h4>01</h4>
                        <h2 className="col-start-5">Education</h2>
                        <p className="col-start-9 col-span-3">BYU&mdash;Hawai&apos;i &ndash; Design</p>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-12">
                        <h4>02</h4>
                        <h2 className="col-start-5">Awards</h2>
                        <p className="col-start-9 col-span-3">Awwwards &ndash; Honorable Mention</p>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-12">
                        <h4>03</h4>
                        <h2 className="col-start-5">Skills</h2>
                        <p className="col-start-9 col-span-3">Awwwards &ndash; Honorable Mention</p>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-12">
                        <h4>04</h4>
                        <h2 className="col-start-5">Interests</h2>
                        <p className="col-start-9 col-span-3">Awwwards &ndash; Honorable Mention</p>
                    </div>
                </div>
                <HeaderMenu />
            </main>
        </Layout>
    )
}

export default Bio;