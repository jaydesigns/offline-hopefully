import React, { useEffect,useState,useRef } from "react"
import HeaderMenu from "./menuHeader"
import Video from "./splashScreen"
import axios from "axios"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import localFont from "@next/font/local"
import {Lenis as ReactLenis, useLenis} from '@studio-freight/react-lenis'

export const ProjectDataContext = React.createContext()
export const ThemeContext = React.createContext()
export const AllProjectObject = React.createContext()
export const BackgroundTheme = React.createContext()

const switzer = localFont({
  src:'../pages/font/Switzer-Variable.ttf',
  variable: '--font-switzer'
})

const Layout = ({children}) => {    
  const [ selectedProject, setSelectedProject ] = useState()
  const [ allProjectObject, setAllProjectObject] = useState()
  const [ theme,setTheme ] = useState()

  let lenis = useLenis(({scroll})=>{
    //
  })

  const ThemeColors = {
    grey: '#DFE0E2',
    black: '#141011',
    white: '#FFFFFF',
    red: '#F45844',
    darkGrey: '#939393',
    32: '#323232'
  }

  const changeTheme = (color)=>{
    gsap.to(["#smooth-wrapper","#hjiLogo"],{backgroundColor:`${color}`,duration:1})
    gsap.to("#menuHeader",{backgroundColor:`${color}`,color:((color===ThemeColors.grey)?ThemeColors.black:ThemeColors.white),duration:1})
  }

  /* useEffect(()=>{
      const getAll = async() => {
        const baseURL = 'https://api-us-west-2.hygraph.com/v2/clhk29rgq3fl601ungewp9b8b/master'
        const reqBody = {
          query: `query Projects {
              posts {
                title
                categories {
                  categoryName
                }
                coverImage
              }
            }`
        }
  
        try{
            await axios({
              method: 'post',
              url: baseURL,
              data: reqBody
            }).then(res=>setAllProjectObject(res.data))
        } catch(err){
            console.log(err);
        }
      }
      getAll()
  },[]) */
  return (
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
      <ThemeContext.Provider value={ThemeColors}>
          <BackgroundTheme.Provider value={changeTheme}>
            <AllProjectObject.Provider value={allProjectObject}>
                <ProjectDataContext.Provider value={selectedProject}>
                    <div className={`${switzer.variable} font-sans`}>
                      <div>{children}</div>
                      <HeaderMenu/>
                    </div>
                </ProjectDataContext.Provider>
            </AllProjectObject.Provider>
          </BackgroundTheme.Provider>
      </ThemeContext.Provider>
    </ReactLenis>
  )
}

export default Layout