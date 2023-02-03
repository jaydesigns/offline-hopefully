// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useState, useRef } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

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
            <div className="flex flex-col border-t border-b border-white py-6">
                <div onClick={state !== true ? handleExpand : handleContract} className="cursor-pointer flex gap-4 justify-start">
                    <div className="relative w-6 h-6">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-4xl">+</span></div>
                    </div>
                    <h6 className="text-lg font-bold">{title}</h6>
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
    return(
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between">
            <div className="flex flex-col gap-4 md:flex-row">
                <h1 className="flex-1 tracking-tighter leading-suis text-8xl">Selected Work</h1>
                <Accordion title={'Type of Work'} skills={['Branding', 'UI Design', 'Environmental Design', 'Publication Design']}/>
                <Accordion title={'Technology Used'} skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/>
            </div>
            <div className="flex overflow-x-auto w-screen h-4/6">
                <div className="flex flex-row gap-8 flex-nowrap">
                    <Card title={"Hukilau Marketplace"} coverImg={'/images/aloha.jpg'} category={['Environmental Design','Branding']} imgWidth={368}/>
                    <Card title={"Color Max Fencing"} coverImg={'/images/ColorMaxFence.jpg'} category={['UI Design']} imgWidth={512}/>
                    <Card title={"United Way"} coverImg={'/images/united-way.png'} category={['Branding','Publication Design']} imgWidth={368}/>
                    <Card title={"English Connect"} coverImg={'/images/stack-esp-por.jpg'} category={['Graphic Design','Identity System']} imgWidth={512}/>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery