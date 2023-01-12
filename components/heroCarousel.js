import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import { heroCarouselObj } from "../assets/heroImageList";
// import image1 from "../assets/stack-esp-por.jpg"
// import image2 from "../assets/aloha.jpg"
// import image3 from "../assets/cover-closeup.jpg"
// import image4 from "../assets/hanging-sign.jpg"

const image1 = '/images/stack-esp-por.jpg'
const image2 = '/images/aloha.jpg'
const image3 = '/images/cover-closeup.jpg'
const image4 = '/images/hanging-sign.jpg'

const imageArray = [image1,image2,image3,image4]
const MotionReel = ({classList}) => {
    const [index,setIndex] = useState(0)
    const timeoutRef = useRef(null)

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }
    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(()=>{
            setIndex((prevIndex)=>
            prevIndex === imageArray.length-1 ? 0 : prevIndex+1
            )
        },6000)

        return ()=>{resetTimeout()}
    },[index])
    return (
        <div >
            <Image src={imageArray[index]} alt="motion reel" width={1080} height={1080} className={classList}/>
        </div>
    )
}

export default MotionReel;