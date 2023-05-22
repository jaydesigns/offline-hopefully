import HeaderMenu from '../components/menuHeader'
import Layout from '../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import React, { useContext, useState, useEffect, useRef } from 'react'
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect'
import { ProjectDataContext } from './_app'
import axios from 'axios'
// import Lenis from '@studio-freight/lenis'
import {Lenis as ReactLenis, useLenis} from '@studio-freight/react-lenis'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import ArrowRight from '../components/arrowRight'

const Title = ({projectObject,projectId}) => {
    const textObject = projectObject.data.find(el=>el.attributes.post.data.id===projectId)
    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <h2 className='text-black font-semibold text-6xl tracking-[-0.03em]'>{textObject.attributes.post.data.attributes.Title}</h2>
        </div>
    )
}

const Body = ({projectObject,projectId,sliderBox}) => {
    const textObject = projectObject.data.find(el=>el.attributes.post.data.id===projectId)

    const [sliderArray,setSliderArray] = useState()
    const [currentSlide,setCurrentSlide] = useState(0)

    useEffect(()=>{
        // console.log(sliderBox.current);
        setSliderArray(sliderBox.current.querySelectorAll(".slider"))
    },[sliderBox])

    const handleNextSlide = () =>{
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<sliderArray.length-1){
            gsap.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:sliderArray[currentSlide+1]}})
            setCurrentSlide(currentSlide+1)
        } else {
            return
        }
    }

    const handlePreviousSlide = () => {
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide>0){
            gsap.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:sliderArray[currentSlide-1]}})
            setCurrentSlide(currentSlide-1)
        } else {
            return
        }
    }

    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <div className='flex flex-row w-full justify-between'>
                <ArrowRight fn={handlePreviousSlide} color={'black'} classToAdd={'scale-[2] rotate-[180deg] cursor-pointer'}/>
                <ArrowRight fn={handleNextSlide} color={'black'} classToAdd={'scale-[2] cursor-pointer'}/>
            </div>
            <p className='text-black tracking-[-0.03em]'>{textObject.attributes.post.data.attributes.Body}</p>
        </div>
    )
}

const Slide = ({projectObject,projectId,sliderBox}) => {
    // console.log(projectObject);
    const slideArray = projectObject.data.find(el=>el.attributes.post.data.id===projectId)
    const slideURL = slideArray.attributes.slideImages.data
    

    return(
        <div className='sliderContainer flex overflow-x-scroll w-screen h-full'>
            <div ref={sliderBox} className='block whitespace-nowrap'>
                {slideURL.map(el=>{
                    return(
                    <div className="slider w-screen h-screen inline-block" key={el.id}>
                        <div className='relative w-full h-full p-4'>
                            <Image src={el.attributes.url} alt="project cover image" fill style={{objectFit:"cover"}} className="absolute"></Image>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

const Project = () => {
    const projectId = useContext(ProjectDataContext)
    const [projectObject,setProjectObject] = useState()
    let localProjectId
    const projectContainer = useRef()   
    const sliderBox = useRef()

    // gsap.registerPlugin(ScrollToPlugin)

    const baseURL = 'http://localhost:1337/api/slides?populate=*'
    // const baseURL = 'https://salty-waters-71699.herokuapp.com/api/slides?populate=*'

    if (typeof window!=='undefined'){
        localProjectId = localStorage.getItem('selectedProjectId')
    }
    
    const projectIdNumber = ()=>{
        if (projectId){
            return parseInt(projectId)
        }
        return parseInt(localProjectId)
    }
    // console.log(projectIdNumber())
    // console.log(`object:${projectObject},parsed:${projectId},local:${localProjectId}`)
    
    useIsomorphicLayoutEffect(()=>{
        // setSlideData(projectObject.find(el=>el.id===parseInt(projectId)))
        // console.log(projectObject);
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'rgba(255,255,255,0)'})
          gsap.set(projectContainer.current,{opacity:0})
          gsap.to(projectContainer.current,{opacity:1,duration:1})
          })
        return () => ctx.revert()
    },[])

    /* useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
            scroller:".sliderWrapper",
            trigger: ".sliderContainer",
            onUpdate: self=>console.log(self.progress)
        })
    },[]) */

    useEffect(()=>{
        const getAll = async() => {
            try{
                const request = await axios(baseURL).then(res=>res.data)
                setProjectObject(request)
            } catch(err){
                console.log(err);
            }
        }
        getAll()
    },[])

    //console.log(projectObject);

    return (
        <Layout>
            <main ref={projectContainer} className='changeBG w-screen h-screen relative'>
                <div className="sliderWrapper flex h-full overflow-x-auto">
                    {projectObject?<Slide projectObject={projectObject} projectId={projectIdNumber()} sliderBox={sliderBox}/>:<p>In order to retrieve additional resources, I need to connect to the internet.</p>}
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] top-0'>
                    {projectObject?<Title projectObject={projectObject} projectId={projectIdNumber()}/>:<p>Mmmm</p>}
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] bottom-28'>
                    {projectObject?<Body projectObject={projectObject} projectId={projectIdNumber()} sliderBox={sliderBox}/>:<p>Mmmm</p>}
                </div>
            </main>
        </Layout>
    )
}
export default Project;