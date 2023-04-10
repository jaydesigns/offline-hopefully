import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import HeaderMenu from '../components/menuHeader'
import localFont from '@next/font/local'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'
import Video from '../components/splashScreen'
import getAll from '../service/posts'
import axios from 'axios'

const switzer = localFont({
  src:'./font/Switzer-Variable.ttf',
  variable: '--font-switzer'
})

//@ts-ignore
export const ProjectDataContext = React.createContext()
//@ts-ignore
export const ThemeContext = React.createContext()
//@ts-ignore
export const AllProjectObject = React.createContext()

const myLoader = ({ src, width, quality }) => {
  return `https://res.cloudinary.com/${src}?w=${width}&q=${quality || 75}`
}

export default function App({ Component, pageProps }: AppProps) {
  const smoothWrapper = useRef();
  const smoothContent = useRef();
  const splash = useRef()
  //@ts-ignore
  const introtl = useRef();
  const [ selectedProject, setSelectedProject ] = useState()
  const [ allProjectObject, setAllProjectObject] = useState()
  const [ theme,setTheme ] = useState()

  let ampersandWrapper = useRef<HTMLDivElement>();
  let heading1Wrapper = useRef<HTMLDivElement>();
  let heading2Wrapper = useRef<HTMLDivElement>();

  useIsomorphicLayoutEffect(()=>{
    let lenis = new Lenis({
      // wrapper:smoothWrapper.current,
      // content:smoothContent.current,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(1.5, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 0.55,
      smoothTouch: false,
      touchMultiplier: 1,
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
  },[])

  
  useIsomorphicLayoutEffect(()=>{
    let lines;
    const runSplit = () => {
      //@ts-ignore
      lines = new SplitType(".paragraph",{types:'lines,words'})
    }
    runSplit()
    window.addEventListener("resize",()=>{
        lines.revert();
        runSplit()
    })
  })

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(()=>{
      //@ts-ignore
      introtl.current = gsap.timeline()
      .set(".word",{translateY:"2em"})
      .set(".reel",{clipPath:"inset(0 0 100% 0)"})
      .set(".entra",{translateY:"2em"})
      // @ts-ignore
      .set(splash.current,{clipPath:"inset(0 0 0 0"})
      //@ts-ignore
      .set(heading1Wrapper.current,{translateY:"33.33%"})
      //@ts-ignore
      .set(heading2Wrapper.current,{translateY:"-33.33%"})
      //@ts-ignore
      .set(ampersandWrapper.current,{translateY:"-110%"})
      // @ts-ignore
      .to(splash.current,{clipPath:"inset(0 0 0 100%)",delay:3,ease:"power4.inOut",duration:3})
      // @ts-ignore
      .to(splash.current,{display:"none"},"-=0.5")
      //@ts-ignore
      .to(heading1Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"})
      //@ts-ignore
      .to(heading2Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.85")
      //@ts-ignore
      .to(ampersandWrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.7")
      .fromTo(".word",{translateY:"2em"},{visibility:"visible",translateY:0,duration:1,stagger:0.02},"<")
      .to(".reel",{clipPath:"inset(0 0 0% 0)", duration:2, ease:"power4.inOut"},"<")
      .to(".entra",{translateY:0, stagger: 0.2, ease:"power3.inOut", duration: 2},"<")
    },smoothContent);
    return ()=>ctx.revert();
  },[])

  useIsomorphicLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      //@ts-ignore
        introtl.current = gsap.timeline()
        .set(".menuEntra",{translateY:"-100%"})
        .to(".menuEntra",{translateY:0, stagger: 0.2, ease:"power3.out", duration: 1},"+=6")
    })
    return ()=>ctx.revert()
  },[])

  const handleProjectSelection = () => {
    const handleClick = (e) => {
      setSelectedProject(e.target.closest(".card").getAttribute("projectid"))
      console.log(e.target.closest(".card").getAttribute("projectid"))
    }
    return handleClick
  }

  //
  // GET DATA API
  //
  //
  // const baseURL = "http://localhost:1337/api/posts/?populate=*"
  const baseURL = "https://salty-waters-71699.herokuapp.com/api/posts/?populate=*"

  useEffect(()=>{
    const getAll = async() => {
        try{
            const request = await axios(baseURL).then(res=>res.data)
            setAllProjectObject(request.data)
        } catch(err){
            console.log(err);
        }
    }
    getAll()
},[])

  return (
    // @ts-ignore
    <div>
      <ThemeContext.Provider value={theme}>
        <AllProjectObject.Provider value={allProjectObject}>
          <ProjectDataContext.Provider value={selectedProject}>
            {/* @ts-ignore */}
            <div ref={smoothWrapper} id="smooth-wrapper">
              {/* @ts-ignore */}
              <div ref={smoothContent} id="smooth-content" className={`${switzer.variable} font-sans changeBG bg-grey`}>
                <Component {...pageProps} handleProjectSelection={handleProjectSelection} heading1Wrapper={heading1Wrapper} heading2Wrapper={heading2Wrapper} ampersandWrapper={ampersandWrapper}/>
              </div>
            </div>
            {/* @ts-ignore */}
            <div className="absolute bg-white top-0 right-0 z-20 h-full" ref={splash}>
              <Video />
            </div>
            <HeaderMenu />
          </ProjectDataContext.Provider>
        </AllProjectObject.Provider>
      </ThemeContext.Provider>
    </div>
  )
}
