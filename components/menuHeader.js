import { useState,useCallback,useRef, useContext } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { useRouter } from "next/router";
import ThemeColors, { ThemeContext, BackgroundTheme } from "./layout"
import NegativeArrow from "./negativeArrow";
import { OutroTimeline } from "../pages/_app";

const MenuItem = ({handleRouteChange,link,str}) => {

    return (
        <div className="flex flex-row gap-2 content-center menuEntra">
                <div className="bg-red w-6 h-6 flex justify-around items-center rounded-full"></div>
                <Link onClick={handleRouteChange} href={link}><div className="linkName overflow-hidden relative h-6">
                    <span className="linkText cursor-pointer">{str}</span>
                </div></Link>
        </div>
    )
}

const HeaderMenu = () => {
    const [state,setState] = useState(false)
    const ThemeColors = useContext(ThemeContext)
    const themeChange = useContext(BackgroundTheme)
    const router = useRouter()
    const tl = useRef(gsap.timeline())
    const {outro,setOutro} = useContext(OutroTimeline)

    const menuExpand = () => {
        let tl = gsap.timeline()
        tl.to(".linkName",{width: "4em", duration: 0.5, ease:"power3.inOut"})
        tl.to(".linkText",{transform:"translateY(0%)", duration:0.5, stagger: 0.1},"-=0.5")
        setState(true);
        tl.play();
    }
    const menuShrink = () => {
        let tl = gsap.timeline()
        tl.to(".linkText",{transform:"translateY(100%)", duration: 0.5, stagger: 0.1})
        tl.to(".linkName",{width: "0em", duration: 0.5, ease:"power3.inOut"},"-=0.5")
        setState(false);
        tl.play();
    }
    
    const handleRouteChange = (e)=>{
        e.preventDefault()
        // console.log(outro);
        const tg = e.target.closest('a').getAttribute('href')
        // tl.current.fromTo(".clip",{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",duration:2,stagger:0.02,ease:"power3.in"})
        // tl.current.play().then(()=>router.push(tg))
        outro.reverse().then(()=>router.push(tg))
    }

    useIsomorphicLayoutEffect(() => {
        console.log(outro);
    },[])

    return(
        <>
        <div id="menuHeader" className={`w-full px-4 fixed bottom-0`} style={{backgroundColor:`${ThemeColors.grey}`,color:`${ThemeColors.black}`}}>
            <div className="flex h-16 py-4 place-content-between border-t border-darkGrey md:h-20">
                <div className="relative flex md:basis-1/3">
                    <div className="flex flex-row overflow-hidden h-8 aspect-square">
                        <Link href="/" onClick={handleRouteChange} className="backBtn cursor-pointer" aria-label="Heber Jay Indino" id="hjiLogo">
                            <svg id="Layer_2" style={{height:'23px',mixBlendMode:"exclusion"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.64 60"><defs></defs><g id="Layer_1-2"><rect fill={`${ThemeColors.white}`} className="cls-1" x="69.82" y="17.51" width="17.82" height="42.49"/><polygon fill={`${ThemeColors.white}`} className="cls-1" points="17.54 18 17.54 0 0 0 0 60 17.54 60 17.54 34.03 34.08 34.03 34.08 47.22 50.81 47.22 50.81 17.65 17.54 18"/></g></svg>
                            {/* <span className="hidden">Home</span> */}
                        </Link>
                    </div>
                </div>
                <div className="basis-1/3 hidden md:flex md:basis-1/3 flex-col overflow-hidden">
                    <div className="text-xs font-semibold relative overflow-hidden max-h-6"><h6 className="menuEntra">Heber Jay Indino</h6></div>
                    <div className="text-xs font-semibold relative overflow-hidden max-h-6"><h6 className="menuEntra">Designer/Developer</h6></div>
                </div>
                <div className="navigationMenu flex gap-1 grow md:basis-1/3 justify-end h-full overflow-hidden" onTouchStart={state !== true ? menuExpand : menuShrink} onMouseEnter={menuExpand} onMouseLeave={menuShrink}>
                    <MenuItem handleRouteChange={handleRouteChange} link="bio" str="bio" />
                    <MenuItem handleRouteChange={handleRouteChange} link="press" str="press" />
                    <MenuItem handleRouteChange={handleRouteChange} link="credits" str="credits" />
                </div>
            </div>
        </div>
        </>
    )
}

export default HeaderMenu