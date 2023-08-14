//@ts-nocheck
import Head from 'next/head'
import { Inter } from '@next/font/google'
import Video from '../components/splashScreen'
// import HeaderMenu from '../components/menuHeader'
import Intro from '../components/introduction'
import WorkGallery from '../components/workGallery'
import { gsap } from 'gsap'
import React, { useContext, useRef, useState, useEffect } from 'react'
import SplitType from 'split-type'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import PWAFeatures from '../components/pwaFeature'
// import { SmootherContext } from '../SmootherContext'
import { useRouter } from 'next/router'
import { BackgroundTheme, ThemeContext } from '../components/layout'
import { gql } from '@apollo/client'
import client from '../apolloClient'
import Lenis from '@studio-freight/lenis'
import ChatJPT from '../components/chat'

const inter = Inter({ subsets: ['latin'] })

const Home =({heading1Wrapper,heading2Wrapper,ampersandWrapper,handleProjectSelection,data,showBackButton})=> {
  const mm = useRef(gsap.matchMedia())
  const router = useRouter()
  const themeChange = useContext(BackgroundTheme)
  const themeColors = useContext(ThemeContext)
  //const smoother = useContext(SmootherContext)
  //Register GSAP Plugin - ScrollTrigger
  //gsap.registerPlugin(ScrollTrigger);

  /* useIsomorphicLayoutEffect(() => {
    smoother && smoother.effects("[data-speed], [data-lag]", {});
  }, [smoother]); */

  useIsomorphicLayoutEffect(()=>{
    themeChange(`${themeColors.grey}`)
    //maybe we can use the change backgeound where it's not scrubbed
    gsap.registerPlugin(ScrollTrigger)
    // ScrollTrigger.create({snap:0.3333})
    const ctx = gsap.context(()=>{
      //gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
      //gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false}})
      //gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top center", pinSpacing:false}})
      mm.current.add("(min-width: 768px)",()=>{gsap.to(".entra",{translateY:"-150%",stagger:0.05,scrollTrigger:{scroller:"body",trigger:".introBody",start:"bottom bottom",end:"bottom center",scrub:true,pinSpacing:false}})})
      mm.current.add("(min-width: 768px)",()=>{gsap.to(".heroImage",{translateY:"32.5%", scrollTrigger:{scroller:"body",trigger:".introBody",scrub:true , start:"top top", end:"bottom center", pinSpacing:false}})})
    })
    return () => ctx.revert()
  },[])

  useIsomorphicLayoutEffect(() => {
    let mm = gsap.matchMedia()
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
    // mm.add("(min-width:768px)",() => {
        ScrollTrigger.create({
          trigger: "body",
          //onUpdate: self => console.log(self.progress),
          snap: {
            snapTo:[0.2,0.4,0.6,0.8],
            directional: false
          }
        })
      // })
    /* mm.add("(max-width:768px)",() => {
        ScrollTrigger.create({
          trigger: "body",
          // onUpdate: self => console.log(self.progress),
          snap: {
            snapTo:[0,0.2,0.4,0.6,0.8],
            directional: false
          }
        })
      }) */
    })
    return () => ctx.revert();
  },[])
  
  useIsomorphicLayoutEffect(() => {
    let lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(1-t,4)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical', // vertical, horizontal
      gestureOrientation: 'vertical', // vertical, horizontal, both
      smoothWheel: true,
      wheelMultiplier: 0.55,
      smoothTouch: false,
      touchMultiplier: 1,
      infinite: false
    })
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  },[])

  return (
    <>
        <Head>
          <title>Jay Indino - Graphic Designer & Creative Developer</title>
          <meta name="description" content="Award-winning Graphic Designer and Creative Developer who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development. He currently does web design and web developent in the Utah, idaho, Nevada, Colorado, Arizona area." />
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
          <meta name="twitter:description" content="Award-winning Graphic Designer and Creative Developer who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development. He currently does web design and web developent in the Utah, idaho, Nevada, Colorado, Arizona area." />
          <meta name="twitter:image" content="https://jayindino.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Heber Jay Indino" />
          <meta property="og:description" content="Award-winning Graphic Designer and Creative Developer who has expertise in branding, web design and web development and specializes in digital experiences, creative development, and web app development. He currently does web design and web developent in the Utah, idaho, Nevada, Colorado, Arizona area." />
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
      <Intro heading1Wrapper={heading1Wrapper} heading2Wrapper={heading2Wrapper} ampersandWrapper={ampersandWrapper}/>
      <div className='darkTheme'>
        <WorkGallery handleProjectSelection={handleProjectSelection} data={data}/>
        <PWAFeatures />
      </div>
      <ChatJPT />
    </>
  )
}

export default Home

export async function getStaticProps(){
  const {data} = await client.query({
    query: gql`
    {
      posts {
        coverImage
        title
        id
        categories {
          categoryName
          id
        }
        slug
      }
      categories {
        id
        categoryName
        classification
        posts {
          id
        }
      }
    }
    `
  })
  return {
    props: {
      data
    }
  }
  
}