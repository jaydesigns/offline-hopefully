import { useContext, useEffect, useState } from "react"
import { BackgroundTheme,ThemeContext } from "../components/layout"
import Link from "next/link"
import Image from "next/image"
import { gql } from "@apollo/client"
import client from "../apolloClient"
import InstallPWA from "../components/installPWA"

const Links = () => {
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const [ linkData,setLinkData ] = useState()

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

    // console.log(linkData);
    return(
        <>
        <div className="flex flex-col p-4">
            <div className="border-32 border-b">
                <h1 className="text-MED font-semibold">Links</h1>
            </div>
            <div className="flex">
                <InstallPWA text={"Install"}/>
                <Link href={'/'} className="grow">View Projects</Link>
                <button className="grow">Learn</button>
            </div>
        </div>
        <div>
            {(linkData)&&
            <div className="grid grid-cols-3 gap-4 p-4 w-full">
                {linkData.map((el,i) => {
                    return (
                        <div key={i} className="relative w-full aspect-square">
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