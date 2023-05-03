// import Link from "next/link";
import Layout from '../components/layout'
import HeaderMenu from "../components/menuHeader";
import localFont from '@next/font/local'
import { useContext, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import Image from "next/image";

const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

const Bio = () => {
    const bioContainer = useRef<HTMLDivElement>(null)

    useIsomorphicLayoutEffect(()=>{
        //@ts-ignore
        gsap.set(bioContainer.current,{opacity:0})
        gsap.to(bioContainer.current,{opacity: 1,duration:1})
    },[])
    
    /* 
    useIsomorphicLayoutEffect(()=>{
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          })
        return () => ctx.revert()
    },[]) */
    useEffect(()=>{
        gsap.to(".changeBG",{backgroundColor:"#DFE0E2"})
    },[])

    return(
        <Layout>
            <main ref={bioContainer} className={`${switzer.className} bg-grey bioContainer`}>
                <div className="p-4 text-black pb-28">
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 border-darkGrey">
                        <span>Heber</span><span className="col-start-9">Jay</span>
                    </div>
                    <div className="text-bio tracking-tighter uppercase font-semibold grid grid-cols-12 border-b-2 pt-2 pb-2 border-darkGrey">
                        <div className="relative w-24 md:w-48 h-full ">
                        <Image src={'/images/PORTRAIT-sq.jpg'} alt="jay indino monochromatic portrait" fill style={{objectFit:"cover"}} className="col-start-1 col-span-1"></Image>
                        </div>
                        <span className="col-start-5">Indino</span>
                    </div>
                    <div className="bio flex flex-col gap-8 pt-28">
                        <div className="grid grid-cols-4 md:grid-cols-12">
                            <h4 className="hidden md:block">01</h4>
                            <h2 className="font-semibold text-lg md:text-3xl col-start-1 md:col-start-5">Education</h2>
                            <ul className='col-start-3 md:col-start-9 col-span-3'>
                                <li className="text-sm leading-tight">Design &ndash; BYU&mdash;Hawai&apos;i</li>
                                <li className="text-sm leading-tight">MERN &ndash; Helsingin Yliopisto</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-12">
                            <h4 className="hidden md:block">02</h4>
                            <h2 className="font-semibold text-lg md:text-3xl col-start-1 md:col-start-5">Awards</h2>
                            <div className='col-start-3 md:col-start-9 col-span-3'>
                                <p className="text-sm leading-tight">Awwwards &ndash; Honorable Mention for Portfolio 2020</p>
                                <p className="text-sm leading-tight">Awwwards &ndash; Developer Excellence - for Portfolio 2020</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-12">
                            <h4 className="hidden md:block">03</h4>
                            <h2 className="font-semibold text-lg md:text-3xl col-start-1 md:col-start-5">Skills</h2>
                            <ul className="text-sm leading-tight col-start-3 md:col-start-9 col-span-3">
                                <li>Visual Design</li>
                                <li>Front-end Development &#40;React,NextJS&#41;</li>
                                <li>Back-end Development &#40;ExpressJS,NoSQL&#41;</li>
                                <li>Digital Marketing</li>
                                <li>Graphic Design</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-12">
                            <h4 className="hidden md:block">04</h4>
                            <h2 className="font-semibold text-lg md:text-3xl col-start-1 md:col-start-5">Interests/Hobbies</h2>
                            <ul className="text-sm leading-tight col-start-3 md:col-start-9 col-span-3">
                                <li>&mdash; When I&apos;m not learning programming, I&apos;ll be out in the gym playing basketball.
                                    &mdash; I also like to play chess at Chess.com. If you want to play against me, I&apos;ll have to warn you tho I have a 687 ELO rating.
                                    &mdash; When I was in Hawaii, I like to go surfing.
                                    &mdash; I also find landscape photography and riding a bike very amusing.
                                    &mdash; Learning about dinosaurs, geology, and astrophysics also take a huge chunk of my time.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <HeaderMenu/>
            </main>
        </Layout>
    )
}

export default Bio;