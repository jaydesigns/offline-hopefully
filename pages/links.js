import { useContext, useEffect, useState } from "react"
import { BackgroundTheme,ThemeContext } from "../components/layout"
import Link from "next/link"
import Image from "next/image"
import { gql } from "@apollo/client"
import client from "../apolloClient"
import InstallPWA from "../components/installPWA"
import { OutroTimeline } from "./_app"
import { gsap } from "gsap"

const Links = () => {
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const [ linkData,setLinkData ] = useState()
    const {outro,setOutro} = useContext(OutroTimeline)

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
        gsap.set(".title",{translateY:"120%"})
        gsap.set(".slideDown",{translateY:"-120%"})
        gsap.set(".clip",{clipPath:"inset(100% 0 0 0)"})

        linkTL.to('.linkBorder',{width:"100%",duration:1,ease:"power3.inOut"})
        linkTL.to('.title',{translateY:"0%",duration:1,ease:"power3.inOut"},"<")
        linkTL.to('.slideDown',{translateY:"0%",duration:1,stagger:0.15,ease:"power3.inOut"},"<")
        linkTL.to('.clip',{clipPath:"inset(0% 0 0 0)",duration:1,stagger:0.15,ease:"power3.inOut"},"-=1")
        setOutro(linkTL)
    },[setOutro,linkData])

    // console.log(linkData);
    return(
        <>
        <div className="flex flex-col p-4">
            <div style={{width:0}} className="linkBorder border-32 border-b overflow-y-hidden">
                <h1 className="title text-MED font-semibold">Links</h1>
            </div>
            <div className="flex overflow-y-hidden">
                <div className="slideDown grow"><InstallPWA text={"Install"}/></div>
                <Link href={'/'} className="slideDown grow">Connect</Link>
                <button className="slideDown grow">Follow</button>
            </div>
        </div>
        <div>
            {(linkData)&&
            <div className="grid grid-cols-3 gap-4 p-4 w-full">
                {linkData.map((el,i) => {
                    return (
                        <div key={i} className="clip relative w-full aspect-square">
                            <Link href={el.externalUrl} target="_blank">
                                <Image alt="wow" src={el.coverImage.url} fill style={{objectFit:"cover"}} sizes="(min-width:768px) 100vw,(max-width:768px) 50vw, 100vw"></Image>
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