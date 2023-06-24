import Layout from '../../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import {useIsomorphicLayoutEffect} from '../../useIsomorphicLayoutEffect'
import axios from 'axios'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import ArrowRight from '../../components/arrowRight'
import {gql} from '@apollo/client'
import client from '../../apolloClient'
import { useRouter } from 'next/router'
import { BackgroundTheme } from '../../components/layout'
import SplitType from 'split-type'
import { OutroTimeline } from '../_app'

const Title = ({projectData,postTL}) => {

    useEffect(() => {
        let tl = gsap.timeline()
        let text
        const runSplit = () => {
            text = new SplitType(".postTitle",{types:"lines,words"})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            runSplit()
        })
        gsap.set(text.words,{translateY:"120%"})
        postTL.current.to(text.words,{translateY:"0%",duration:1,ease:"power3.inOut"})
    },[postTL])
    // console.log(projectData);
    return(
        <div className='w-screen h-full absolute z-10 p-4'>
            <h1 className='postTitle text-white text-[14vw] md:text-9xl tracking-[-0.03em] leading-suis'>{projectData.title}</h1>
        </div>
    )
}

const Body = ({postTL,projectData,sliderBox}) => {
    const [sliderArray,setSliderArray] = useState()
    const [currentSlide,setCurrentSlide] = useState(0)   
    const bodyTxt = useRef()
    // const [ switchTL, setSwitchTL ] = useState(gsap.timeline())

    // console.log(projectData.body.text);
    useEffect(() => {
        const text = new SplitType('.lined',{types:'lines,words'})
        const ctx = gsap.context(()=>{
            gsap.set(text.words,{translateY:"120%"})
        })
        return () => ctx.revert()
    },[projectData])
    
    useEffect(() => {
        if (currentSlide<projectData.body.text.split('\\n').length-1){
            const p = document.querySelector(`#slideText-${currentSlide}`)
            gsap.to(p.querySelectorAll(".word"),{translateY:"0%",duration:1,stagger:0.015,ease:"power3.out"})
        } else {
            return
        }
    },[currentSlide,projectData,postTL])

    useEffect(()=>{
        // console.log(sliderBox.current);
        setSliderArray(sliderBox.current.querySelectorAll(".slider"))
    },[sliderBox])

    const handleNextSlide = () =>{
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<sliderArray.length-1){
            const switchNext = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide+1)}))
            switchNext.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:sliderArray[currentSlide+1]}})
            switchNext.to(bodyTxt.current.querySelectorAll('.word'),{translateY:"120%",ease:"power3.in",duration:1},"<")
            switchNext.play()
            
        } else {
            return
        }
    }

    const handlePreviousSlide = () => {
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide>0){
            const switchPrevious = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide-1)}))
            switchPrevious.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:sliderArray[currentSlide-1]}})
            switchPrevious.to(bodyTxt.current.querySelectorAll('.word'),{translateY:"120%",ease:"power3.in",duration:1},"<")
            switchPrevious.play()
            
        } else {
            return
        }
    }

    return(
        <div className='w-screen h-full p-4 grid grid-cols-4 md:grid-cols-12 grid-rows-[auto_auto]'>
            <div className='flex flex-row w-full justify-between col-span-4 md:col-span-12 py-8'>
                <ArrowRight fn={handlePreviousSlide} color={'white'} style={{height:"30px",width:"40px"}} classToAdd={'rotate-[180deg] cursor-pointer'}/>
                <ArrowRight fn={handleNextSlide} color={'white'} style={{height:"30px",width:"40px"}} classToAdd={'cursor-pointer'}/>
            </div>
            {/* <div ref={body} id="projectBody" className='text-white tracking-[-0.03em]'></div> */}
            <div ref={bodyTxt} className='text-white col-start-2 md:col-start-9 row-start-2 col-span-4 h-48 relative'>
            {projectData.body.text.split('\\n').map((el,i) => {
                return (
                    <div key={i} id={`slideText-${i}`} className='absolute w-full'>
                        <p className='lined'>{el}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

const Slide = ({projectData,sliderBox,postTL}) => {
    // console.log(projectObject);
    const slideArray = projectData.slide.sliderImages
    
    useEffect(() => {
        gsap.set('.slider',{opacity:0})
        postTL.current.to('.slider',{opacity:1,duration:1})
    },[postTL])

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
    const {outro,setOutro} = useContext(OutroTimeline)
    const postTL = useRef(gsap.timeline())

    const projectContainer = useRef()
    const sliderBox = useRef()

    const changeTheme = useContext(BackgroundTheme)
    
    useEffect(() => {
        changeTheme('rgba(0,0,0,0)')
        postTL.current.play()
        setOutro(postTL.current)
    },[changeTheme,setOutro])

    return (
        <Layout>
            <main ref={projectContainer} className='changeBG w-screen h-screen relative'>
                <div className="sliderWrapper flex h-full overflow-x-auto">
                    <Slide postTL={postTL} projectData={projectData} sliderBox={sliderBox}/>
                </div>
                <div className='w-screen h-1/6 absolute z-[9999] top-0'>
                    <Title postTL={postTL} projectData={projectData}/>
                </div>
                <div className='w-screen min-h-max absolute z-[9999] bottom-28'>
                    <Body postTL={postTL} projectData={projectData} sliderBox={sliderBox}/>
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