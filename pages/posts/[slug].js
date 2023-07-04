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
import { BackgroundTheme,ThemeContext } from '../../components/layout'
import SplitType from 'split-type'
import { OutroTimeline } from '../_app'
import ChatJPT from '../../components/chat'
import Link from 'next/link'
import { getPostBySlug,getPostList } from '../../utils/posts'

const Paragraph = ({el}) => {
    const [ splitText,setSplitText ] = useState()

    //
    //
    //INSTEAD OF SPLITTYPE, SCROLL VERTICALLY WITH OVERFLOW HIDDEN
    //
    //
    
    // useEffect(() => {
    //     setSplitText(SplitType.create('.lined',{types: "lines,words"}))
    //     return () => SplitType.revert('.lined')
    //     console.log("paragraph")
    // },[el])
    
    // if(splitText){
    //     gsap.set(splitText.words,{translateY:"120%"})
    // }

    return (
        <p className='leading-[1.15]'>{el}</p>
    )
}


const Content = ({postData,setPostData,nextPost,showPreviousArrow,setShowPreviousArrow,showNextArrow,setShowNextArrow}) => {
    const [currentSlide,setCurrentSlide] = useState(0)
    const slideArray = postData.slide.sliderImages
    const [postImages,setPostImages] = useState()
    const sliderBox = useRef()
    const bodyTxt = useRef()
    const [ postBody,setPostBody ] = useState()
    const router = useRouter()

    const props = {
        postBody
    }

    // Initialize post content
    //
    //    
    useEffect(() => {
        setPostBody(postData)
    },[postData])
    
    //
    //Reset current slide when switching posts
    //
    //
    useEffect(() => {
        if(postImages) {
            gsap.set('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[0]}})
        }
        setCurrentSlide(0)
    },[postImages])

    //
    //Initialize the post images
    //
    //
    useEffect(() => {
        setPostImages(document.querySelectorAll(".slider"))
    },[slideArray])


    //
    //SHOW OR HIDE ARROWS
    //
    //
    useEffect(() => {
        (showNextArrow)
        ?gsap.to('#nextArrow',{opacity:1})
        :gsap.to('#nextArrow',{opacity:0})
    },[showNextArrow])

    useEffect(() => {
        (showPreviousArrow)
        ?gsap.to('#previousArrow',{opacity:1})
        :gsap.to('#previousArrow',{opacity:0})
    },[showPreviousArrow])

    useEffect(() => {
        (currentSlide===0)
        ?setShowPreviousArrow(false)
        :setShowPreviousArrow(true)
    },[currentSlide,setShowPreviousArrow])
    
    useEffect(() => {
        if(postImages){
            (currentSlide===postImages.length-1)
            ?setShowNextArrow(false)
            :setShowNextArrow(true)
        }
    },[currentSlide,postImages,setShowNextArrow])

    const handleNextSlide = () =>{
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<postImages.length-1){
            const switchNext = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide+1)}))
            switchNext.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[currentSlide+1]}})
            switchNext.to('.paragraphContainer',{clipPath:"inset(0 0 100% 0)",ease:"power3.in",duration:1},"<")
            switchNext.play()
            setShowPreviousArrow(true)
        } else {
            return
        }
    }

    const handlePreviousSlide = () => {
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide>0){
            const switchPrevious = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide-1)}))
            switchPrevious.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[currentSlide-1]}})
            switchPrevious.to('.paragraphContainer',{clipPath:"inset(0 0 100% 0)",ease:"power3.in",duration:1},"<")
            switchPrevious.play()
            
        } else {
            return
        }
    }

    //
    // SWITCH SLIDES
    //
    //
    useEffect(() => {
        if(postBody){
            if (currentSlide<postBody.body.text.split('\\n').length-1){
            const p = document.querySelector(`#slideText-${currentSlide}`)
            gsap.to(p,{opacity:1,duration:1,ease:"power3.out"})
            gsap.to('.paragraphContainer',{clipPath:"inset(0 0 0% 0)",duration:1,stagger:0.015,ease:"power3.out"})
            }
        }
    },[currentSlide,postBody])

    //
    // SWITCH POST
    //
    //
    const handleChangePost = () => {
        setTimeout(()=>router.push(`/posts/${nextPost.slug}`),1000)
    }

    return(
        <div className='absolute z-50'>
            {(postBody)&&
            
                <div className='w-screen h-full p-4 grid grid-cols-4 md:grid-cols-12 grid-rows-[30vh_1fr_2fr]'>
                    <div className='col-span-4 md:col-span-8'>
                        <h1 className='postTitle text-white text-[10vw] md:text-[8vw] tracking-tight leading-suis'>{postBody.title}</h1>
                    </div>
                    <div className='flex flex-row w-full justify-between row-start-2 col-span-4 md:col-span-12 py-8'>
                        <div id="previousArrow">
                            <ArrowRight fn={handlePreviousSlide} color={'white'} style={{height:"30px",width:"40px"}} classToAdd={'rotate-[180deg] cursor-pointer'}/>
                        </div>
                        {(showNextArrow)&&
                            <div id="nextArrow">
                                <ArrowRight fn={handleNextSlide} color={'white'} style={{height:"30px",width:"40px"}} classToAdd={'cursor-pointer'}/>
                            </div>
                        }
                        {(showNextArrow===false)&&
                            <button onClick={handleChangePost} className='nextPost row-start-2 md:row-start-1  col-start-2 md:col-start-9 col-span-4'>
                                <div className='bg-white p-8 text-red'>
                                    <h4>Next Post</h4>
                                </div>
                            </button>
                        }
                    </div>
                    <div ref={bodyTxt} className='paragraphContainer text-white col-start-2 md:col-start-9 row-start-3 col-span-4 relative h-full overflow-y-hidden'>
                    {postBody.body.text.split('\\n').map((el,i) => {
                        return (
                            <div key={i} id={`slideText-${i}`} className='w-full h-full' style={{opacity:0}}>
                                <Paragraph el={el}/>
                            </div>
                        )
                    })}
                    </div>
                </div>
            }
        </div>
    )
}

