import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import NegativeArrow from '../components/negativeArrow'
import { BackgroundTheme, ThemeContext } from '../components/layout'
import { useContext } from "react"
import Layout from "../components/layout"

const Credits = () =>{
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)

    useIsomorphicLayoutEffect(()=>{
        themeChange(`${ThemeColors.black}`)
    },[])

    return(
        <Layout>
            <div className="text-white p-4 w-screen h-screen flex flex-col">
                <h1 className="text-SM md:text-[32vw] tracking-tight border-grey border-b py-4">Credits</h1>
                <div className="grow flex flex-col justify-between mb-20">
                    <div className="py-4 flex gap-10">
                        <p>Designed & Developed &mdash; Jay Indino</p>
                        <p>Programming Language &mdash; JavaScript</p>
                        <p>CMS &mdash; Strapi</p>
                    </div>
                    <div className="py-4 flex gap-10 items-end">
                        <p className="grow whitespace-nowrap">Font &mdash; Switzer by Jeremie Hornus</p>
                        <p className="grow whitespace-nowrap">Cascade Stylesheet &mdash; Tailwind</p>
                        <p className="shrink">This merely captures some data about the current state. Use selector text, an Element, an Array of Elements, or NodeList. By default, Flip only concerns itself with position, size, rotation, and skew. If you want your Flip animations to affect other CSS properties, you can define a configuration object with a comma-delimited list of props, like:</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Credits