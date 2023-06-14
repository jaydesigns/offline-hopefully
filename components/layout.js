import React, { useEffect,useState,useRef } from "react"
import HeaderMenu from "./menuHeader"
import Video from "./splashScreen"
import axios from "axios"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import localFont from "@next/font/local"
import {Lenis as ReactLenis, useLenis} from '@studio-freight/react-lenis'
import Lenis from "@studio-freight/lenis"
import Head from "next/head"

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
  // const [ theme,setTheme ] = useState()

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
  
  return (
    <ThemeContext.Provider value={ThemeColors}>
        <BackgroundTheme.Provider value={changeTheme}>
          <AllProjectObject.Provider value={allProjectObject}>
              <ProjectDataContext.Provider value={selectedProject}>
                  <div className={`${switzer.variable} font-sans`}>
                    <div>{children}</div>
                  </div>
              </ProjectDataContext.Provider>
          </AllProjectObject.Provider>
        </BackgroundTheme.Provider>
    </ThemeContext.Provider>
  )
}

export default Layout