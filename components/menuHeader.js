import { useState } from "react"
import gsap from "gsap"

const MenuItem = ({str}) => {
    return <div className="flex flex-row gap-2 content-center">
                <div className="bg-red w-6 h-6 flex justify-around items-center rounded-full"></div>
                <div className="linkName overflow-hidden relative h-6"><span className="linkText cursor-pointer text-black">{str}</span></div>
        </div>
}

const HeaderMenu = () => {
    const [state,setState] = useState(false)

    const menuExpand = () => {
        let tl = gsap.timeline()
        tl.to(".linkName",{width: "4em", duration: 0.5, ease:"power3.inOut"})
        tl.to(".linkText",{transform:"translateY(0%)", duration:0.5, delay:-0.5, stagger: 0.1})
        setState(true);
        tl.play();
    }
    const menuShrink = () => {
        let tl = gsap.timeline()
        tl.to(".linkText",{transform:"translateY(100%)", duration: 0.5, stagger: 0.1})
        tl.to(".linkName",{width: "0em", duration: 0.5, delay:-0.5, ease:"power3.inOut"})
        setState(false);
        tl.play();
    }

    return(
        <>
        <div className="w-full px-4 bg-grey sticky bottom-0">
        <div className="flex h-14 place-content-between border-t border-darkGrey md:h-20">
            <div className="basis-1/3 py-4">
            <svg id="Layer_2" style={{height:'23px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.64 60"><defs></defs><g id="Layer_1-2"><rect fill="#141011" className="cls-1" x="69.82" y="17.51" width="17.82" height="42.49"/><polygon fill="#141011" className="cls-1" points="17.54 18 17.54 0 0 0 0 60 17.54 60 17.54 34.03 34.08 34.03 34.08 47.22 50.81 47.22 50.81 17.65 17.54 18"/></g></svg>
            </div>
            <div className="basis-1/3 hidden py-4 md:flex flex-col">
                <div className="text-xs relative overflow-hidden max-h-6 text-black font-semibold"><h6>Heber Jay Indino</h6></div>
                <div className="text-xs relative overflow-hidden max-h-6 text-black font-semibold"><h6>Designer/Developer</h6></div>
            </div>
            <div className="navigationMenu flex gap-1 basis-1/3 justify-end h-full py-4" onTouchStart={state !== true ? menuExpand : menuShrink} onMouseEnter={menuExpand} onMouseLeave={menuShrink}>
                <MenuItem str="bio" />
                <MenuItem str="work" />
                <MenuItem str="contact" />
            </div>
        </div>
        </div>
        </>
    )
}

export default HeaderMenu