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
import Link from "next/link";
import {FetchAPIContext} from "../pages/_app";
import axios from "axios";
import { AllProjectObject } from "./layout";
import { TransitionContext } from "../pages/_app";
import { useRouter } from "next/router";
import { BackgroundTheme,ThemeContext } from '../components/layout';
import { gql } from "@apollo/client";
import client from "../apolloClient";

const Categories = ({data,handleCategorySelection}) => {
    const plusSign = useRef()
    const [category,setCategory] = useState("type")
    const type = data.categories.filter(el=>el.classification==='type')
    const tech = data.categories.filter(el=>el.classification==='tech')
    const tl = useRef(gsap.timeline())
    const selection = useRef()
    const ThemeColors = useContext(ThemeContext)

    const [selectedClassification,setSelectedClassification] = useState()

    
    const handleChangeClassification = (str) => {
        const handleSwitch = (e) => {
            setSelectedClassification(e.target.closest(".classifications"))
            tl.current.to(selection.current.querySelectorAll("span"),{translateY:"2em", duration:0.5, ease:"power3.in"})
            tl.current.play().then(()=>setCategory(str))
        }
        return handleSwitch
    }
    
    useEffect(()=>{
        tl.current.set(selection.current.querySelectorAll("span"),{translateY:"2em"})
        tl.current.to(selection.current.querySelectorAll("span"),{translateY:0,stagger:0.1, duration:1, ease:"power3.out"})
    },[category])
    
    useEffect(()=>{
        let classifications = document.querySelectorAll(".classifications")
        setSelectedClassification(classifications[0])
    },[])

    useEffect(()=>{
        let classifications = document.querySelectorAll(".classifications")
        classifications.forEach((el)=>{
            if(el===selectedClassification){
                gsap.to(selectedClassification,{backgroundColor:`${ThemeColors.white}`})
            } else {
                gsap.to(el,{backgroundColor:"rgba(0,0,0,0)"})
            }
        })
    },[selectedClassification,ThemeColors.white])

    return(
        <div className="flex flex-col grow border-t border-grey gap-12 md:justify-between pt-2">
            <div className="flex grow gap-4">
                <div onClick={handleChangeClassification("type")} className="classifications cursor-pointer flex gap-4 md:gap-10 justify-start grow">
                    <div className="relative w-5 h-5 mix-blend-exclusion">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-3xl">+</span></div>
                    </div>
                    <h6 className="font-medium mix-blend-exclusion">Type of Work</h6>
                </div>
                <div onClick={handleChangeClassification("tech")} className="classifications cursor-pointer flex gap-4 md:gap-10 justify-start grow">
                    <div className="relative w-5 h-5 mix-blend-exclusion">
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" ref={plusSign}><span className="text-3xl">+</span></div>
                    </div>
                    <h6 className="font-medium mix-blend-exclusion">Technology Used</h6>
                </div>
            </div>
            <ul ref={selection} className="flex flex-col">
            {category==="type"&&type.map((el,i)=>{
                return(
                    <li onClick={()=>handleCategorySelection(el)} key={i} id={el.id} className="category flex gap-4 md:gap-10 border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">{el.categoryName[0]}</h6></div>
                        <span className="inline-block">{el.categoryName}</span>
                    </li>
                )}
            )}
            {category==="tech"&&tech.map((el,i)=>{
                return(
                    <li onClick={()=>handleCategorySelection(el)} key={i} id={el.id} className="category flex gap-4 md:gap-10 border-b border-32 overflow-hidden cursor-pointer hover:text-red">
                        <div className="flex rounded-full border border-white flex-col justify-center w-4 h-4 my-1"><h6 className="text-[10px] text-center text-white">{el.categoryName[0]}</h6></div>
                        <span className="inline-block">{el.categoryName}</span>
                    </li>
                )}
            )}
            </ul>
        </div>
    )
}

