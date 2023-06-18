import Layout from '../../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import React, { useContext, useState, useEffect, useRef } from 'react'
import {useIsomorphicLayoutEffect} from '../../useIsomorphicLayoutEffect'
import axios from 'axios'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import ArrowRight from '../../components/arrowRight'
import {gql} from '@apollo/client'
import client from '../../apolloClient'
import { useRouter } from 'next/router'
import { BackgroundTheme } from '../../components/layout'

const Title = ({projectData}) => {
    // console.log(projectData);
    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <h1 className='text-white text-9xl tracking-[-0.03em] mix-blend-exclusion'>{projectData.title}</h1>
        </div>
    )
}

const Body = ({projectData,sliderBox}) => {
    const [sliderArray,setSliderArray] = useState()
    const [currentSlide,setCurrentSlide] = useState(0)   
    const body = useRef()

    useEffect(() => {
        body.current.innerHTML = projectData.body.html
    },[projectData])

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
            <div ref={body} id="projectBody" className='text-white tracking-[-0.03em]'></div>
        </div>
    )
}

const Slide = ({projectData,sliderBox}) => {
    // console.log(projectObject);
    const slideArray = projectData.slide.sliderImages
    

    return(
        <div className='sliderContainer flex overflow-x-scroll w-screen h-full'>
            <div ref={sliderBox} className='block whitespace-nowrap'>
                {slideArray.map((el,i)=>{
                    return(
                    <div className="slider w-screen h-screen inline-block" key={i}>
                        <div className='relative w-full h-full p-4'>
                            <Image src={el.url} alt="project cover image" fill style={{objectFit:"cover"}} className="absolute" sizes='(min-width: 768px) 100vw, (max-width) 75vw'></Image>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

const Project = ({data}) => {
    const router = useRouter()
    const postID = router.query.postid
    const projectData = data.posts[0]

    const projectContainer = useRef()
    const sliderBox = useRef()

    const changeTheme = useContext(BackgroundTheme)
    
    useEffect(() => {
        changeTheme('rgba(0,0,0,0)')
    },[])

    return (
        <Layout>
            <main ref={projectContainer} className='changeBG w-screen h-screen relative'>
                <div className="sliderWrapper flex h-full overflow-x-auto">
                    <Slide projectData={projectData} sliderBox={sliderBox}/>
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] top-0'>
                    <Title projectData={projectData}/>
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] bottom-28'>
                    <Body projectData={projectData} sliderBox={sliderBox}/>
                </div>
            </main>
        </Layout>
    )
}
export default Project;

// This function gets called at build time
export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
 
  // Call an external API endpoint to get posts
  const {data} = await client.query({
    query: gql`
    {
        posts {
            id
        }
    }`
  })
 
  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = data.posts.map((post) => ({
    params: { postid: post.id },
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}

export async function getStaticProps({params}){
    const {data} = await client.query({
      query: gql`
      {
        posts (where: {id:"${params.postid}"}) {
          id
          body {
            text
            html
          }
          categories {
            categoryName
          }
          coverImage
          slide {
            sliderImages
          }
          title
        }
      }`
    })
    return {
      props: {
        data
      }
    }
    
  }