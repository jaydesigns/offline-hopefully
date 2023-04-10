import { useState,useCallback } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import localFont from "@next/font/local"

const MenuItem = ({link,str}) => {
    return (
        <div className="flex flex-row gap-2 content-center menuEntra">
                <div className="bg-red w-6 h-6 flex justify-around items-center rounded-full"></div>
                <Link href={link}><div className="linkName overflow-hidden relative h-6 changeBG">
                    <span className="linkText cursor-pointer mix-blend-exclusion text-white">{str}</span>
                </div></Link>
        </div>
    )
}

const switzer = localFont({src:'../pages/font/switzer-variable-webfont.woff2'})

const HeaderMenu = () => {
    const [state,setState] = useState(false)

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

    useIsomorphicLayoutEffect(()=>{
        //maybe we can use the change backgeound where it's not scrubbed
        gsap.registerPlugin(ScrollTrigger)
        // ScrollTrigger.create({snap:0.3333})
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          //@ts-ignore
          gsap.fromTo(".changeBG",{backgroundColor:"#141011"},{backgroundColor:"#DFE0E2",scrollTrigger:{scroller:"body",trigger:".interactiveContact",scrub:true , start:"top 50%", end:"top top", pinSpacing:false}})
          gsap.fromTo(".changeBG",{backgroundColor:"#DFE0E2"},{backgroundColor:"#141011",scrollTrigger:{scroller:"body",trigger:".selectedWork",scrub:true , start:"top bottom", end:"top center", pinSpacing:false}})
        })
        return () => ctx.revert()
    },[])

    return(
        <>
        <div className={`${switzer.className} w-full px-4 fixed bottom-0 changeBG bg-grey`}>
            <div className="flex h-16 py-4 place-content-between border-t border-darkGrey md:h-20">
                <div className="relative flex-auto md:basis-1/3 mix-blend-exclusion overflow-hidden">
                    <Link href={"/"} className="menuEntra absolute mix-blend-exclusion" >
                        <svg id="Layer_2" style={{height:'23px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.64 60"><defs></defs><g id="Layer_1-2"><rect fill="#FFFFFF" className="cls-1" x="69.82" y="17.51" width="17.82" height="42.49"/><polygon fill="#FFFFFF" className="cls-1" points="17.54 18 17.54 0 0 0 0 60 17.54 60 17.54 34.03 34.08 34.03 34.08 47.22 50.81 47.22 50.81 17.65 17.54 18"/></g></svg>
                    </Link>
                </div>
                <div className="basis-1/3 hidden md:flex md:basis-1/3 flex-col mix-blend-exclusion overflow-hidden">
                    <div className="text-xs relative overflow-hidden max-h-6 text-white"><h6 className="menuEntra">Heber Jay Indino</h6></div>
                    <div className="text-xs relative overflow-hidden max-h-6 text-white"><h6 className="menuEntra">Designer/Developer</h6></div>
                </div>
                <div className="navigationMenu flex gap-1 grow md:basis-1/3 justify-end h-full overflow-hidden" onTouchStart={state !== true ? menuExpand : menuShrink} onMouseEnter={menuExpand} onMouseLeave={menuShrink}>
                    <MenuItem link="bio" str="bio" />
                    <MenuItem link="project" str="work" />
                    <MenuItem link="socials" str="socials" />
                </div>
            </div>
        </div>
        </>
    )
}

export default HeaderMenu