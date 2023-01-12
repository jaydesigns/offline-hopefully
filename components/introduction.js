import { useEffect,useRef,useState} from "react";
//import img from "../assets/DSC_0120_2.JPG";
import ArrowRight from "./arrowRight";
import gsap from "gsap";
import MotionReel from "./heroCarousel";

const Ampersand = ({container,glyph}) => {
    return (
        <div data-scroll-speed="9" className="flex justify-end">
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

const TextSlider = ({refr,heading,gridPos,firstWord,secondWord}) => {
    let classList = `${gridPos} overflow-hidden overflow-y-hidden relative align-baseline`
    let headingList = `${heading} text-mxxxl md:text-xxxl font-semibold text-black tracking-tighter uppercase leading-none`
    return (
        <div className={classList}>
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
    )
}

const Intro = () => {
    const [ myTitle,setMyTitle ] = useState([])

    let ampersandContainer = useRef();
    let introductionContent = useRef();
    let marquee = useRef();
    let heading1container = useRef();
    let heading2container = useRef();

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
            .to(heading1container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2,delay:6})
            .to(heading2container.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"<")
            .to(ampersandContainer.current,{translateY:"-33.33%",ease:"power3.inOut",duration:1.2},"<")
            .to(heading1container.current,{translateY:"-66.66%",ease:"power3.inOut",duration:1.2},"+=5")
            .to(heading2container.current,{translateY:"0%",ease:"power3.inOut",duration:1.2},"<")
            .to(ampersandContainer.current,{translateY:"-66.67%",ease:"power3.inOut",duration:1.2},"<")
        },introductionContent)
        return ()=>ctx.revert();
    },[])

    return (
        <div data-scroll data-scroll-speed="9" ref={introductionContent} className="introBody p-4 grid grid-cols-4 h-screen grid-rows-mobileLayout md:grid-cols-12 md:grid-rows-layout">
            <h1 className="hidden" id="jobTitles">Graphic Designer & Creative Developer</h1>
            <p className="paragraph row-start-1 col-start-2 col-span-3 leading-tight text-msm text-black md:text-xl md:leading-6 md:col-start-2 md:col-end-6 md:row-start-2 md:row-span-2">I am Heber Jay Indino, most people know me as Jay, a designer and developer who specialize in creating meaningful and beautiful digital experiences and visual compositions. I have skills in traditional graphic design and modern web development architecture. I can build design systems and develop web applications.</p>
            <div className="relative row-start-2 row-span-2 col-start-1 col-span-4 md:col-start-7 md:col-span-4 md:row-start-1 md:row-span-4">
            <MotionReel classList="absolute bottom-0 object-cover w-full h-full" />
            </div>
            <TextSlider refr={heading1container} heading={"heading1"} gridPos="row-start-4 col-span-3 md:row-start-4 md:col-span-6" firstWord={myTitle[0]} secondWord={myTitle[3]}/>
            <TextSlider refr={heading2container} heading={"heading2"} gridPos="row-start-5 col-start-2 col-span-3 md:row-start-5 md:col-start-5 md:col-span-7" firstWord={myTitle[1]} secondWord={myTitle[4]}/>
            <div className="flex flex-col justify-center row-start-4 col-start-4 md:col-start-11 md:col-span-2 md:row-start-4">
            <Ampersand container={ampersandContainer} glyph={myTitle[2]}/>
            </div>
            <div className="funFact flex leading-tight text-msm md:text-sm row-start-6 md:row-start-5 md:col-start-2 col-span-2">
                <div className="flex flex-col justify-center md:justify-end">
                <h6 className=" font-semibold">Fun Fact:</h6>
                <h6 className=" font-semibold">This is NOT a website</h6>
                <div className="flex gap-2">
                    <ArrowRight color="#F45844"/>
                    <h6 className="text-red font-semibold uppercase underline">Wait...What?!</h6>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Intro;