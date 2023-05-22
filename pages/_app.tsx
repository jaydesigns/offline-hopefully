//@ts-nocheck

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState, useRef, useLayoutEffect, useContext } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import gsap from 'gsap'
import localFont from '@next/font/local'
import {Lenis as ReactLenis, useLenis} from '@studio-freight/react-lenis'
import SplitType from 'split-type'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Video from '../components/splashScreen'
import Lottie from "react-lottie"
import animationData from "../components/data-logo-vector.json"

const switzer = localFont({
  src:'./font/Switzer-Variable.ttf',
  variable: '--font-switzer'
})

export const SplashTimeline = React.createContext()

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const splash = useRef()
  const splashTimeline = useRef(gsap.timeline());
  const [isStopped,setIsStopped] = useState(true)
  const lottieOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  let lenis = useLenis(({scroll})=>{
    //
  })

  const router = useRouter();

  const handleProjectSelection = () => {
    const handleClick = (e) => {
      console.log(e.target.closest(".card").getAttribute("projectid"))
      setSelectedProject(e.target.closest(".card").getAttribute("projectid"))
      localStorage.setItem('selectedProjectId',e.target.closest(".card").getAttribute("projectid"))
    }
    return handleClick
  }

  //
  // GET DATA API
  //
  //const baseURL = "http://localhost:1337/api/posts/?populate=*"
  // const baseURL = "https://salty-waters-71699.herokuapp.com/api/posts/?populate=*"

  const splashAnimate=()=>{
    let master = gsap.timeline()
    let tl = gsap.timeline()
    tl.set(splash.current,{clipPath:"inset(100% 0 0 0)"})
    tl.to(splash.current,{clipPath:"inset(0% 0 0 0)",duration:2,ease:"power4.inOut"})
    //tl.to(splash.current,{clipPath:"inset(0 0 0 0)",delay:3,ease:"power4.inOut",duration:3})
    //tl.to(splash.current,{display:"none"},"-=0.5")
    // tl.play().then(()=>setIsStopped(!isStopped)).then(()=>gsap.to(splash.current,{clipPath:"inset(0% 0 100% 0)",duration:2,delay:3,ease:"power4.inOut"}))
    master.add(tl.play().then(()=>setIsStopped(!isStopped)))
    .add(gsap.to(splash.current,{clipPath:"inset(0% 0 100% 0)",duration:2,delay:4,ease:"power4.inOut"}))
    return master
  }

  return (
    <>
      <Layout>
        <ReactLenis root options={{
          // wrapper:smoothWrapper.current,
          // content:smoothContent.current,
          duration: 2.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(1-t,4)), // https://www.desmos.com/calculator/brs54l4xou
          orientation: 'vertical', // vertical, horizontal
          gestureOrientation: 'vertical', // vertical, horizontal, both
          smoothWheel: true,
          wheelMultiplier: 0.55,
          smoothTouch: false,
          touchMultiplier: 1,
          infinite: false,
        }}>
          <div ref={smoothWrapper} id="smooth-wrapper" style={{backgroundColor:"rgb(223,224,226)"}}>
            <div ref={smoothContent} id="smooth-content" className={`${switzer.variable} font-sans changeBG bg-grey`}>
              <SplashTimeline.Provider value={splashAnimate}>
                <Component {...pageProps} handleProjectSelection={handleProjectSelection}/>
              </SplashTimeline.Provider>
              <div className="absolute bg-grey top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 z-20 scale-50" ref={splash}>
                  <Lottie options={lottieOptions} isStopped={isStopped}/>
              </div>
            </div>
          </div>
        </ReactLenis>
      </Layout>
    </>
  )
}
