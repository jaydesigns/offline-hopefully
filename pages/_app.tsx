//@ts-nocheck
import Head from 'next/head'
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
export const OutroTimeline = React.createContext()

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const splash = useRef()
  const [splashEnd,setSplashEnd] = useState(false);
  const lottieRef = useRef()
  const [isItIndex,setIsItIndex] = useState(true)
  const [outro,setOutro] = useState(() => gsap.timeline())

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
        <OutroTimeline.Provider value={{outro,setOutro}}>
        <Head>
          <title>Jay Indino - Graphic Designer & Creative Developer</title>
          <meta name="description" content="Award-winning Graphic Designer and Creative Developer based in Utah who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel='manifest' href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://jayindino.com" />
          <meta name="twitter:title" content="Heber Jay Indino" />
          <meta name="twitter:description" content="Award-winning Graphic Designer and Creative Developer based in Utah who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development." />
          <meta name="twitter:image" content="https://jayindino.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Heber Jay Indino" />
          <meta property="og:description" content="Award-winning Graphic Designer and Creative Developer based in Utah who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development." />
          <meta property="og:site_name" content="Heber Jay Indino" />
          <meta property="og:url" content="https://jayindino.com" />
          <meta property="og:image" content="https://jayindino.com/icons/apple-touch-icon.png" />

          {/* <!-- apple splash screen images -->
          <!--
          <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
          --> */}
        </Head>
          <div ref={smoothWrapper} id="smooth-wrapper" className="w-screen min-h-screen" style={{backgroundColor:"rgb(223,224,226)"}}>
            <div ref={smoothContent} id="smooth-content">
                {(splashEnd)?<Component {...pageProps} handleProjectSelection={handleProjectSelection} />:<></>}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 z-20 scale-50" ref={splash}>
                  <Lottie animationData={animationData} lottieRef={lottieRef} autoplay={false} loop={false}/>
              </div>
            </div>
          </div>
          <HeaderMenu/>
        </OutroTimeline.Provider>
      </Layout>
    </>
  )
}
