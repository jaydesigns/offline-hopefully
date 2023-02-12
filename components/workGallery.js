// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Draggable from "gsap/dist/Draggable";
import NegativeArrow from "./negativeArrow";

const Card = ({images,title,coverImg,category,imgWidth}) => {
    const cardTL = useRef(gsap.timeline())
    const cardUI = useRef()
    const mm = useRef(gsap.matchMedia())

    useEffect(()=>{
        let cardLines;
        const runLineSplit = () =>{
            cardLines = new SplitType(".cardText",{type:"lines"})
        }
        runLineSplit()
        window.addEventListener("resize",()=>{
            cardLines.revert();
            runLineSplit()
        })
    })

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        //cardTL.current.fromTo(".word",{translateY:"120%"},{translateY:"0%",stagger:0.1,scrollTrigger:{scroller:"body",trigger:".selectedWork",start:"70% bottom",end:"70% top",scrub:true,pinSpacing:false}})
        mm.current.add("(min-width: 768px)",()=>{cardTL.current.fromTo(images.current.querySelectorAll(".word"),{translateY:"0%"},{translateY:"-120%",stagger:0.1,scrollTrigger:{scroller:"body",trigger:".selectedWork",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})})
    })

    return(
        <div className="card flex gap-4 flex-col justify-start h-full" style={{width:`${imgWidth}px`}}>
            <div className="relative h-5/6 overflow-hidden w-full">
                <Image src={coverImg} alt="image" fill style={{objectFit:"cover"}}></Image>
            </div>
            <div ref={cardUI} className="flex h-1/6">
                <div className="w-1/2">
                    <h6 className="cardText font-semibold">{title}</h6>
                </div>
                <div className="grow text-xs flex flex-col font-thin">
                    {category.map((el,i)=>{
                        return (
                        <h6 className="cardText" key={i}>{el}</h6>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Accordion = ({order,title,skills}) => {
    const dropdownItems = useRef()
    const plusSign = useRef()
    const [isOpen,setIsOpen] = useState(true)
    const plustl = useRef(gsap.timeline())

    const handleExpand = () => {
        setIsOpen(!isOpen)
    }

    useIsomorphicLayoutEffect(()=>{
        plustl.current.fromTo(plusSign.current,{rotate:"0deg"},{rotate:"135deg"})
        plustl.current.fromTo(dropdownItems.current.querySelectorAll(".skills"),{width:0,height:"0em"},{width:"100%",height:"1.5em",stagger:0.1,ease:"power3.inOut",duration:1.2},"<")
        plustl.current.fromTo(dropdownItems.current.querySelectorAll(".workSelector"),{translateY:"-120%"},{translateY:"0%",stagger:0.05,duration:1.2,ease:"power3.inOut"},"<")
    },[])

    useIsomorphicLayoutEffect(()=>{
        isOpen?plustl.current.reverse():plustl.current.play()
    },[isOpen])

    return (
        <div className={`${order} flex-1`}>
            <div className="flex flex-col border-b border-white py-2">
                <div onClick={handleExpand} className="cursor-pointer flex gap-4 justify-start">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-2xl">+</span></div>
                    </div>
                    <h6 className="text-sm font-bold">{title}</h6>
                </div>
                <div ref={dropdownItems} className="flex flex-col">
                    {skills.map((el,i)=>{
                        return (
                        <div key={i} onClick={()=>console.log(i)} className="relative overflow-hidden skills border-grey border-t">
                            <div className="absolute flex place-items-center text-sm cursor-pointer workSelector">
                                <NegativeArrow />
                                <span>{el}</span>
                            </div>
                        </div>
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
        const tl = gsap.timeline()
        tl.set(images.current.querySelectorAll("img"),{clipPath:"inset(100% 0% 0% 0%)"})
        tl.fromTo(images.current.querySelectorAll("img"),{clipPath:"inset(100% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"75% bottom", end:"top top", scrub:true,pinSpacing:false}})
    },[])

    useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(images.current.querySelectorAll("img"),{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"bottom bottom", end:"center top", scrub:true,pinSpacing:false}})
    },[])

    useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(Draggable)
        Draggable.create(images.current,{
            type:"x",
            bounds: document.querySelector(".cardContainer"),
            inertia: true,
            zIndexBoost:false,
            /* onClick: function() {
                console.log("clicked");
            },
            onDragEnd: function() {
                console.log("drag ended");
            } */
        })
    })

    return(
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between">
            <div className="flex flex-col border-grey border-t border-b md:border-b-0 md:flex-row">
                <h1 className="flex-1 tracking-tight leading-suis text-4xl font-smibold py-2">Selected Work</h1>
                <div className="flex flex-col md:grow md:flex-row">
                    <Accordion order={"accordion1"} title={'Type of Work'} skills={['Branding', 'UI Design', 'Environmental Design', 'Publication Design']}/>
                    <Accordion order={"accordion2"} title={'Technology Used'} skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/>
                </div>
            </div>
            <div className="cardContainer flex overflow-x-auto w-screen h-4/6">
                <div ref={images} className="flex flex-row gap-8 flex-nowrap">
                    <Card images={images} title={"Hukilau Marketplace"} coverImg={'/images/aloha.jpg'} category={['Environmental Design','Branding']} imgWidth={246}/>
                    <Card images={images} title={"Color Max Fencing"} coverImg={'/images/ColorMaxFence.jpg'} category={['UI Design']} imgWidth={512}/>
                    <Card images={images} title={"United Way"} coverImg={'/images/united-way.png'} category={['Branding','Publication Design']} imgWidth={368}/>
                    <Card images={images} title={"English Connect"} coverImg={'/images/stack-esp-por.jpg'} category={['Graphic Design','Identity System']} imgWidth={512}/>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery