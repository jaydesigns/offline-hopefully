// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useState, useRef } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const Card = ({title,coverImg,category,imgWidth}) => {
    return(
        <div className="card flex gap-4 flex-col justify-start h-full" style={{width:`${imgWidth}px`}}>
            <div className="relative h-5/6 overflow-hidden w-full">
                <Image src={coverImg} alt="image" fill style={{objectFit:"cover"}}></Image>
            </div>
            <div className="flex h-1/6">
                <h6 className="w-1/2 font-semibold">{title}</h6>
                <div className="grow text-xs flex flex-col font-thin">
                    {category.map((el,i)=>{
                        return (
                        <h6 key={i}>{el}</h6>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Accordion = ({title,skills}) => {
    const dropdownItems = useRef()
    const plusSign = useRef()
    const plustl = useRef()
    const [state,setState] = useState(false)

    useIsomorphicLayoutEffect(()=>{
        gsap.set(dropdownItems.current.querySelectorAll("span"),{translateY:"-100%"})
        gsap.set(dropdownItems.current.querySelectorAll(".skills"),{height:"0em"})
    })

    const handleExpand = () => {
        plustl.current = gsap.timeline()
        .to(plusSign.current,{rotate:"135deg"})
        .to(dropdownItems.current.querySelectorAll(".skills"),{height:"1.5em"},"<")
        setState(true)
        plustl.current.play()
    }

    const handleContract = () => {
        plustl.current.reverse()
        setState(false)
    }

    return (
        <div className="flex-1">
            <div className="flex flex-col border-t border-b border-white py-2">
                <div onClick={state !== true ? handleExpand : handleContract} className="cursor-pointer flex gap-4 justify-start">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-2xl">+</span></div>
                    </div>
                    <h6 className="text-sm font-bold">{title}</h6>
                </div>
                <div ref={dropdownItems} className="flex flex-col">
                    {skills.map((el,i)=>{
                        return (
                        <div key={i} className="overflow-hidden skills"><span className="pl-10 text-sm cursor-pointer workSelector underline">{el}</span></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const WorkGallery = () => {
    const images = useRef();
    useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.timeline()
        .set(images.current.querySelectorAll("img"),{clipPath:"inset(100% 0% 0% 0%)"})
        .to(images.current.querySelectorAll("img"),{clipPath:"inset(0% 0% 0% 0%)",stagger: 0.2, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"55% bottom", end:"top top", scrub:true,pinSpacing:false}})
        .to(images.current.querySelectorAll("img"),{clipPath:"inset(0% 0% 100% 0%)",stagger: 0.2, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"bottom bottom", end:"center top", scrub:true,pinSpacing:false}})
    },[])

    return(
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between">
            <div className="flex flex-col border-grey border-t md:flex-row">
                <h1 className="flex-1 tracking-tight leading-suis text-4xl font-smibold py-2">Selected Work</h1>
                <div className="flex flex-col md:grow md:flex-row">
                    <Accordion title={'Type of Work'} skills={['Branding', 'UI Design', 'Environmental Design', 'Publication Design']}/>
                    <Accordion title={'Technology Used'} skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/>
                </div>
            </div>
            <div className="flex overflow-x-auto w-screen h-4/6">
                <div ref={images} className="flex flex-row gap-8 flex-nowrap">
                    <Card title={"Hukilau Marketplace"} coverImg={'/images/aloha.jpg'} category={['Environmental Design','Branding']} imgWidth={246}/>
                    <Card title={"Color Max Fencing"} coverImg={'/images/ColorMaxFence.jpg'} category={['UI Design']} imgWidth={512}/>
                    <Card title={"United Way"} coverImg={'/images/united-way.png'} category={['Branding','Publication Design']} imgWidth={368}/>
                    <Card title={"English Connect"} coverImg={'/images/stack-esp-por.jpg'} category={['Graphic Design','Identity System']} imgWidth={512}/>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery