import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ScrollSmoother} from 'gsap-trial/dist/ScrollSmoother'
import {SmootherContext} from '../SmootherContext'
import HeaderMenu from '../components/menuHeader'
import localFont from '@next/font/local'
import Lenis from '@studio-freight/lenis'
const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

export default function App({ Component, pageProps }) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const [smoother,setSmoother] = useState()
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
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
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
      gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false, markers:true}})
      gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top top", pinSpacing:false, markers:true}})
    })
    return () => ctx.revert()
  },[])

  return (
    <div>
      {/* <SmootherContext.Provider value={smoother}>
        <div ref={smoothWrapper} id="smooth-wrapper">
          <div ref={smoothContent} id="smooth-content" className={`${switzer.className} changeBG`}>
            <Component {...pageProps} />
          </div>
        </div>
      </SmootherContext.Provider> */}
      {/* @ts-ignore */}
      <div ref={smoothWrapper} id="smooth-wrapper">
        {/* @ts-ignore */}
        <div ref={smoothContent} id="smooth-content" className={`${switzer.className} changeBG`}>
          <Component {...pageProps} />
        </div>
      </div>
      <HeaderMenu />
    </div>
  )
}
