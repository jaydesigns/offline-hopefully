import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import {gsap} from 'gsap-trial'
import {ScrollTrigger} from 'gsap-trial/dist/ScrollTrigger'
//import {ScrollSmoother} from 'gsap-trial/dist/ScrollSmoother'
import { ScrollSmoother } from 'gsap/all'
import {SmootherContext} from '../SmootherContext'
import HeaderMenu from '../components/menuHeader'
import localFont from '@next/font/local'
const switzer = localFont({src:'./font/switzer-variable-webfont.woff2'})

export default function App({ Component, pageProps }) {
  const [smoother,setSmoother] = useState()
  useIsomorphicLayoutEffect(()=>{
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
  },[])

  useIsomorphicLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      //@ts-ignore
      gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
      //@ts-ignore
      gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false}})
      gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top top", pinSpacing:false}})
    })
    return () => ctx.revert()
  },[])

  return (
    <div>
      <SmootherContext.Provider value={smoother}>
        <div id="smooth-wrapper">
          <div id="smooth-content" className={`${switzer.className} changeBG`}>
            <Component {...pageProps} />
          </div>
        </div>
      </SmootherContext.Provider>
      <HeaderMenu />
    </div>
  )
}
