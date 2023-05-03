// import ArrowRight from "./arrowRight";
import gsap from "gsap";
import { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Draggable from "gsap/dist/Draggable";
import NegativeArrow from "./negativeArrow";
import ArrowRight from "./arrowRight";
import getAll from "../service/posts";
import Link from "next/link";
import {FetchAPIContext} from "../pages/_app";
import axios from "axios";
import { AllProjectObject } from "../pages/_app";
import { TransitionContext } from "../pages/_app";
import { useRouter } from "next/router";

const Categories = ({handleCategoryFilter}) => {
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
        <div className="flex flex-col grow border-t border-grey gap-12 md:justify-between pt-2">
            <div className="flex grow">
                <div onClick={handleChangeCategory("type")} className="cursor-pointer flex gap-4 md:gap-10 justify-start grow">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-3xl">+</span></div>
                    </div>
                    <h6 className="font-medium">Type of Work</h6>
                </div>
                <div onClick={handleChangeCategory("tech")} className="cursor-pointer flex gap-4 md:gap-10 justify-start grow">
                    <div className="relative w-5 h-5">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-3xl">+</span></div>
                    </div>
                    <h6 className="font-medium">Technology Used</h6>
                </div>
            </div>
            <ul ref={selection} className="flex flex-col">
            {category==="type"&&Object.keys(type).map((el)=>{
                return(
                    <li onClick={()=>handleCategoryFilter(el)} key={el} className="flex gap-4 md:gap-10 border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">{type[el][0]}</h6></div>
                        <span className="inline-block">{type[el]}</span>
                    </li>
                )}
            )}
            {category==="tech"&&Object.keys(tech).map((el)=>{
                return(
                    <li onClick={()=>handleCategoryFilter(el)} key={el} className="flex gap-10 border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">{tech[el][0]}</h6></div>
                        <span className="inline-block">{tech[el]}</span>
                    </li>
                )}
            )}
            </ul>
        </div>
    )
}

const Cards = ({handleProjectSelection,dataToDisplay,outro}) => {
    const mm = useRef(gsap.matchMedia())
    const cover = useRef()

    useEffect(()=>{
        let cardLines;
        const runLineSplit = () =>{
            cardLines = new SplitType(".cardText",{types:"lines,words"})
        }
        runLineSplit()
        window.addEventListener("resize",()=>{
            cardLines.revert();
            runLineSplit()
        })   
    },[])

    // console.log(dataToDisplay);
    return(
        <div onClick={handleProjectSelection()} ref={cover} className="flex flex-row gap-8 flex-nowrap">
            {/* TRY GETTING THE API HERE INSTEAD OF USING STATE */}
            {dataToDisplay.map(el=>{
            return(
            <div key={el.id} className="card flex gap-4 flex-col justify-start h-full" style={{width:"300px"}} projectid={el.id}>
                    <Link onClick={outro} className="h-full" href="project" scroll={false}>
                        <div className="cover relative h-full overflow-hidden w-full">
                            <Image src={el.attributes.Cover.data.attributes.url} alt="image" priority={true} fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 33vw,100vw"></Image>
                        </div>
                    </Link>
                    <div className="flex h-1/6">
                        <div className="w-1/2">
                            <h6 className="cardText font-semibold">{el.attributes.Title}</h6>
                        </div>
                        <div className="grow text-xs flex flex-col font-extralight">
                            {Object.keys(el.attributes.categories.data).map((x)=>{
                                return (
                                <h6 className="cardText" key={x}>{el.attributes.categories.data[x].attributes.category}</h6>
                                )
                            })}
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

const WorkGallery = ({handleProjectSelection}) => {
    const [selectedWorkData,setSelectedWorkData] = useState([])
    const images = useRef()
    const cardTL = useRef(gsap.timeline())
    const responseData = useContext(AllProjectObject)
    const dataToDisplay = useContext(AllProjectObject)
    
    //const {timeline} = useContext(TransitionContext)
    const wholeGallery = useRef()
    const route = useRouter()

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
    
    useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        // cardTL.current.fromTo(images.current.querySelectorAll(".word"),{translateY:"0%"},{translateY:"-120%",stagger:0.1,scrollTrigger:{scroller:"body",trigger:".selectedWork",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})

        const tl = gsap.timeline()
        tl.set(images.current.querySelectorAll(".card"),{clipPath:"inset(100% 0% 0% 0%)"})
        tl.fromTo(images.current.querySelectorAll(".card"),{clipPath:"inset(100% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"75% bottom", end:"top top", scrub:true,pinSpacing:false}})

        gsap.fromTo(images.current.querySelectorAll(".card"),{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"bottom bottom", end:"center top", scrub:true,pinSpacing:false}})
    })

    //console.log(responseData)

    const handleCategoryFilter = (el) => {
        setDataToDisplay(responseData.filter(project=>project.attributes.categories.data.map(x=>x.attributes.category).includes(el)))
    }

    return(
        <div ref={wholeGallery} id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between mix-blend-exclusion">
            <div className="flex flex-col gap-4 md:border-b-0 md:flex-row md:h-1/4">
                <div className="flex flex-col justify-end md:w-1/2">
                    <div className="flex flex-row md:flex-col justify-between h-full">
                        <h1 className="tracking-tight text-MED md:text-SM font-medium grow">Selected <br></br>Work</h1>
                        <div className="flex flex-col justify-start md:justify-end grow md:py-1 uppercase font-light">
                            <h4 className="align-baseline leading-suis font-light">Catalogue</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:grow md:flex-row">
                    <Categories skills={['Adobe Illustrator', 'Figma', 'React JS', 'Adobe After Effects']} handleCategoryFilter={handleCategoryFilter}/>
                </div>
            </div>
            <div className="cardContainer flex overflow-x-auto w-screen h-4/6">
                <div ref={images} className="flex flex-row gap-8 flex-nowrap">
                    {responseData?<Cards handleProjectSelection={handleProjectSelection} dataToDisplay={dataToDisplay} outro={outro}/>:<p>Oops! Something went wrong when I tried downloading the images.</p>}
                </div>
            </div>
        </div>
    )
}

export default WorkGallery