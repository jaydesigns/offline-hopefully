// import Link from "next/link";
import Layout from '../components/layout'
import HeaderMenu from "../components/menuHeader";
import localFont from '@next/font/local'
// import { useEffect } from "react";
// import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
// import { gsap } from "gsap";
import Image from "next/image";

const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

const Bio = () => {/* 
    useIsomorphicLayoutEffect(()=>{
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          })
        return () => ctx.revert()
    },[]) */

    return(
        <Layout>
            <main className={`${switzer.className} h-screen bg-grey`}>
                <div className="p-4 text-black pb-28">
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 border-darkGrey">
                        <span>Heber</span><span className="col-start-9">Jay</span>
                    </div>
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 border-darkGrey">
                        <div className="relative w-48 h-full">
                        <Image src={'/images/PORTRAIT-sq.jpg'} alt="jay indino monochromatic portrait" fill style={{objectFit:"cover"}} className="col-start-1 col-span-1"></Image>
                        </div>
                        <span className="col-start-5">Indino</span>
                    </div>
                    <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-12">
                        <h4>01</h4>
                        <h2 className="font-semibold text-3xl col-start-5">Education</h2>
                        <p className="col-start-9 col-span-3">Design &ndash; BYU&mdash;Hawai&apos;i</p>
                        <p className="col-start-9 col-span-3">MERN &ndash; Helsingin Yliopisto</p>
                    </div>
                    <div className="grid grid-cols-12">
                        <h4>02</h4>
                        <h2 className="font-semibold text-3xl col-start-5">Awards</h2>
                        <p className="col-start-9 col-span-3">Awwwards &ndash; Honorable Mention</p>
                        <p className="col-start-9 col-span-3">NHSLS &ndash; Nominated</p>
                    </div>
                    <div className="grid grid-cols-12">
                        <h4>03</h4>
                        <h2 className="font-semibold text-3xl col-start-5">Skills</h2>
                        <ul className="col-start-9 col-span-3">
                            <li>Branding</li>
                            <li>HTML/CSS/Javascript</li>
                            <li>React Framework</li>
                            <li>Graphic Design</li>
                            <li>Web Design</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-12">
                        <h4>04</h4>
                        <h2 className="font-semibold text-3xl col-start-5">Interests/Hobbies</h2>
                        <ul className="col-start-9 col-span-3">
                            <li>Basketball</li>
                            <li>Surfing</li>
                            <li>Reading</li>
                            <li>Biking</li>
                            <li>Eating</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <HeaderMenu />
            </main>
        </Layout>
    )
}

export default Bio;