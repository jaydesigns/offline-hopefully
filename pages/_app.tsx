//@ts-nocheck
import 'tailwindcss/tailwind.css'
import HeaderMenu from '../components/menuHeader'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState, useRef, useLayoutEffect, useContext } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import gsap from 'gsap'
import SplitType from 'split-type'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Video from '../components/splashScreen'
import Lottie from 'lottie-react'
import animationData from "../components/data-logo-vector.json"


export const SplashTimeline = React.createContext()

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const splash = useRef()
  const [splashEnd,setSplashEnd] = useState(false);
  const lottieRef = useRef()
  const [isItIndex,setIsItIndex] = useState(true)

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

  useEffect(()=>{
    console.log("app");
    //
    const ctx = gsap.context(() => {
      if (splash.current){
        let master = gsap.timeline({onComplete:()=>setSplashEnd(true)})
        let tl = gsap.timeline()
        tl.set(splash.current,{clipPath:"inset(100% 0 0 0)"})
        tl.to(splash.current,{clipPath:"inset(0% 0 0 0)",duration:1,ease:"power4.inOut"})
        //tl.to(splash.current,{clipPath:"inset(0 0 0 0)",delay:3,ease:"power4.inOut",duration:3})
        //tl.to(splash.current,{display:"none"},"-=0.5")
        // tl.play().then(()=>setIsStopped(!isStopped)).then(()=>gsap.to(splash.current,{clipPath:"inset(0% 0 100% 0)",duration:2,delay:3,ease:"power4.inOut"}))
        master.add(tl.play().then(()=>lottieRef.current.play()))
        .add(gsap.to(splash.current,{clipPath:"inset(0% 0 100% 0)",duration:1.5,delay:2.5,ease:"power4.inOut"}))
      }
    })
    return () => ctx.revert();
  },[])

  return (
    <>
      <Layout>
          <div ref={smoothWrapper} id="smooth-wrapper" className="w-screen min-h-screen" style={{backgroundColor:"rgb(223,224,226)"}}>
            <div ref={smoothContent} id="smooth-content">
              {(splashEnd)?<Component {...pageProps} handleProjectSelection={handleProjectSelection} />:<></>}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 z-20 scale-50" ref={splash}>
                  <Lottie animationData={animationData} lottieRef={lottieRef} autoplay={false} loop={false}/>
              </div>
            </div>
          </div>
          <HeaderMenu/>
      </Layout>
    </>
  )
}
