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

/* const PostTitle = ({postData,postTL}) => {
    useEffect(() => {
        let text
        const runSplit = () => {
            text = new SplitType(".postTitle",{types:"lines,words"})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            runSplit()
        })
        gsap.set(text.words,{translateY:"120%"})
        postTL.current.to(text.words,{translateY:"0%",duration:2,stagger:0.1,ease:"power3.inOut"})
    },[postTL])

    return (
        <div className='col-span-4 md:col-span-8'>
            <h1 className='postTitle text-white text-[10vw] md:text-[7vw] tracking-tight leading-suis'>{postData.title}</h1>
        </div>
    )
} */

/* const Paragraph = ({el}) => {
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
        <div className=''>
            
        </div>
    )
} */


const Content = ({postData,setPostData,nextPost,showPreviousArrow,setShowPreviousArrow,showNextArrow,setShowNextArrow,postTL}) => {
    const [currentSlide,setCurrentSlide] = useState(0)
    const slideArray = postData.slide.sliderImages
    const [postImages,setPostImages] = useState()
    const sliderBox = useRef()
    const postTitle = useRef()
    const bodyTxt = useRef()
    const [ postBody,setPostBody ] = useState()
    const router = useRouter()

    const props = {
        postBody,
        postTL
    }

    // Initialize post content
    //
    //    
    useEffect(() => {
        setPostBody(postData)
        gsap.to(`#parallax-0`,{clipPath:"inset(0 0 0 0%)"})
    },[postData])

    useEffect(() => {
        if (postBody) {
            let firstParagraph = document.querySelector('#slideText-0')
            let firstSlideText = firstParagraph.querySelectorAll('.word')
            let title = new SplitType(postTitle.current,{types:"lines,words"})
            let body = new SplitType('.lined',{types:"lines,words"})
            gsap.set([title.words,body.words],{translateY:"120%"})
            // Run Split
            postTL.current.to(title.words,{translateY:"0%",duration:2,stagger:0.2,ease:"power3.out"})
            // postTL.current.to(firstSlideText,{translateY:"0%",duration:1,stagger:0.02,ease:"power3.inOut"},'<')
        }
    },[postBody,postTL])
    
    //
    //Reset current slide when switching posts
    //
    //
    /* useEffect(() => {
        if(postImages) {
            gsap.set('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[0]}})
        }
        setCurrentSlide(0)
    },[postImages]) */

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
        const p = document.querySelector(`#slideText-${currentSlide}`)
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<postImages.length-1){
            const switchNext = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide+1)}))
            //switchNext.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[currentSlide+1]}})
            // switchNext.to('.paragraphContainer',{scrollTo:{x:p},ease:"power3.in",duration:1},"<")
            switchNext.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",objectPosition:'180% 50%',clipPath:"inset(0 100% 0 0)"},"<")
            switchNext.to(`#parallax-${currentSlide+1}`,{duration:2,ease:"power3.inOut",objectPosition:'90% 50%',clipPath:'inset(0 0 0 0%)'},"<")
            switchNext.to(p.querySelectorAll('.word'),{translateY:"120%"},"<")
            switchNext.play()
            setShowPreviousArrow(true)
        } else {
            return
        }
    }

    const handlePreviousSlide = () => {
        const p = document.querySelector(`#slideText-${currentSlide}`)
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide>0){
            const switchPrevious = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide-1)}))
            // switchPrevious.to('.sliderContainer',{duration:2,ease:"power3.inOut",scrollTo:{x:postImages[currentSlide-1]}})
            // switchPrevious.to('.paragraphContainer',{scrollTo:{x:p},ease:"power3.in",duration:1},"<")
            switchPrevious.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",objectPosition:'-80% 50%',clipPath:"inset(0 0 0 100%)"},"<")
            switchPrevious.to(`#parallax-${currentSlide-1}`,{duration:2,ease:"power3.inOut",objectPosition:'10% 50%',clipPath:'inset(0 0% 0 0)'},"<")
            switchPrevious.to(p.querySelectorAll('.word'),{translateY:"120%"},"<")
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
            gsap.to(p.querySelectorAll('.word'),{translateY:"0%",stagger:0.015,duration:1,ease:"power3.out"})
            // gsap.to('.paragraphContainer',{scrollTo:{x:p},duration:1,ease:"power3.inOut",delay:0.7})
            }
        }
    },[postBody,currentSlide,postTL])

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
            
                <div className='w-screen h-full p-4 grid grid-cols-4 md:grid-cols-12 grid-rows-[40vh_150px_2fr]'>
                    <div className='col-span-4 md:col-span-8'>
                        <h1 ref={postTitle} className='postTitle text-white text-[10vw] md:text-[7vw] tracking-tight leading-suis'>{postData.title}</h1>
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
                            <button onClick={handleChangePost} className='nextPost overflow-hidden'>
                                <div className='bg-white px-8 py-4 text-red text-justify'>
                                    <h4 className='font-bold'>Next Post</h4>
                                    <h6>{nextPost.title}</h6>
                                </div>
                            </button>
                        }
                    </div>
                    <div ref={bodyTxt} className='paragraphContainer relative text-white col-start-2 md:col-start-9 row-start-3 col-span-4 w-full h-full'>
                        {postBody.body.text.split('\\n').map((el,i) => {
                            return (
                                <div key={i} className='slideText relative w-full h-full'>
                                    <p id={`slideText-${i}`} className='lined absolute leading-[1.15]'>{el}</p>
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
                    <div className="absolute slider w-screen h-screen inline-block" key={i}>
                        <div className='relative w-full h-full p-4'>
                            <Image src={el.url} alt="project cover image" fill style={{objectFit:"cover",objectPosition:"50% 50%",clipPath:"inset(0 0 0 100%)"}} id={`parallax-${i}`} className="absolute" sizes='(min-width: 768px) 100vw, (max-width: 768px) 75vw'></Image>
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
    const postTL = useRef(gsap.timeline())
    const router = useRouter()
    const [key,setKey] = useState('')
    const {outro,setOutro} = useContext(OutroTimeline)

    const props = {
        postData : postData,
        nextPost : nextPost,
        showPreviousArrow,setShowPreviousArrow,
        showNextArrow,setShowNextArrow,setPostData,
        postTL
    }

    useEffect(() => {
        // Generate a unique key based on the slug or any other identifier
        const slug = router.query.slug;
        const uniqueKey = slug ? `dynamic-component-${slug}` : '';

        setKey(uniqueKey);
    },[router.query.slug])
    
    useEffect(() => {
        setPostData(post)
    },[post])

    useEffect(() => {
        changeTheme("rgba(0,0,0,0)")
    },[changeTheme,ThemeColors])

    useEffect(() => {
        setOutro(postTL.current)
    },[setOutro])

    return (
        <Layout>
                {(postData)&&
                    <main key={key} className='flex overflow-x-scroll w-screen h-screen text-white'>
                            <div className='block whitespace-nowrap'>
                                <div ref={postWrapper} className='w-screen h-screen inline-block whitespace-normal'>
                                    <Content {...props} />
                                    <Slide {...props} />
                                </div>
                                <div className='relative w-screen h-screen inline-block'>
                                    <Image src={nextPost.slide.sliderImages[0].url} alt={'wow'} sizes='100vw' fill style={{objectFit:'cover',position:'absolute'}}/>
                                </div>
                            </div>
                    </main>
                }
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