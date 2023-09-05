import { useContext, useEffect, useState } from "react"
import { BackgroundTheme,ThemeContext } from "../components/layout"
import Link from "next/link"
import Image from "next/image"
import { gql } from "@apollo/client"
import client from "../apolloClient"
import InstallPWA from "../components/installPWA"
import { OutroTimeline } from "./_app"
import { gsap } from "gsap"
import { useIsomorphicLayoutEffect } from "react-use"
import LinkText from "../components/linkText"

const Links = () => {
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const [ linkData,setLinkData ] = useState()
    const {outro,setOutro} = useContext(OutroTimeline)

    useIsomorphicLayoutEffect(() => {
        gsap.set(".title",{translateY:"120%"})
        gsap.set(".slideDown",{translateY:"-120%"})
        gsap.set(".clip",{clipPath:"inset(100% 0 0 0)"})
    },[])

    useEffect(() => {
        themeChange(`${ThemeColors.grey}`)
    },[themeChange,ThemeColors])

    useEffect(() => {
        const getLinks = async() => {
            const {data} = await client.query({
                query: gql`
                {
                    links {
                      coverImage
                      description
                      title
                      externalUrl
                    }
                  }
                `
            })
            setLinkData(data.links)
        }
        getLinks()
    },[])

    useEffect(() => {
        const linkTL = gsap.timeline()

        linkTL.to('.linkBorder',{width:"100%",duration:1,ease:"power3.inOut"})
        linkTL.to('.title',{translateY:"0%",duration:1,ease:"power3.inOut"},"<")
        linkTL.to('.slideDown',{translateY:"0%",duration:1,stagger:0.15,ease:"power3.inOut"},"<")
        linkTL.fromTo('.clip',{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0% 0 0 0)",duration:1,stagger:0.15,ease:"power3.inOut"},"-=1")
        setOutro(linkTL)
    },[setOutro,linkData])

    // console.log(linkData);
    return(
        <>
        <div className="flex flex-col p-4">
            <div style={{width:0}} className="linkBorder border-32 border-b overflow-y-hidden pb-2">
                <h1 className="title text-5xl md:text-SM font-medium">Links</h1>
            </div>
            <div className="flex flex-col md:flex-row">
                {/* <div className="overflow-y-hidden grow relative h-[2rem]">
                    <a href="mailto:jayindinodesigns@gmail.com" target="_blank" rel="noreferrer" className="absolute slideDown underline"><LinkText str={"jayindinodesigns@gmail.com"} arrowClass={"rotate-[-45deg]"}/></a>
                </div>
                <div className="overflow-y-hidden grow relative h-[2rem]">
                    <a href="https://instagram.com/jay.indino" target="_blank" rel="noreferrer" className="absolute slideDown underline"><LinkText str={"Instagram"} arrowClass={"rotate-[-45deg]"}/></a>
                </div>
                <div className="overflow-y-hidden grow relative h-[2rem]">
                    <a href="https://facebook.com/jaeyiminam" target="_blank" rel="noreferrer" className="absolute slideDown underline"><LinkText str={"Facebook"} arrowClass={"rotate-[-45deg]"}/></a>
                </div> */}
                <div className="overflow-y-hidden grow relative h-[2rem]">
                    <Link href="/#selectedWork" className="absolute slideDown underline"><LinkText str={"Projects"} arrowClass={"rotate-[-45deg]"}/></Link>
                </div>
                <div className="overflow-y-hidden grow relative h-[2rem]">
                    <Link href="/#chat" className="absolute slideDown underline"><LinkText str={"Contact"} arrowClass={"rotate-[-45deg]"}/></Link>
                </div>
                <div className="overflow-y-hidden grow relative h-[2rem]">
                    <Link href="https://www.behance.net/jay-indino" target="_blank" className="absolute slideDown underline"><LinkText str={"Behance"} arrowClass={"rotate-[-45deg]"}/></Link>
                </div>
            </div>
        </div>
        <div>
            {(linkData)&&
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 w-full">
                {linkData.map((el,i) => {
                    return (
                        <div key={i} className="clip relative w-full aspect-square">
                            <Link href={el.externalUrl} target="_blank">
                                <Image alt="wow" src={el.coverImage.url} fill style={{objectFit:"cover"}} sizes="(min-width:768px) 60vw,(max-width:768px) 50vw, 100vw"></Image>
                            </Link>
                        </div>
                    )
                })}
            </div>
            }
        </div>
        </>
    )
}

export default Links