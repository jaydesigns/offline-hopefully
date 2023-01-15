import Image from "next/image"
import { useEffect, useState } from "react"

const PWAFeatures = () => {
    //const [featureSVG,setFeatureSVG] = useState()
    const [svgWidth,setSVGWidth] = useState(0)
    const [svgHeight,setSVGHeight] = useState(0)
    const [lgRectWidth,setLgRectWidth] = useState(0)
    const [lgRectHeight,setLgRectHeight] = useState(0)
    useEffect(()=>{
        const SVGObj = window.getComputedStyle(document.querySelector("#clippingCanvas"))
        setSVGWidth(parseInt(SVGObj.width))
        setSVGHeight(parseInt(SVGObj.height))

        setLgRectWidth((parseInt(SVGObj.width))/3)
        setLgRectHeight((parseInt(SVGObj.height))/2)

        window.onresize = () => {
            setSVGWidth(parseInt(SVGObj.width))
            setSVGHeight(parseInt(SVGObj.height))
            setLgRectWidth((parseInt(SVGObj.width))/3)
            setLgRectHeight((parseInt(SVGObj.height))/2)
        }
    },[])

    return (
        <div className="flex flex-col featureSection w-screen h-screen p-4">
            <div className="flex justify-between w-full h-1/6">
                <span className="text-white">Installability</span>
                <span className="text-white">Installability</span>
                <span className="text-white">Installability</span>
            </div>
            <div className="relative w-full h-5/6">
                <div className="featureCover w-full h-full overflow-hidden">
                    <Image src="/images/DSC_0120_2.jpg" alt="image" width={svgWidth} height={400}></Image>
                </div>
                <svg id="clippingCanvas" className="absolute top-0 flex" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <defs>
                        <clipPath id="featureClip">
                            <rect width={`${lgRectWidth}px`} height={`${lgRectHeight}px`} x={0} y={0} fill="#fff" />
                            <rect width={`${lgRectWidth}px`} height={`${lgRectHeight}px`} x={500} y={0} fill="#fff" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default PWAFeatures