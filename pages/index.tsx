import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Video from '../components/splashScreen'
import HeaderMenu from '../components/menuHeader'
import Intro from '../components/introduction'
import WorkGallery from '../components/workGallery'
import localFont from '@next/font/local'
import gsap from 'gsap'
import {useEffect,useRef, useState} from 'react'
import SplitType from 'split-type'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import PWAFeatures from '../components/pwaFeature'
import Contact from '../components/contact'

const inter = Inter({ subsets: ['latin'] })
const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

const Home =()=> {
  //Register GSAP Plugin - ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  const app = useRef<HTMLDivElement>(null);
  //const homeWrapper = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const introtl = useRef();

  useIsomorphicLayoutEffect(()=>{
    let lines;
    const runSplit = () => {
      //@ts-ignore
      lines = new SplitType(".paragraph",{type:'lines'})
    }
    runSplit()
    window.addEventListener("resize",()=>{
        lines.revert();
        runSplit()
    })
  })
  
  useIsomorphicLayoutEffect(()=>{
    //const el = homeWrapper.current
    const ctx = gsap.context(()=>{
      //@ts-ignore
      gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
      //@ts-ignore
      gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{trigger:".interactiveContact",scrub:true , start:"top +=75%", end:"top top", pinSpacing:false}})
      gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{trigger:".selectedWork",scrub:true , start:"top bottom", end:"top center", pinSpacing:false}})
    })
    return () => ctx.revert()
  },[])

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(()=>{
      //@ts-ignore
      introtl.current = gsap.timeline()
      .set(".word",{translateY:"2em"})
      .set("img",{clipPath:"inset(100% 0 0 0)"})
      .set(".intro",{translateX:"-100%"})
      .to(".intro",{translateX:0,duration:3,ease:"power4.inOut"})
      // .to(".cover",{display:"none"})
      .to("img",{clipPath:"inset(0% 0 0 0)", duration:1, ease:"power4.inOut"},"+=0.3")
      .to(".word",{translateY:0,duration:1,stagger:0.03})
    },app);
    return ()=>ctx.revert();
  },[])
  return (
    <>
      <Head>
        <title>Jay Indino - Graphic Designer & Creative Developer</title>
        <meta name="description" content="Graphic Designer and Creative Developer who can help with your branding and web design and development and web app development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='manifest' href="/manifest.json" />
      </Head>
      <div id="App" className={`${switzer.className} relative preload--container w-screen h-screen bg-grey text-black`} ref={app}>
      <div className="intro changeBG">
        <div className="w-screen">
          <Intro />
          <WorkGallery />
          <PWAFeatures />
          <Contact />
        </div>
        {/* <div className="cover w-screen h-full bg-white">
          <Video />
        </div> */}
      </div>      
      {/*@ts-ignore*/}
      <HeaderMenu />
    </div>
    </>
  )
}

export default Home