const Cards = ({data}) => {
    const mm = useRef(gsap.matchMedia())
    const cover = useRef()
    const router = useRouter()
    const [showAllPosts,setShowAllPosts] = useState(true)

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

    const handlePageChange = (e)=>{
        const tl = gsap.timeline()
        e.preventDefault()
        const tg = e.target.closest('a').getAttribute('href')
        tl.to("img",{opacity:0,duration:1})
        tl.play().then(()=>router.push(tg))
    }

    // console.log(data);
    return(
        <div /* onClick={handleProjectSelection()} */ ref={cover} className="flex flex-row gap-8 flex-nowrap">
            {/* TRY GETTING THE API HERE INSTEAD OF USING STATE */}
            {data.map(el=>{
            return(
            <div key={el.id} className="card flex gap-4 flex-col justify-start h-full" style={{width:"300px"}} projectid={el.id}>
                    <Link onClick={handlePageChange} className="h-full" href="project" scroll={false}>
                        <div className="cover relative h-full overflow-hidden w-full">
                            <Image src={el.coverImage.url} alt="image" priority loading="eager" fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 50vw,33vw"></Image>
                        </div>
                    </Link>
                    <div className="flex h-1/6">
                        <div className="w-1/2">
                            <h6 className="cardText font-semibold">{el.title}</h6>
                        </div>
                        <div className="grow text-xs flex flex-col font-extralight">
                            {el.categories.map((x,i)=>{
                                return (
                                <h6 className="cardText" key={i}>{x.categoryName}</h6>
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

//
//
//
//FIX HANDLE PROJECT SELECTION
//
//
//
//

const WorkGallery = ({data}) => {
    const [selectedWorkData,setSelectedWorkData] = useState([])
    const images = useRef()
    const cardTL = useRef(gsap.timeline())
    const responseData = useContext(AllProjectObject)
    const dataToDisplay = useContext(AllProjectObject)
    const [showAllPosts,setShowAllPosts] = useState(true)
    const [categorySelected,setCategorySelected] = useState(null)
    
    //const {timeline} = useContext(TransitionContext)
    const wholeGallery = useRef()
    const route = useRouter()

    const ThemeColors = useContext(ThemeContext)
    const themeChange = useContext(BackgroundTheme)

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

        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
            trigger: ".darkTheme",
            start: "top center",
            end: "bottom 75%",
            onToggle: (self)=>self.isActive? themeChange(`${ThemeColors.black}`) : themeChange(`${ThemeColors.grey}`)
        })
    },[])
    
    /* useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        // cardTL.current.fromTo(images.current.querySelectorAll(".word"),{translateY:"0%"},{translateY:"-120%",stagger:0.1,scrollTrigger:{scroller:"body",trigger:".selectedWork",start:"bottom bottom",end:"bottom 35%",scrub:true,pinSpacing:false}})

        const tl = gsap.timeline()
        tl.set(images.current.querySelectorAll(".card"),{clipPath:"inset(100% 0% 0% 0%)"})
        tl.fromTo(images.current.querySelectorAll(".card"),{clipPath:"inset(100% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"75% bottom", end:"top top", scrub:true,pinSpacing:false}})

        gsap.fromTo(images.current.querySelectorAll(".card"),{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 100% 0%)",stagger: 0.1, scrollTrigger:{scroller:"body",trigger:"#selectedWork", start:"bottom bottom", end:"center top", scrub:true,pinSpacing:false}})
    },[]) */

    //console.log(responseData)

    const handleCategorySelection =(el)=>{
        if(el.id===categorySelected){
            setShowAllPosts(true)
            gsap.to(`#${el.id}`,{color:`${ThemeColors.white}`})
        } else {
            setCategorySelected(el.id)
            setShowAllPosts(false)
        }
    }

    useEffect(()=>{
        let categories = document.querySelectorAll('.category')
        categories.forEach((el)=>{
            if(el.getAttribute('id')===categorySelected){
                gsap.to(`#${el.id}`,{color:`${ThemeColors.red}`})
            } else {
                gsap.to(el,{color:`${ThemeColors.white}`})
            }
        })
    },[categorySelected,ThemeColors])

    // console.log(data.posts);

    // console.log(data.posts.filter(post=>post.categories.map(el=>el.id).includes(`${categorySelected}`)))
    return(
        <div ref={wholeGallery} id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 pt-8 pb-24 justify-between mix-blend-exclusion">
            <div className="flex flex-col gap-4 md:border-b-0 md:flex-row md:h-1/4">
                <div className="flex flex-col justify-end md:w-1/2">
                    <div className="flex flex-row md:flex-col justify-between h-full">
                        <h1 className="tracking-tight text-MED md:text-SM font-medium grow">Selected<br></br>Work</h1>
                        <div className="flex flex-col justify-start md:justify-end grow md:py-1 uppercase font-light">
                            <h4 className="align-baseline leading-suis font-light">Catalogue</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:grow md:flex-row">
                    <Categories data={data} handleCategorySelection={handleCategorySelection} categorySelected={categorySelected}/>
                </div>
            </div>
            <div className="cardContainer flex overflow-x-auto w-screen h-4/6">
                <div ref={images} className="flex flex-row gap-8 flex-nowrap">
                    {showAllPosts?<Cards data={data.posts}/>:<Cards data={data.posts.filter(post=>post.categories.map(el=>el.id).includes(`${categorySelected}`))}/>}
                </div>
            </div>
        </div>
    )
}

export default WorkGallery