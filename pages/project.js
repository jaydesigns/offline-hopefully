import HeaderMenu from '../components/menuHeader'
import Layout from '../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import React, { useContext, useState, useEffect, useRef } from 'react'
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect'
import { ProjectDataContext } from './_app'
import axios from 'axios'
//import Lenis from '@studio-freight/lenis'
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'


const Title = ({projectObject,projectId}) => {
    const textObject = projectObject.data.find(el=>el.attributes.post.data.id===parseInt(projectId))
    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <h2 className='text-black font-semibold text-6xl tracking-[-0.03em]'>{textObject.attributes.post.data.attributes.Title}</h2>
        </div>
    )
}

const Body = ({projectObject,projectId}) => {
    const textObject = projectObject.data.find(el=>el.attributes.post.data.id===parseInt(projectId))
    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <p className='text-black tracking-[-0.03em]'>{textObject.attributes.post.data.attributes.Body}</p>
        </div>
    )
}

const Slide = ({projectObject,projectId}) => {
    const slideArray = projectObject.data.find(el=>el.attributes.post.data.id===parseInt(projectId))
    const slideURL = slideArray.attributes.slideImages.data
    const slideContainer = useRef()


    useIsomorphicLayoutEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
            trigger: ".snap-center",
            onUpdate: self=>console.log(self.progress)
        })
    },[])

    return(
        <div ref={slideContainer} className='block overflow-x-scroll whitespace-nowrap h-full snap-x'>
            {slideURL.map(el=>{
                return(
                <div className="inline-block w-screen h-screen snap-center" key={el.id}>
                    <div className='relative w-full h-full p-4'>
                        <Image src={el.attributes.url} alt="project cover image" fill style={{objectFit:"cover"}} className="absolute"></Image>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

const Project = () => {
    const projectId = useContext(ProjectDataContext)
    const [projectObject,setProjectObject] = useState()

    const baseURL = 'http://localhost:1337/api/slides?populate=*'
    // const baseURL = 'https://salty-waters-71699.herokuapp.com/api/slides?populate=*'
    
    useIsomorphicLayoutEffect(()=>{
        // setSlideData(projectObject.find(el=>el.id===parseInt(projectId)))
        // console.log(projectObject);
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          })
        return () => ctx.revert()
    },[])

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

    console.log(projectObject);

    return (
        <Layout>
            <main className='changeBG w-screen h-screen relative'>
                <div className="flex w-screen h-full overflow-x-auto">
                    {projectObject?<Slide projectId={projectId} projectObject={projectObject}/>:<p>In order to retrieve additional resources, I need to connect to the internet.</p>}
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] top-0'>
                    {projectObject?<Title projectObject={projectObject} projectId={projectId}/>:<p>Mmmm</p>}
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] bottom-28'>
                    {projectObject?<Body projectObject={projectObject} projectId={projectId}/>:<p>Mmmm</p>}
                </div>
            </main>
        </Layout>
    )
}
export default Project;