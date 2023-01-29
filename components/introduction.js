import { useEffect,useRef,useState} from "react";
//import img from "../assets/DSC_0120_2.JPG";
import ArrowRight from "./arrowRight";
import gsap from "gsap";
import MotionReel from "./heroCarousel";
import Link from "next/link";

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
    let headingList = `${heading} text-mxxxl md:text-xxxl font-semibold text-black tracking-tighter uppercase leading-none`
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

    let ampersandContainer = useRef();
    let ampersandWrapper = useRef();
    let introductionContent = useRef();
    let marquee = useRef();
    let heading1container = useRef();
    let heading2container = useRef();
    let heading1Wrapper = useRef();
    let heading2Wrapper = useRef();

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
            .set(heading1Wrapper.current,{translateY:"33.33%"})
            .set(heading2Wrapper.current,{translateY:"-33.33%"})
            .set(ampersandWrapper.current,{translateY:"-110%"})
            .to(heading1Wrapper.current,{translateY:0,delay:5,duration:2,ease:"power3.inOut"})
            .to(heading2Wrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"<")
            .to(ampersandWrapper.current,{translateY:0,duration:2,ease:"power3.inOut"},"<")
            marquee.current = gsap.timeline({repeat:-1})
            .to(heading1container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2,delay:6},"+=5")
            .to(heading2container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"<")
            .to(ampersandContainer.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"<")
            .to(heading1container.current,{translateY:"-66.66%",ease:"power3.inOut",duration:1.2},"+=5")
            .to(heading2container.current,{translateY:"0%",ease:"power3.inOut",duration:1.2},"<")
            .to(ampersandContainer.current,{translateY:"-66.67%",ease:"power3.inOut",duration:1.2},"<")
        },introductionContent)
        return ()=>ctx.revert();
    },[])

    return (
        <div ref={introductionContent} className="snap-start introBody p-4 grid grid-cols-4 h-screen gap-2 grid-rows-mobileLayout md:gap-4 md:grid-cols-12 md:grid-rows-layout">
            <h1 className="hidden" id="jobTitles">Graphic Designer & Creative Developer</h1>
            <p className="paragraph row-start-1 col-start-2 col-span-3 leading-tight text-msm text-black md:text-sm md:leading-4 md:col-start-2 md:col-end-6 md:row-start-2 md:row-span-2">I am Heber Jay Indino, most people know me as Jay, a designer and developer who specialize in creating meaningful and beautiful digital experiences and visual compositions. I have skills in traditional graphic design and modern web development architecture. I can build design systems and develop web applications.</p>
            <div className="relative overflow-hidden flex flex-col gap-4 row-start-2 row-span-2 col-start-1 col-span-4 md:col-start-7 md:col-span-3 md:row-start-2 md:row-span-2">
                {/* <div className="flex z-10 p-8 mix-blend-exclusion">
                    <h6 className="text-sm text-white">View Selected Work</h6>
                    <Link href="/project">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.4388 42C32.8739 42 42.1438 32.7301 42.1438 21.295C42.1438 9.86001 32.8739 0.590088 21.4388 0.590088C10.0038 0.590088 0.733887 9.86001 0.733887 21.295C0.733887 32.7301 10.0038 42 21.4388 42ZM3.98164 24.1778H26.9846L20.1903 30.9722L24.4557 35.2376L38.5316 21.1617L24.4557 7.08578L20.1903 11.3512L26.9846 18.1456H3.98164V24.1778Z" fill="white"/>
                        </svg>
                    </Link>
                </div> */}
                <MotionReel classList="heroImage absolute bottom-0 object-cover w-full h-full" />
            </div>
            <TextSlider wrap={heading1Wrapper} refr={heading1container} heading={"heading1"} gridPos="row-start-4 col-span-3 md:row-start-4 md:col-span-6" firstWord={myTitle[0]} secondWord={myTitle[3]}/>
            <TextSlider wrap={heading2Wrapper} refr={heading2container} heading={"heading2"} gridPos="row-start-5 col-start-2 col-span-3 md:row-start-5 md:col-start-5 md:col-span-8" firstWord={myTitle[1]} secondWord={myTitle[4]}/>
            <div className="overflow-hidden flex flex-col justify-center row-start-4 col-start-4 md:col-start-11 md:col-span-2 md:row-start-4">
                <Ampersand wrapper={ampersandWrapper} container={ampersandContainer} glyph={myTitle[2]}/>
            </div>
            <div className="funFact flex leading-tight text-msm md:text-sm row-start-6 md:row-start-5 md:col-start-2 col-span-2">
                <div className="flex flex-col justify-center md:justify-end pb-4">
                <div className="text-black overflow-hidden"><h6 className="entra">This is NOT a website</h6></div>
                <div className="overflow-hidden">
                    <div className="entra flex gap-2 justify-start items-center">
                        <h6 className="text-red font-semibold uppercase underline">Wait...What?!</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 43 42" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.4388 42C32.8739 42 42.1438 32.7301 42.1438 21.295C42.1438 9.86001 32.8739 0.590088 21.4388 0.590088C10.0038 0.590088 0.733887 9.86001 0.733887 21.295C0.733887 32.7301 10.0038 42 21.4388 42ZM3.98164 24.1778H26.9846L20.1903 30.9722L24.4557 35.2376L38.5316 21.1617L24.4557 7.08578L20.1903 11.3512L26.9846 18.1456H3.98164V24.1778Z" fill="#F45844"/>
                        </svg>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Intro;