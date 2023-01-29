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

const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const [smoother,setSmoother] = useState()
  const splash = useRef()
  //const app = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const introtl = useRef();
  /* useIsomorphicLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    let smoother = ScrollSmoother.create({
      smooth: 3,
      normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
      ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
      effects: true,
      //@ts-ignore
      preventDefault: true
    })
    //@ts-ignore
    setSmoother(smoother)
  },[]) */

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
      smoothTouch: true,
      touchMultiplier: 2,
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
  })

  useIsomorphicLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(()=>{
      //@ts-ignore
      gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
      //@ts-ignore
      gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false}})
      gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top top", pinSpacing:false}})
    })
    return () => ctx.revert()
  },[])

  
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

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(()=>{
      //@ts-ignore
      introtl.current = gsap.timeline()
      .set(".word",{translateY:"2em"})
      .set(".reel",{clipPath:"inset(0 0 100% 0)"})
      .set(".entra",{translateY:"2em"})
      // .set(".intro",{translateX:"-100%"})
      // .to(".intro",{translateX:0,duration:3,ease:"power4.inOut"})
      // @ts-ignore
      .set(splash.current,{clipPath:"inset(0 0 0 0"})
      // @ts-ignore
      .to(splash.current,{clipPath:"inset(0 0 0 100%)",delay:3,ease:"power4.inOut",duration:2})
      // @ts-ignore
      .to(splash.current,{display:"none"},"-=0.5")
      .to(".entra",{translateY:0, stagger: 0.2, ease:"power3.inOut", duration: 2},"<")
      .to(".word",{translateY:0,duration:1,stagger:0.02},"<")
      .to(".reel",{clipPath:"inset(0 0 0% 0)", duration:2, ease:"power4.inOut"},"<")
    },smoothContent);
    return ()=>ctx.revert();
  },[])

  useIsomorphicLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(()=>{
      gsap.to(".heroImage",{translateY:"50%", scrollTrigger:{scroller:"body",trigger:".introBody",scrub:true , start:"top top", end:"bottom center", pinSpacing:false}})
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
        <div ref={smoothContent} id="smooth-content" className={`${switzer.className} changeBG`}>
          <Component {...pageProps} />
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
