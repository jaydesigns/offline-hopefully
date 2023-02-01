// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useState, useRef } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

const Accordion = ({title,skills}) => {
    const dropdownItems = useRef()
    const plusSign = useRef()
    const plustl = useRef()
    const [state,setState] = useState(false)

    useIsomorphicLayoutEffect(()=>{
        gsap.set(dropdownItems.current,{opacity:0})
    })

    const handleExpand = () => {
        plustl.current = gsap.timeline()
        .to(dropdownItems.current,{opacity:1})
        .to(plusSign.current,{rotate:"135deg"},"<")
        setState(true)
        plustl.current.play()
    }

    const handleContract = () => {
        setState(false)
        plustl.current.reverse()
    }

    return (
        <div className="flex-1 flex-col md:flex-row border-t border-white">
            <div onClick={state !== true ? handleExpand : handleContract} className="cursor-pointer flex gap-1 justify-start">
                <div className="relative w-6 h-6">
                    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-4xl">+</span></div>
                </div>
                <h6>{title}</h6>
            </div>
            <div ref={dropdownItems} className="flex flex-col">
                {skills.map((el,i)=>{
                    return <span key={i}>{el}</span>
                })}
            </div>
        </div>
    )
}

const WorkGallery = () => {
    return(
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 justify-between">
            <div className="flex flex-col gap-4 md:flex-row">
                <h1 className="flex-1 text-6xl">Selected Work</h1>
                <Accordion title={'Type of Work'} skills={['Branding', 'UI Design', 'Environmental Design', 'Publication Design']}/>
                <Accordion title={'Technology Used'} skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/>
            </div>
            <div className="flex overflow-x-auto w-screen">
                <div className="flex flex-row gap-4 flex-nowrap">
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery