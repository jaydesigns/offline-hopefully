import { useCallback, useEffect,useRef,useState,useContext} from "react";
//import img from "../assets/DSC_0120_2.JPG";
import ArrowRight from "./arrowRight";
import gsap from "gsap";
import MotionReel from "./heroCarousel";
import Link from "next/link";
import LinkText from './linkText'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import SplitType from "split-type";
import { IntroTimeline } from "./layout";
import { SplashTimeline } from "../pages/_app";

const Ampersand = ({wrapper,container,glyph}) => {
    return (
        <div ref={wrapper} className="flex justify-end">
            <div className="ampersand relative overflow-hidden bg-red text-white rounded-full aspect-square w-ampMobile md:w-ampMd">
                <div ref={container} className="amp-wrapper flex flex-col">
                    <div className="amp flex flex-col justify-center aspect-square w-full"><ArrowRight classToAdd="lgArrow rotate-90" color="#ffffff"/></div>
                    <div className="glyph amp flex flex-col justify-center aspect-square w-full">
                        <span className="flex justify-center text-xxl leading-none font-semibold">{glyph}</span>
                    </div>
                    <div className="amp flex flex-col justify-center aspect-square w-full"><ArrowRight classToAdd="lgArrow rotate-90" color="#ffffff"/></div>
                </div>
            </div>
        </div>
    )
}

const TextSlider = ({wrap,refr,heading,gridPos,firstWord,secondWord}) => {
    let classList = 'overflow-hidden overflow-y-hidden relative align-baseline'
    let headingList = `${heading} text-[12vw] md:text-xxxl font-semibold text-black tracking-tighter uppercase leading-none`
    return (
        <div className={`${gridPos} overflow-hidden realtive`}>
            <div ref={wrap} className={classList}>
                <div ref={refr} className="flex flex-col flex-nowrap">
                    <span className={headingList}>
                        {secondWord}
                    </span>
                    <span className={headingList}>
                        {firstWord}
                    </span>
                    <span className={headingList}>
                        {secondWord}
                    </span>
                </div>
            </div>
        </div>
    )
}

const Intro = ({app}) => {
    const [ myTitle,setMyTitle ] = useState([])

    let ampersandWrapper = useRef();
    let heading1Wrapper = useRef();
    let heading2Wrapper = useRef();
    let introtl = useRef(gsap.timeline())

    let ampersandContainer = useRef();
    let introductionContent = useRef();
    let marquee = useRef();
    let heading1container = useRef();
    let heading2container = useRef();
    const mm = useRef(gsap.matchMedia())

    const splashAnimate = useContext(SplashTimeline)

    //Split the lines
    useIsomorphicLayoutEffect(()=>{
        let lines;
        const runSplit = () => {
        
        lines = new SplitType(".paragraph",{types:'lines,words'})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplit()
        })
    },[])

    useEffect(()=>{
        let jobTitles = document.querySelector("#jobTitles")
        let jobTitlesArray= jobTitles.innerText.split(" ")
        setMyTitle(jobTitlesArray);
    },[])

    useEffect(()=>{
        let ctx = gsap.context(()=>{
            marquee.current = gsap.timeline()
            .set(heading1container.current,{translateY:0})
            .set(heading2container.current,{translateY:"-66.66%"})
            marquee.current = gsap.timeline({repeat:-1})
            .to(heading1container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2,delay:8.5})
            .to(heading2container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"-=1.05")
            .to(ampersandContainer.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"-=1.05")
            .to(heading1container.current,{translateY:"-66.66%",ease:"power3.inOut",duration:1.2},"+=6")
            .to(heading2container.current,{translateY:"0%",ease:"power3.inOut",duration:1.2},"-=1.05")
            .to(ampersandContainer.current,{translateY:"-66.67%",ease:"power3.inOut",duration:1.2},"-=1.05")
        },introductionContent)
        return ()=>ctx.revert();
    },[])

    // splashAnimate.current =()=>{
    //     gsap.set(".word",{translateY:"2em"})
    //     gsap.set(".entra",{translateY:"2em"})
    //     gsap.set(heading1Wrapper.current,{translateY:"33.33%"})
    //     gsap.set(heading2Wrapper.current,{translateY:"-33.33%"})
    //     gsap.set(ampersandWrapper.current,{translateY:"-110%"})
    //     let tl = gsap.timeline()
    //     tl.to(introductionContent.current,{opacity:1})
    //     tl.fromTo(".reel",{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:2,ease:"power4.inOut"})        
    //     tl.to(heading1Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"<")
    //     tl.to(heading2Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.85")          
    //     tl.to(ampersandWrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.7")
    //     tl.to(".word",{translateY:0,duration:1,stagger:0.02},"<")
    //     tl.to(".entra",{translateY:0, stagger: 0.2, ease:"power3.inOut", duration: 2},"<")
    //     return tl
    // }

    //
    //This timeline here gets rendered everytime the intro is rendered
    //including the splash animate
    //
    useEffect(()=>{
        gsap.set(".word",{translateY:"2em"})
        gsap.set(".entra",{translateY:"2em"})
        gsap.set(heading1Wrapper.current,{translateY:"33.33%"})
        gsap.set(heading2Wrapper.current,{translateY:"-33.33%"})
        gsap.set(ampersandWrapper.current,{translateY:"-110%"})
        let tl = gsap.timeline()
        tl.to(introductionContent.current,{opacity:1})
        tl.fromTo(".reel",{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:2,ease:"power4.inOut"})        
        tl.to(heading1Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"<")
        tl.to(heading2Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.85")          
        tl.to(ampersandWrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"-=1.7")
        tl.to(".word",{translateY:0,duration:1,stagger:0.02},"<")
        tl.to(".entra",{translateY:0, stagger: 0.2, ease:"power3.inOut", duration: 2},"<")
    },[])

      /* useIsomorphicLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
          
            gsap.timeline()
            .set(".menuEntra",{translateY:"-100%"})
            .to(".menuEntra",{translateY:0, stagger: 0.2, ease:"power3.out", duration: 1},"+=6")
        })
        return ()=>ctx.revert()
      },[]) */

    const scrollToFeature = useCallback(()=>{
        gsap.registerPlugin(ScrollToPlugin)
        return(
            gsap.to(window,{duration:2,scrollTo:".featureSection",duration:3,ease:"power3.inOut"})
        )
    },[])
    
    return (
        <div style={{opacity:0}} ref={introductionContent} className="snap-start introBody p-4 grid grid-cols-4 h-screen gap-2 grid-rows-mobileLayout md:grid-cols-12 md:grid-rows-layout">
            <h1 className="hidden" id="jobTitles">Visual Designer & Creative Developer</h1>
            <p className="paragraph row-start-1 col-start-2 col-span-4 font-semibold text-black md:col-start-2 md:col-end-5 md:row-start-2 md:row-span-2">Hi! My name is Heber Jay Indino, most people know me as Jay, I&apos;m a designer and developer who specialize in creating meaningful and beautiful digital experiences. I have skills in traditional graphic design and modern web development architecture. I can build design systems and develop web applications.</p>
            <div className="reel relative overflow-hidden flex flex-col gap-4 row-start-2 row-span-1 col-start-1 col-span-4 lg:col-start-9 lg:col-span-2 md:col-start-7 md:row-start-3 md:row-span-1">
                <MotionReel classList="heroImage absolute bottom-0 object-cover w-full h-full" />
            </div>
            <TextSlider wrap={heading1Wrapper} refr={heading1container} heading={"heading1"} gridPos="row-start-4 col-span-3 md:row-start-4 md:col-span-6 col-start-1" firstWord={myTitle[0]} secondWord={myTitle[3]}/>
            <TextSlider wrap={heading2Wrapper} refr={heading2container} heading={"heading2"} gridPos="row-start-5 col-start-2 col-span-3 md:row-start-5 md:col-start-5 md:col-span-8" firstWord={myTitle[1]} secondWord={myTitle[4]}/>
            <div className="overflow-hidden flex flex-col justify-center row-start-4 col-start-4 md:col-start-11 md:col-span-2 md:row-start-4">
                <Ampersand wrapper={ampersandWrapper} container={ampersandContainer} glyph={myTitle[2]}/>
            </div>
            <div className="funFact flex leading-tight text-msm md:text-sm row-start-6 md:row-start-5 md:col-start-2 col-span-2">
                <div className="flex flex-col justify-center md:justify-end pb-4">
                <div className="text-black overflow-hidden"><h6 className="entra text-xs font-semibold">This is NOT a website</h6></div>
                <div className="overflow-hidden cursor-pointer">
                    <div onClick={scrollToFeature} className="entra">
                        <LinkText str={'Wait... what?'} arrowClass={"rotate-90"}/>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Intro;