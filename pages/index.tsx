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
import {useContext, useRef} from 'react'
import SplitType from 'split-type'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import {SmoothScrollContext} from '../public/context/SmoothScroll.context'

const inter = Inter({ subsets: ['latin'] })
const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

const Home =()=> {
  const app = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const introtl = useRef();
  //@ts-ignore
  const {scroll} = useContext(SmoothScrollContext)

  const goToTop = event => {
    event.preventDefault()
    //@ts-ignore
    scroll && scroll.scrollTo(0)
  }

  useIsomorphicLayoutEffect(() => {
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

    const ctx = gsap.context(()=>{
      //@ts-ignore
      introtl.current = gsap.timeline()
      .set("img",{clipPath:"inset(100% 0 0 0)"})
      .fromTo(".intro",{translateX:"-50%"},{translateX:0,duration:3,delay:3,ease:"power4.inOut"})
      //.to(".cover",{display:"none"})
      .to("img",{clipPath:"inset(0% 0 0 0)", duration:1, ease:"power4.inOut"},"+=0.3")
      .fromTo(".word",{translateY:"2em"},{translateY:0,duration:1,stagger:0.03},"<")
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
      <div className={`${switzer.className} preload--container w-screen overflow-x-auto flex flex-nowrap bg-grey text-black h-screen`} ref={app}>
      <div className="intro flex flex-row">
        <div data-scroll-section className="w-screen">
          <Intro />
          <WorkGallery />
          <HeaderMenu />
        </div>
        <div className="cover w-screen h-full bg-white">
          <Video />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home