import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import {gsap} from 'gsap-trial'
import {ScrollTrigger} from 'gsap-trial/dist/ScrollTrigger'
import {ScrollSmoother} from 'gsap-trial/dist/ScrollSmoother'
import {SmootherContext} from '../SmootherContext'

export default function App({ Component, pageProps }) {
  const [smoother,setSmoother] = useState()
  useIsomorphicLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    let smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
      ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
      effects: true,
      //@ts-ignore
      preventDefault: true
    })
    //@ts-ignore
    setSmoother(smoother)
  },[])

  return (
    <div>
      <SmootherContext.Provider value={smoother}>
        <div id="smooth-wrapper">
          <div id="smooth-content flex">
            <Component {...pageProps} />
          </div>
        </div>
      </SmootherContext.Provider>
    </div>
  )
}
