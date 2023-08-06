import Image from "next/image"
import { useEffect, useState, useRef, useCallback,useContext } from "react"
import LinkText from './linkText'
import gsap from "gsap"
import SplitType from "split-type"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import InstallPWA from "./installPWA"
import { ThemeContext } from "./layout"
import { OutroTimeline } from "../pages/_app"

//on mobile the top half could be the selection and image while the lower half is the text
const FeatureDescription = (props) => {
    //
    //render every feature description just hidden and they just pop up when selected
    //
    return (
        <div ref={props.featureText} className="relative md:absolute md:bottom-32 w-full md:w-1/4 pr-6 h-1/3 md:h-1/4 text-white pb-2 mix-blend-exclusion">
            <div className="ft-clip absolute flex flex-col gap-4" data-name="offline">
                <h2 className="featureText lined text-XL md:text-4xl font-medium tracking-tight">{props.obj.offline.title}</h2>
                <p className="featureDescription lined md:pl-0">{props.obj.offline.desc}</p>
                
            </div>
            <div className="ft-clip absolute flex flex-col gap-4" data-name="flexible">
                <h2 className="featureText lined text-XL md:text-4xl font-medium tracking-tight">{props.obj.flexible.title}</h2>
                <p className="featureDescription lined md:pl-0">{props.obj.flexible.desc}</p>
                
            </div>
            <div className="ft-clip absolute flex flex-col h-full justify-between" data-name="installable">
                <div className=" flex flex-col gap-4">
                    <h2 className="featureText lined text-XL md:text-4xl font-medium tracking-tight">{props.obj.installable.title}</h2>
                    <p className="featureDescription lined md:pl-0">{props.obj.installable.desc}</p>
                    <div className="z-50 overflow-hidden relative"><div className="cta"><InstallPWA text={"Try it"} /></div></div>
                </div>
            </div>
        </div>
    )
}

