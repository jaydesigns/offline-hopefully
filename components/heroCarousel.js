import gsap from "gsap";
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
    const reel = useRef()

    const randomAnimation = () => {
        const rand = Math.floor(Math.random()*2)
        console.log(rand);
        if (rand===0){
            return gsap.to(reel.current,{scale:1.7,duration:8, ease:"linear"})
        }
        if (rand===1){
            return gsap.to(reel.current,{left:0,duration:8, ease:"linear"})
        }
        //zoom out
        //paralax slide
        //pan + zoom combo
    }

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        gsap.set(reel.current,{scale:1.5,left:"-20%"})
    }

    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(()=>{
            setIndex((prevIndex)=>
            prevIndex === imageArray.length-1 ? 0 : prevIndex+1
            )
            randomAnimation()
        },8000)

        return ()=>{resetTimeout()}
    },[index])

    return (
        <div  ref={reel} className={classList}>
            <Image src={imageArray[index]} alt="motion reel" fill style={{objectFit:"cover"}}/>
        </div>
    )
}

export default MotionReel;