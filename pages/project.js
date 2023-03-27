import HeaderMenu from '../components/menuHeader'
import Layout from '../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import React, { useContext, useState, useEffect } from 'react'
import {useIsomorphicLayoutEffect} from 'usehooks-ts'
import { ProjectDataContext } from './_app'
import axios from 'axios'


const Slide = ({projectObject,projectId}) => {
    const slideArray = projectObject.data.find(el=>el.attributes.post.data.id===parseInt(projectId))
    const slideURL = slideArray.attributes.slideImages.data
    console.log(slideURL);
    return(
        <div className='flex flex-row flex-nowrap h-full'>
            {slideURL.map(el=>{
                return(
                <div key={el.id}>
                    <div className='relative w-screen h-full p-4'>
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

    // const baseURL = 'http://localhost:1337/api/slides?populate=*'
    const baseURL = 'https://salty-waters-71699.herokuapp.com/api/slides?populate=*'
    
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

    return (
        <Layout>
            <main className='changeBG w-screen h-screen'>
                <div className="flex w-screen h-full overflow-x-auto">
                    {projectObject?<Slide projectObject={projectObject} projectId={projectId}/>:<p>There&apos;s something wrong with your connection.</p>}
                </div>
            </main>
        </Layout>
    )
}
export default Project;