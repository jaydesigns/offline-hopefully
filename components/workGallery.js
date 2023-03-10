// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Draggable from "gsap/dist/Draggable";
import NegativeArrow from "./negativeArrow";
import getAll from "../service/posts";

const Categories = () => {
    const plusSign = useRef()
    const [category,setCategory] = useState("type")
    const type = {'branding':'Branding', 'ui design':'UI Design', 'environmental design':'Environmental Design', 'publication design':'Publication Design'}
    const tech = {'adobe illustrator':'Adobe Illustrator', 'figma':'Figma', 'reactjs':'ReactJS', 'adobe after effects':'Adobe After Effects'}
    const tl = useRef(gsap.timeline())
    const selection = useRef()

    const handleChangeCategory = (str) => {
        const handleSwitch = () => {
            tl.current.to(selection.current.querySelectorAll("span"),{translateY:"2em", duration:0.5, ease:"power3.in"})
            tl.current.play().then(()=>setCategory(str))
        }
        return handleSwitch
    }

    useEffect(()=>{
        tl.current.set(selection.current.querySelectorAll("span"),{translateY:"2em"})
        tl.current.to(selection.current.querySelectorAll("span"),{translateY:0,stagger:0.1, duration:1, ease:"power3.out"})
    },[category])

    return(
        <div className="flex flex-col grow border-t border-grey gap-12 md:justify-between">
            <div className="flex grow">
                <div onClick={handleChangeCategory("type")} className="cursor-pointer flex gap-4 justify-start grow">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-4xl">+</span></div>
                    </div>
                    <h6 className="font-medium">Type of Work</h6>
                </div>
                <div onClick={handleChangeCategory("tech")} className="cursor-pointer flex gap-4 justify-start grow">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-4xl">+</span></div>
                    </div>
                    <h6 className="font-medium">Technology Used</h6>
                </div>
            </div>
            <ul ref={selection} className="flex flex-col">
            {category==="type"&&Object.keys(type).map((el)=>{
                return(
                    <li onClick={()=>console.log(el)} key={el} className="block border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <span className="inline-block">{type[el]}</span>
                    </li>
                )}
            )}
            {category==="tech"&&Object.keys(tech).map((el)=>{
                return(
                    <li onClick={()=>console.log(el)} key={el} className="block border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <span className="inline-block">{tech[el]}</span>
                    </li>
                )}
            )}
            </ul>
        </div>
    )
}

const Cards = ({selectedWorkData,images}) => {
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
        cardTL.current.fromTo(images.current.querySelectorAll(".word"),{translateY:"0%"},{translateY:"-120%",stagger:0.1,scrollTrigger:{scroller:"body",trigger:".selectedWork",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})
    })

    return(
        <div ref={images} className="flex flex-row gap-8 flex-nowrap">
            {Object.keys(selectedWorkData).map(el=>{
                console.log(selectedWorkData[el]);
                return (
                <div key={el} className="card flex gap-4 flex-col justify-start h-full" style={{width:"300px"}}>
                    <div className="relative h-5/6 overflow-hidden w-full">
                        <Image src={selectedWorkData[el].attributes.Cover.data.attributes.url} alt="image" fill style={{objectFit:"cover"}} sizes="100vw"></Image>
                    </div>
                    <div ref={cardUI} className="flex h-1/6">
                        <div className="w-1/2">
                            <h6 className="cardText font-semibold">{selectedWorkData[el].attributes.Title}</h6>
                        </div>
                        <div className="grow text-xs flex flex-col font-extralight">
                            {Object.keys(selectedWorkData[el].attributes.categories.data).map((x)=>{
                                return (
                                <h6 className="cardText" key={x}>{selectedWorkData[el].attributes.categories.data[x].attributes.category}</h6>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )})
}
        </div>
    )
}

/* const Accordion = ({order,title,skills}) => {
    const dropdownItems = useRef()
    const plusSign = useRef()
    const [isOpen,setIsOpen] = useState(true)
    const tl = useRef(gsap.timeline())

    const handleExpand = () => {
        setIsOpen(!isOpen)
    }

    useIsomorphicLayoutEffect(()=>{
        tl.current.fromTo(plusSign.current,{rotate:"0deg"},{rotate:"135deg"})
        tl.current.fromTo(dropdownItems.current.querySelectorAll(".skills"),{width:0,height:"0em"},{width:"100%",height:"1.7em",stagger:0.1,ease:"power3.inOut",duration:1.2},"<")
        tl.current.fromTo(dropdownItems.current.querySelectorAll(".workSelector"),{translateY:"-120%"},{translateY:"0%",stagger:0.05,duration:1.2,ease:"power3.inOut"},"<")        
    },[])

    useIsomorphicLayoutEffect(()=>{
        isOpen?tl.current.reverse():tl.current.play()
    },[isOpen])
 
    return (
        <div className="accordion flex-1" data-classification={order}>
            <div className="flex flex-col gap-2 justify-between h-full">
                <div onClick={handleExpand} className="cursor-pointer flex gap-4 justify-start border-b border-white">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-4xl">+</span></div>
                    </div>
                    <h6 className="font-medium">{title}</h6>
                </div>
                <div ref={dropdownItems} className="flex flex-col border-32 border-b">
                    {skills.map((el,i)=>{
                        return (
                        <div key={i} onClick={()=>console.log(i)} className="relative overflow-hidden skills border-32 border-b">
                            <div className="absolute flex gap-4 h-full text-sm font-extralight cursor-pointer workSelector">
                                <div className="flex flex-col justify-center">
                                    <div className="skillArrow">
                                        <NegativeArrow />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center"><span>{el}</span></div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
} */

const WorkGallery = () => {
    const images = useRef();
    const [selectedWorkData,setSelectedWorkData] = useState([])

    useEffect(()=>{
        const dat = getAll().then(el=>setSelectedWorkData(el.data))
    },[])
    console.log(selectedWorkData);

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
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between mix-blend-exclusion">
            <div className="flex flex-col gap-4 md:border-b-0 md:flex-row md:h-1/4">
                <div className="flex md:w-1/2">
                    <div className="flex flex-col justify-between">
                        <h1 className="tracking-tight leading-suis text-2xl md:text-4xl grow">Selected Work</h1>
                        <div className="flex flex-col justify-end grow py-1">
                            <h4 className="align-baseline">Catalogue</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:grow md:flex-row">
                    {/* <Accordion order={"accordion1"} title={'Type of Work'} skills={['Branding', 'UI Design', 'Environmental Design', 'Publication Design']}/> */}
                    {/* <Accordion order={"accordion2"} title={'Technology Used'} skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/> */}
                    <Categories skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']}/>
                </div>
            </div>
            <div className="cardContainer flex overflow-x-auto w-screen h-4/6">
                <div ref={images} className="flex flex-row gap-8 flex-nowrap">
                    <Cards selectedWorkData={selectedWorkData} images={images}/>
                    {/* <Card images={images} title={"Hukilau Marketplace"} coverImg={'/images/aloha.jpg'} category={['Environmental Design','Branding']} imgWidth={246}/>
                    <Card images={images} title={"Color Max Fencing"} coverImg={'/images/ColorMaxFence.jpg'} category={['UI Design']} imgWidth={512}/>
                    <Card images={images} title={"United Way"} coverImg={'/images/united-way.png'} category={['Branding','Publication Design']} imgWidth={368}/>
                    <Card images={images} title={"English Connect"} coverImg={'/images/stack-esp-por.jpg'} category={['Graphic Design','Identity System']} imgWidth={512}/> */}
                </div>
            </div>
        </div>
    )
}

export default WorkGallery