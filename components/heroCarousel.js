import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import { heroCarouselObj } from "../assets/heroImageList";
// import image1 from "../assets/stack-esp-por.jpg"
// import image2 from "../assets/aloha.jpg"
// import image3 from "../assets/cover-closeup.jpg"
// import image4 from "../assets/hanging-sign.jpg"

const image1 = '/images/ColorMaxFence.jpg'
const image2 = '/images/food-map-opt.jpg'
const image3 = '/images/details-03.jpg'
const image4 = '/images/united-way.png'
const image5 = '/images/RiversideLavenderRanch.jpg'

const imageArray = [image1,image2,image3,image4,image5]
const MotionReel = ({classList}) => {
    const [index,setIndex] = useState(0)
    const timeoutRef = useRef(null)
    const reel = useRef()

    const randomAnimation = () => {
        const rand = Math.floor(Math.random()*5)
        console.log(rand);
        gsap.set(reel.current,{scale:1.3,left:0,rotate:0})
        
        if (rand===0){
            return gsap.to(reel.current,{scale:1.4,duration:6, ease:"linear"})
        }
        if (rand===1){
            return gsap.to(reel.current,{left:"7%",duration:6, ease:"linear"})
        }
        if (rand===2){
            return gsap.to(reel.current,{rotate:"3deg",scale:1.2,duration:6, ease:"linear"})
        }
        if (rand===3){
            return gsap.to(reel.current,{left:"7%",scale:1.4,duration:6, ease:"linear"})
        }
        if (rand===4){
            return gsap.to(reel.current,{left:"-7%",scale:1.2,duration:6, ease:"linear"})
        }
        //zoom out
        //paralax slide
        //pan + zoom combo
        //rotate and zoom out
        //or just rotate
        //instead of changing src url, pre-render initial images and then apply slide change
    }

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    //try moving reset inside gsap context

    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(()=>{
            setIndex((prevIndex)=>
            prevIndex === imageArray.length-1 ? 0 : prevIndex+1
            )
            randomAnimation()
        },6000)

        return ()=>{resetTimeout()}
    },[index])

    return (
        <div  ref={reel} className={classList}>
            <Image src={imageArray[index]} alt="motion reel" fill style={{objectFit:"cover"}}/>
        </div>
    )
}

export default MotionReel;