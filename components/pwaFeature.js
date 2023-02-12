import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import LinkText from './linkText'
import gsap from "gsap"
import SplitType from "split-type"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

//on mobile the top half could be the selection and image while the lower half is the text
const FeatureDescription = ({featureText}) => {
    return (
        <div ref={featureText} className="realtive md:absolute bottom-32 w-full md:w-1/3 pr-6 h-1/3 md:h-1/3 text-white flex flex-col justify-between pb-2">
            <div className="overflow-y-hidden">
                <h4 className="featureText text-XL md:text-MED tracking-tighter">Installability</h4>
            </div>
            <div className="overflow-y-hidden">
                <p className="featureDescription text-XS">This web app utilizes new technology which enables you to install this web app on whatever device you&apos;re using. If you&apos;re using a smartphone, the app will be installed on your homescreen. If you are using a desktop device, it will be added to your app list.</p>
            </div>
            <LinkText str={"Try it out"}/>
        </div>
    )
}

const PWAFeatures = () => {
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
    const [imageSource, setImageSource] = useState("/images/guggenheim.jpg")
    const featureImage = useRef()
    const featureText = useRef()
    const featureTL = useRef(gsap.timeline())

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        featureTL.current.fromTo("rect",{transform:"matrix(1,0,0,1,0,0)"},{transform:"matrix(1,0,0,1,0,0)",scrollTrigger:{scroller:"body",trigger:".featureSection",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})
    })

    useEffect(()=>{
        const SVGObj = window.getComputedStyle(document.querySelector("#clippingCanvas"))
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

    const handleImageSwitch = (str) => {
        const handler = () =>{
            const tl = gsap.timeline()
            .set(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 0% 0% 0%)"})
            .fromTo(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 100%)",duration:1.2,ease:"power4.inOut"})
            .to(featureText.current.querySelectorAll(".featureText"),{translateY:"-120%"})
            .to(featureText.current.querySelectorAll(".word"),{translateY:"-120%",stagger:0.02,duration:1,ease:"power3.inOut"})
            .fromTo(featureImage.current.querySelectorAll("rect"),{clipPath:"inset(0% 100% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1.2,ease:"power4.inOut"})
            setTimeout(()=>{setImageSource(str)},1200)
        }
        return handler
    }

    return (
        <div className="snap-start relative flex flex-col featureSection w-screen h-screen p-4 pb-32 text-white">
            <div className="grid grid-cols-3 w-full h-1/6 border-t-2 border-white pt-4">
                <span onClick={handleImageSwitch("/images/guggenheim.jpg")} className="text-white cursor-pointer">Installability</span>
                <span onClick={handleImageSwitch("/images/arizona-memorial.JPG")} className="text-white cursor-pointer">Works Offline</span>
                <span onClick={handleImageSwitch("/images/ocean.jpg")} className="text-white cursor-pointer">Flexible</span>
            </div>
            <div className="relative w-full h-1/2 md:h-5/6">
                <div className="featureCover w-full h-1/2 md:h-full overflow-hidden">
                    <Image src={imageSource} alt="image" fill style={{objectFit:"cover"}} placeholder="blur" blurDataURL="/images/guggenheim.jpg"></Image>
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
            <FeatureDescription featureText={featureText}/>
        </div>
    )
}

export default PWAFeatures