import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const reelSource = '/images/reel/'
const image1 = 'ColorMaxFence.jpg'
const image2 = 'food-map-opt.jpg'
const image3 = 'details-03.jpg'
const image4 = 'united-way.png'
const image5 = 'RiversideLavenderRanch.jpg'

const imageArray = [image1,image2,image3,image4,image5]
const MotionReel = ({classList}) => {
    const [index,setIndex] = useState(0)
    const timeoutRef = useRef(null)
    const reel = useRef()

    const randomAnimation = () => {
        const rand = Math.floor(Math.random()*6)
        const motionReelTimeline = gsap.timeline()
        // console.log(index,rand);
        // gsap.set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.3,rotate:0,opacity:0})
        
        if (rand===0){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{scale:1.5,duration:6, ease:"linear"},'<')
            )
        }
        if (rand===1){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{translateX:"20.0px",duration:6, ease:"linear"},'<')
            )
        }
        if (rand===2){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{rotate:"6deg",scale:1.5,duration:6, ease:"linear"},'<')
            )
        }
        if (rand===3){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{translateX:"20.0px",scale:1.5,duration:6, ease:"linear"},'<')
            )
        }
        if (rand===4){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{translateX:"-20.0px",scale:1.5,duration:6, ease:"linear"},'<')
            )
        }
        if (rand===5){
            return (
                motionReelTimeline
                .set(['#motionReel0','#motionReel1','#motionReel2','#motionReel3','#motionReel4'],{scale:1.2,translateX:0,rotate:0,opacity:0})
                .to(`#motionReel${index}`,{opacity:1,duration:0.01})
                .to(`#motionReel${index}`,{scale:1,duration:6, ease:"linear"},'<')
            )
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
            {
                imageArray.map((el,i)=>{
                    return(
                        <Image key={i} id={`motionReel${i}`} src={`${reelSource}${el}`} alt="motion reel" fill style={{objectFit:"cover",objectPosition:"relative"}} sizes="(max-width: 768px) 100vw,50vw"/>
                    )
                })
            }
        </div>
    )
}

export default MotionReel;