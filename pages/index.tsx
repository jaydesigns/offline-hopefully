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
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        //onUpdate: self => console.log(self.progress),
        snap: {
          snapTo:[0.2,0.4,0.6,0.8],
          directional: false
        }
      })
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