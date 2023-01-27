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

const Home =()=> {
  //const smoother = useContext(SmootherContext)
  //Register GSAP Plugin - ScrollTrigger
  //gsap.registerPlugin(ScrollTrigger);

  /* useIsomorphicLayoutEffect(() => {
    smoother && smoother.effects("[data-speed], [data-lag]", {});
  }, [smoother]); */


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
      <Intro />
      <WorkGallery />
      <PWAFeatures />
      <Contact />
    </>
  )
}

export default Home