const Slide = ({postData}) => {
    const slideArray = postData.slide.sliderImages
    const sliderBox = useRef()

    return (
        <div className='sliderContainer flex overflow-x-scroll w-screen h-screen'>
            <div ref={sliderBox} className='block whitespace-nowrap'>
                {slideArray.map((el,i)=>{
                    return(
                    <div className="slider w-screen h-screen inline-block" key={i}>
                        <div className='relative w-full h-full p-4'>
                            <Image src={el.url} alt="project cover image" fill style={{objectFit:"cover"}} className="absolute" sizes='(min-width: 768px) 100vw, (max-width: 768px) 75vw'></Image>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

const Post = ({post,nextPost}) => {
    const [postData,setPostData] = useState()
    const changeTheme = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const postWrapper = useRef()
    const [ showPreviousArrow,setShowPreviousArrow ] = useState()
    const [ showNextArrow,setShowNextArrow ] = useState()

    const props = {
        postData : postData,
        nextPost : nextPost,
        showPreviousArrow,setShowPreviousArrow,
        showNextArrow,setShowNextArrow,setPostData
    }
    
    useEffect(() => {
        setPostData(post)
    },[post])

    useEffect(() => {
        changeTheme("rgba(0,0,0,0)")
    },[changeTheme,ThemeColors])

    return (
        <Layout>
            <main className='flex overflow-x-scroll w-screen h-screen text-white'>
                {(postData)&&
                    <div className='block whitespace-nowrap'>
                        <div ref={postWrapper} className='w-screen h-screen inline-block whitespace-normal'>
                            <Content {...props} />
                            <Slide {...props} />
                        </div>
                        <div className='relative w-screen h-screen inline-block'>
                            <Image src={nextPost.slide.sliderImages[0].url} alt={'wow'} sizes='100vw' fill style={{objectFit:'cover',position:'absolute'}}/>
                        </div>
                    </div>
                }
            </main>
        </Layout>
    )
}

export default Post

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
            slug
          }
      }`
    })
   
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = data.posts.map((post) => ({
      params: { slug: post.slug },
    }))
  
    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}
  
export async function getStaticProps({params}){
    const posts = await getPostList()
    const list = posts.data.posts
    const currentIndex = list.findIndex((post) => post.slug === params.slug);
    const currentPost = list[currentIndex];
    let nextPost
    if(currentIndex===list.length-1){
        nextPost = list[0];
    } else {
        nextPost = list[currentIndex + 1];
    }

    return {
        props: {
            post: currentPost,
            nextPost
        }
    }
    
}