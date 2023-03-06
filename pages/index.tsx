import Head from 'next/head'
import { Inter } from '@next/font/google'
import Video from '../components/splashScreen'
// import HeaderMenu from '../components/menuHeader'
import Intro from '../components/introduction'
import WorkGallery from '../components/workGallery'
import { gsap } from 'gsap'
import { useContext, useRef, useState } from 'react'
import SplitType from 'split-type'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import PWAFeatures from '../components/pwaFeature'
import Contact from '../components/contact'
// import { SmootherContext } from '../SmootherContext'

const inter = Inter({ subsets: ['latin'] })

const Home =({heading1Wrapper,heading2Wrapper,ampersandWrapper})=> {
  const mm = useRef(gsap.matchMedia())
  //const smoother = useContext(SmootherContext)
  //Register GSAP Plugin - ScrollTrigger
  //gsap.registerPlugin(ScrollTrigger);

  /* useIsomorphicLayoutEffect(() => {
    smoother && smoother.effects("[data-speed], [data-lag]", {});
  }, [smoother]); */

  useIsomorphicLayoutEffect(()=>{
    //maybe we can use the change backgeound where it's not scrubbed
    gsap.registerPlugin(ScrollTrigger)
    // ScrollTrigger.create({snap:0.3333})
    const ctx = gsap.context(()=>{
      //@ts-ignore
      gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
      //@ts-ignore
      // gsap.to(".changeBG",{scrollTrigger:{scroller:"body",trigger:".introBody", onLeave:()=>{gsap.to(".changeBG",{backgroundColor:"#141011"})},onEnterBack:()=>{gsap.to(".changeBG",{backgroundColor:"#DFE0E2"})}}})
      // gsap.to(".changeBG",{scrollTrigger:{scroller:"body",trigger:".featureSection",onLeave:()=>{gsap.to(".changeBG",{backgroundColor:"#DFE0E2"})},onEnterBack:()=>{gsap.to(".changeBG",{backgroundColor:"#141011"})}}})
      gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false}})
      gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top center", pinSpacing:false}})
      gsap.to([".entra",ampersandWrapper.current],{translateY:"-150%",stagger:0.05,scrollTrigger:{scroller:"body",trigger:".introBody",start:"bottom bottom",end:"bottom center",scrub:true,pinSpacing:false}})
      mm.current.add("(min-width: 768px)",()=>{gsap.to(".heroImage",{translateY:"32.5%", scrollTrigger:{scroller:"body",trigger:".introBody",scrub:true , start:"top top", end:"bottom center", pinSpacing:false}})})
    })
    return () => ctx.revert()
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
      {/* @ts-ignore */}
      <Intro heading1Wrapper={heading1Wrapper} heading2Wrapper={heading2Wrapper} ampersandWrapper={ampersandWrapper}/>
      <WorkGallery />
      <PWAFeatures />
      <Contact />
    </>
  )
}

export default Home