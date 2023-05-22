import React, { useEffect,useState,useRef } from "react"
import HeaderMenu from "./menuHeader"
import Video from "./splashScreen"
import axios from "axios"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"

export const ProjectDataContext = React.createContext()
export const ThemeContext = React.createContext()
export const AllProjectObject = React.createContext()

const Layout = ({children}) => {    
    const [ selectedProject, setSelectedProject ] = useState()
    const [ allProjectObject, setAllProjectObject] = useState()
    const [ theme,setTheme ] = useState()

    useEffect(()=>{
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
    },[])

    console.log(allProjectObject);
    return (
        <ThemeContext.Provider value={theme}>
            <AllProjectObject.Provider value={allProjectObject}>
                <ProjectDataContext.Provider value={selectedProject}>
                    <div>{children}</div>
                    <HeaderMenu/>
                </ProjectDataContext.Provider>
            </AllProjectObject.Provider>
        </ThemeContext.Provider>
    )
}

export default Layout