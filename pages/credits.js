import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import NegativeArrow from '../components/negativeArrow'
import { BackgroundTheme, ThemeContext } from '../components/layout'
import { useContext } from "react"

const Credits = () =>{
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)

    useIsomorphicLayoutEffect(()=>{
        themeChange(`${ThemeColors.black}`)
    },[])
    return(
        <div className="text-white p-4 w-screen h-screen">
            <h1 className="text-bio font-semibold tracking-snug border-grey border-b py-4">Credits</h1>
            <div className="py-4">
                <p>Designed & Developed &mdash; Jay Indino</p>
                <p>Programming Language &mdash; JavaScript</p>
                <p>CMS &mdash; Strapi</p>
                <p>Font &mdash; Switzer by Jeremie Hornus</p>
                <p>Cascade Stylesheet &mdash; Tailwind</p>
                <NegativeArrow color="white" style={{transform:"scale(4)"}}/>
            </div>
        </div>
    )
}

export default Credits