import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import {ScrollSmoother} from 'gsap-trial/dist/ScrollSmoother'
// import {SmootherContext} from '../SmootherContext'
import HeaderMenu from '../components/menuHeader'
import localFont from '@next/font/local'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'
import Video from '../components/splashScreen'

const switzer = localFont({
  src:'./font/Switzer-Variable.ttf',
  variable: '--font-switzer'
})

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const [smoother,setSmoother] = useState()
  const splash = useRef()
  //const app = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const introtl = useRef();

  let titleTimeline = useRef<HTMLDivElement>();
  let ampersandWrapper = useRef<HTMLDivElement>();
  let heading1Wrapper = useRef<HTMLDivElement>();
  let heading2Wrapper = useRef<HTMLDivElement>();

  useIsomorphicLayoutEffect(()=>{
    const lenis = new Lenis({
      // wrapper:smoothWrapper.current,
      // content:smoothContent.current,
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 0.5,
      smoothTouch: false,
      touchMultiplier: 1,
      infinite: false,
    })
    
    //get scroll value
    /* lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      console.log({ scroll, limit, velocity, direction, progress })
    }) */
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  },[])

  
  useIsomorphicLayoutEffect(()=>{
    let lines;
    const runSplit = () => {
      //@ts-ignore
      lines = new SplitType(".paragraph",{type:'lines'})
      // @ts-ignore
      lines = new SplitType(".featureDescription",{type:'lines'})
    }
    runSplit()
    window.addEventListener("resize",()=>{
        lines.revert();
        runSplit()
    })
  })

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(()=>{
      //@ts-ignore
      introtl.current = gsap.timeline()
      .set(".word",{translateY:"2em"})
      .set(".reel",{clipPath:"inset(0 0 100% 0)"})
      .set(".entra",{translateY:"2em"})
      // @ts-ignore
      .set(splash.current,{clipPath:"inset(0 0 0 0"})
      //@ts-ignore
      .set(heading1Wrapper.current,{translateY:"33.33%"})
      //@ts-ignore
      .set(heading2Wrapper.current,{translateY:"-33.33%"})
      //@ts-ignore
      .set(ampersandWrapper.current,{translateY:"-110%"})
      // @ts-ignore
      .to(splash.current,{clipPath:"inset(0 0 0 100%)",delay:3,ease:"power4.inOut",duration:3})
      // @ts-ignore
      .to(splash.current,{display:"none"},"-=0.5")
      //@ts-ignore
      .to(heading1Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"})
      //@ts-ignore
      .to(heading2Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.85")
      //@ts-ignore
      .to(ampersandWrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.7")
      .to(".word",{translateY:0,duration:1,stagger:0.02},"<")
      .to(".reel",{clipPath:"inset(0 0 0% 0)", duration:2, ease:"power4.inOut"},"<")
      .to(".entra",{translateY:0, stagger: 0.2, ease:"power3.inOut", duration: 2},"<")
    },smoothContent);
    return ()=>ctx.revert();
  },[])

  useIsomorphicLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(()=>{
      gsap.to(".heroImage",{translateY:"32.5%", scrollTrigger:{scroller:"body",trigger:".introBody",scrub:true , start:"top top", end:"bottom center", pinSpacing:false}})
    })
    return () => ctx.revert()
  },[])

  useIsomorphicLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      //@ts-ignore
        introtl.current = gsap.timeline()
        .set(".menuEntra",{translateY:"-100%"})
        .to(".menuEntra",{translateY:0, stagger: 0.2, ease:"power3.out", duration: 1},"+=6")
    })
    return ()=>ctx.revert()
  },[])

  return (
    // @ts-ignore
    <div>
      {/* @ts-ignore */}
      <div ref={smoothWrapper} id="smooth-wrapper">
        {/* @ts-ignore */}
        <div ref={smoothContent} id="smooth-content" className={`${switzer.variable} font-sans changeBG`}>
          <Component {...pageProps} heading1Wrapper={heading1Wrapper} heading2Wrapper={heading2Wrapper} ampersandWrapper={ampersandWrapper}/>
        </div>
      </div>
      {/* @ts-ignore */}
      <div className="absolute bg-white top-0 right-0 z-20 h-full" ref={splash}>
        <Video />
      </div>
      <HeaderMenu />
    </div>
  )
}
