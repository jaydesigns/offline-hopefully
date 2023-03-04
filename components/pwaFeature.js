import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"
import LinkText from './linkText'
import gsap from "gsap"
import SplitType from "split-type"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

//on mobile the top half could be the selection and image while the lower half is the text
const FeatureDescription = (props) => {
    //
    //render every feature description just hidden and they just pop up when selected
    //
    return (
        <div ref={props.featureText} className="relative md:absolute md:bottom-32 w-full md:w-1/4 pr-6 h-1/3 md:h-1/3 text-white flex flex-col justify-between pb-2 mix-blend-exclusion">
            <div className="absolute" data-name="installable">
                <h4 className="featureText lined text-XL md:text-MED tracking-tighter">{props.obj.installable.title}</h4>
                <p className="featureDescription lined md:pl-0">{props.obj.installable.desc}</p>
                {/* <LinkText str={"Try it out"}/> */}
            </div>
            <div className="absolute" data-name="offline">
                <h4 className="featureText lined text-XL md:text-MED tracking-tighter">{props.obj.offline.title}</h4>
                <p className="featureDescription lined md:pl-0">{props.obj.offline.desc}</p>
                
            </div>
            <div className="absolute" data-name="flexible">
                <h4 className="featureText lined text-XL md:text-MED tracking-tighter">{props.obj.flexible.title}</h4>
                <p className="featureDescription lined md:pl-0">{props.obj.flexible.desc}</p>
                
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
            cover: "/images/arizona-memorial.JPG",
            title: "Offline",
            desc: "Using the local machine storage API, after installing the web application, the app should work even without internet connection."
        },
        flexible: {
            cover: "/images/ocean.jpg",
            title: "API-based",
            desc: "The architecture of this app makes use of decentralized microservices that communicate through API (Application Programming Interface)."
        }
    }
    //const [featureSVG,setFeatureSVG] = useState()
    //
    //Set window width here
    //
    const [windowWidth,setWindowWidth] = useState()
    const [svgWidth,setSVGWidth] = useState(0)
    const [svgHeight,setSVGHeight] = useState(0)
    const [lgRectWidth,setLgRectWidth] = useState(0)
    const [smRectWidth,setSmRectWidth] = useState(0)
    const [lgRectHeight,setLgRectHeight] = useState(0)
    const featureImage = useRef()
    const featureText = useRef()
    const rect2 = useRef()
    const rect5 = useRef()
    const featureTL = useRef(gsap.timeline())
    const changeTL = useRef(gsap.timeline())
    const mm = useRef(gsap.matchMedia())
    const [imageSource, setImageSource] = useState(obj.installable.cover)
    // const [ title,setTitle ] = useState("")
    // const [ desc,setDesc ] = useState("")
    const [selectedFeature,setSelectedFeature] = useState("installable")

    useEffect(()=>{
        let lines;
        const runSplitType = () =>{
            lines = new SplitType(".lined",{type:"lines"})
        }
        runSplitType()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplitType()
        })
    },[])
    
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        const SVGObj = window.getComputedStyle(document.querySelector("#clippingCanvas"))

        mm.current.add("(min-width:768px)",()=>{featureTL.current.fromTo(rect5.current,{transform:"matrix(1,0,0,1,0,0)"},{transform:`matrix(1,0,0,1,${(parseInt(SVGObj.width))/6},0)`,scrollTrigger:{scroller:"body",trigger:".featureSection",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})})
        mm.current.add("(min-width:768px)",()=>{featureTL.current.fromTo(rect2.current,{transform:`matrix(1,0,0,1,-${(parseInt(SVGObj.width))/6},0)`},{transform:"matrix(1,0,0,1,0,0)",scrollTrigger:{scroller:"body",trigger:".featureSection",start:"top center",end:"top top",scrub:true,pinSpacing:false}})})

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
    },[windowWidth])

    const handleImageSwitch = (dataIndex) => {
        const handler = () =>{
            setSelectedFeature(dataIndex)
            
            changeTL.current.set(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 0% 0% 0%)"})
            
            changeTL.current.fromTo(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",duration:1.3,ease:"power4.inOut"})
            changeTL.current.fromTo(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(100% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1.3,ease:"power4.inOut"},"+=1")
        }
        
        return handler
    }

    useEffect(()=>{
        let selected = document.querySelector(`[data-name='${selectedFeature}']`)
        
        let tl = gsap.timeline()
        tl.to(featureText.current.querySelectorAll('.word'),{translateY:"120%",duration:1,ease:"power3.in"})
        
        tl.to(selected.querySelectorAll(".word"),{translateY:"0%", duration:1.5,ease:"power3.out"})
        setTimeout(()=>{
            setImageSource(obj[`${selectedFeature}`].cover)
        },1000)
    })


    return (
        <div className="snap-start relative flex flex-col featureSection w-screen h-screen p-4 pb-32 text-white">
            <div className="grid grid-cols-3 w-full h-1/6 border-t-2 border-white pt-4 mix-blend-exclusion">
                {/* You could probably use an object here as the argument, also for future-proofing when geting data from API */}
                <span onClick={handleImageSwitch("installable")} data-index="installable" className="text-white cursor-pointer">Installability</span>
                <span onClick={handleImageSwitch("offline")} data-index="offline" className="text-white cursor-pointer">Works Offline</span>
                <span onClick={handleImageSwitch("flexible")} data-index="flexible" className="text-white cursor-pointer">API-based</span>
            </div>
            <div className="relative w-full h-2/3 md:h-5/6">
                <div className="featureCover w-full h-1/2 md:h-full overflow-hidden">
                    <Image src={imageSource} alt="image" fill style={{objectFit:"cover"}} placeholder="blur" blurDataURL="/images/guggenheim.jpg"></Image>
                </div>
                <svg ref={featureImage} id="clippingCanvas" className="absolute top-0 flex" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <defs>
                        <clipPath id="featureClip">
                                <rect width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={0} y={0} fill="#fff" />
                                <rect ref={rect2} width={`${smRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*3)/6)} y={0} fill="#fff" />
                                <rect width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*4)/6)} y={0} fill="#fff" />
                                <rect width={`${smRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*2)/6)} y={svgHeight/2} fill="#fff" />
                                <rect ref={rect5} width={`${lgRectWidth-10}px`} height={`${lgRectHeight-10}px`} x={((svgWidth*3)/6)} y={svgHeight/2} fill="#fff" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <FeatureDescription selectedFeature={selectedFeature} featureText={featureText} obj={obj}/>
        </div>
    )
}

export default PWAFeatures