const PWAFeatures = () => {
    const obj = {
        installable:{
            cover: "/images/guggenheim.jpg",
            title: "Installable",
            desc: "This web app utilizes new technology which enables you to install this web app on whatever device you're using."
        },
        offline: {
            cover: "/images/DSC_0120-b&w-1.JPG",
            title: "Offline",
            desc: "Using the local machine storage API, after installing the web application, this app should work even without internet connection."
        },
        flexible: {
            cover: "/images/PXL_20221224_211305839-b&w.jpg",
            title: "Modern Web",
            desc: "I've designed and developed this app with performance in mind. Through composable architecture, this app is faster, more secure, and scalable."
        }
    }
    //const [featureSVG,setFeatureSVG] = useState()
    //
    //Set window width here
    //
    const [windowWidth,setWindowWidth] = useState()
    const [svgWidth,setSVGWidth] = useState(10)
    const [svgHeight,setSVGHeight] = useState(10)
    const [lgRectWidth,setLgRectWidth] = useState(10)
    const [smRectWidth,setSmRectWidth] = useState(10)
    const [lgRectHeight,setLgRectHeight] = useState(10)
    const featureImage = useRef()
    const featureText = useRef()
    const featureTL = useRef(gsap.timeline())
    const changeTL = useRef(gsap.timeline())
    const mm = useRef(gsap.matchMedia())
    const [imageSource, setImageSource] = useState(obj.installable.cover)
    // const [ title,setTitle ] = useState("")
    // const [ desc,setDesc ] = useState("")
    const [selectedFeature,setSelectedFeature] = useState('installable')
    const ThemeColors = useContext(ThemeContext)
    const {outro,setOutro} = useContext(OutroTimeline)
    const featureSection = useRef()

    useIsomorphicLayoutEffect(() => {
        let text
        const splitText = () => {
            text = new SplitType('.lined',{types:"lines, words"})
        }
        splitText()
        window.addEventListener("resize", () => {
            splitText()
            gsap.set(text.words,{translateY:"120%"})
            setSelectedFeature('installable')
        })
    },[])
    
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        const SVGObj = window.getComputedStyle(document.querySelector("#clippingCanvas"))

        const rects = document.querySelectorAll("rect")
        const topHalf = [rects[0],rects[1],rects[2]]
        const bottomHalf = [rects[3],rects[4]]
        const resetFeatureRects = ()=>{
            gsap.to([rects[0],rects[1],rects[2]],{clipPath:"inset(100% 0% 0% 0%)",duration:1})
            gsap.to([rects[3],rects[4]],{clipPath:"inset(0% 0% 100% 0%)",duration:1})
        }
        resetFeatureRects()
        ScrollTrigger.create({
            trigger: '.featureSection',
            start: "top 25%",
            onEnter: ()=>{
                gsap.to("rect",{clipPath:"inset(0% 0% 0% 0%)",duration:1,ease:"power3.inOut"})
            },
            onEnterBack: ()=>{
                gsap.to("rect",{clipPath:"inset(0% 0% 0% 0%)",duration:1,ease:"power3.inOut"})
            },
        })
        ScrollTrigger.create({
            trigger: '.featureSection',
            onLeave: resetFeatureRects,
            onLeaveBack: resetFeatureRects,
        })

        let ftTL = gsap.timeline()
        ftTL.fromTo('.ft-clip',{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",ease:"power3.out",duration:2})
        ftTL.fromTo('.ft-border',{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",ease:"power3.out",duration:2},"<")

        ScrollTrigger.create({
            trigger: '.featureSection',
            start: "top center",
            end: "top 10%",
            onToggle: () => setOutro(ftTL)
        })

        setSVGWidth(parseInt(SVGObj.width))
        setSVGHeight(parseInt(SVGObj.height))
        
        setLgRectWidth((parseInt(SVGObj.width))/3)
        setSmRectWidth((parseInt(SVGObj.width))/6)
        setLgRectHeight((parseInt(SVGObj.height))/2)

        window.onresize = () => {
            setWindowWidth(window.innerWidth)
            setSVGWidth(parseInt(SVGObj.width))
            setSVGHeight(parseInt(SVGObj.height))
            setLgRectWidth((parseInt(SVGObj.width))/3)
            setLgRectHeight((parseInt(SVGObj.height))/2)
        }
    },[windowWidth,setOutro])

    const handleImageSwitch = (dataIndex) => {
        const handler = (e) =>{
            let selected = document.querySelector(`[data-name='${selectedFeature}']`)
            const features = document.querySelectorAll('.feature')
            //console.log(Object.keys(featureImage.current.querySelectorAll("rect")).map(el=>console.log(el)));
            const rects = featureImage.current.querySelectorAll("rect")
            const rectsArray = Object.keys(rects).map(el=>rects[el])
            //console.log(rectsArray[0]);
            const topHalf = [rectsArray[0],rectsArray[1],rectsArray[2]]
            const bottomHalf = [rectsArray[3],rectsArray[4]]
            
            changeTL.current.set(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 0% 0% 0%)"})
            
            changeTL.current.fromTo(topHalf,{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(100% 0% 0% 0%)",duration:1.3,ease:"power4.inOut"})
            changeTL.current.fromTo(bottomHalf,{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",duration:1.3,ease:"power4.inOut"},"<")
            changeTL.current.add(() => setSelectedFeature(dataIndex))
            changeTL.current.fromTo(topHalf,{clipPath:"inset(100% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1.3,ease:"power4.inOut"},"+=0.5")
            changeTL.current.fromTo(bottomHalf,{clipPath:"inset(0% 0% 100% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1.3,ease:"power4.inOut"},"<")

            features.forEach(element => {
              if(element===e.target){
                gsap.to(e.target,{color:`${ThemeColors.red}`})
              }  else {
                gsap.to(element,{color:`${ThemeColors.white}`})
              }
            })
        }
        //
        //
        return handler
    }

    useEffect(()=>{
        const tl = gsap.timeline()
        let selected = document.querySelector(`[data-name='${selectedFeature}']`)
        tl.to(featureText.current.querySelectorAll('.word'),{translateY:"120%",duration:1,ease:"power3.in"})
        tl.to(selected.querySelectorAll(".word"),{translateY:"0%", duration:1.5,ease:"power3.out"})
        if(selectedFeature!=='installable'){
            tl.to('.cta',{translateY:"120%"},"<")
        } else {
            tl.to('.cta',{translateY:"0%"},"-=1")
        }
    },[selectedFeature])


    return (
        <div ref={featureSection} className="featureSection snap-start relative flex flex-col gap-4 justify-between w-screen h-screen p-4 pb-32 text-white">
            <div className="ft-border flex w-full border-b border-white py-4 mix-blend-exclusion">
                {/* You could probably use an object here as the argument, also for future-proofing when geting data from API */}
                <h4 className="w-1/2 md:w-1/4 text-MED md:text-SM font-medium">Not just<br></br>a Website</h4>
                <div className="flex flex-col md:flex-row flex-auto">
                    <div className="ft-clip flex gap-4 grow hover:text-red text-white">
                        <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">I</h6></div>
                        <span onClick={handleImageSwitch("installable")} data-index="installable" className="feature cursor-pointer grow font-medium hover:text-red">Installable</span>
                    </div>
                    <div className="ft-clip flex gap-4 grow hover:text-red text-white">
                    <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">O</h6></div>
                        <span onClick={handleImageSwitch("offline")} data-index="offline" className="feature cursor-pointer grow font-medium hover:text-red">Works Offline</span>
                    </div>
                    <div className="ft-clip flex gap-4 grow hover:text-red text-white">
                    <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">A</h6></div>
                        <span onClick={handleImageSwitch("flexible")} data-index="flexible" className="feature cursor-pointer grow font-medium hover:text-red">Smoother Experience</span>
                    </div>
                </div>
            </div>
            <div className="ft-clip relative w-full h-2/3 md:h-5/6">
                <div className="relative featureCover w-full h-full overflow-hidden">
                    {(selectedFeature==="installable")&&<Image src={'/images/guggenheim.jpg'} alt="image" fill style={{objectFit:"cover",objectPosition:"relative"}} placeholder="blur" blurDataURL="data:..." sizes="(max-width: 600px) 100vw,100vw"></Image>}
                    {(selectedFeature==="offline")&&<Image src={'/images/DSC_0120-b&w-1.JPG'} alt="image" fill style={{objectFit:"cover",objectPosition:"relative"}} placeholder="blur" blurDataURL="data:..." sizes="(max-width: 600px) 100vw,100vw"></Image>}
                    {(selectedFeature==="flexible")&&<Image src={'/images/PXL_20221224_211305839-b&w.jpg'} alt="image" fill style={{objectFit:"cover",objectPosition:"relative"}} placeholder="blur" blurDataURL="data:..." sizes="(max-width: 600px) 100vw,100vw"></Image>}
                </div>
                <svg ref={featureImage} id="clippingCanvas" className="absolute top-0 flex" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <defs>
                        <clipPath id="featureClip">
                                <rect width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={0} y={0} fill="#fff" />
                                <rect width={`${smRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*3)/6)} y={0} fill="#fff" />
                                <rect width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*4)/6)} y={0} fill="#fff" />
                                <rect width={`${smRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*2)/6)} y={svgHeight/2} fill="#fff" />
                                <rect width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*3)/6)} y={svgHeight/2} fill="#fff" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <FeatureDescription selectedFeature={selectedFeature} featureText={featureText} obj={obj}/>
        </div>
    )
}

export default PWAFeatures