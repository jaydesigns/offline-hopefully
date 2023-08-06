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

const Slide = ({post}) => {
    const slideArray = post.slide.sliderImages

    return (
        <div className='absolute h-screen w-screen -z-10 flex overflow-x-scroll'>
            <div>
                 {slideArray.map((el,i)=>{
                     return(
                     <div className="absolute slider w-screen h-screen" key={i}>
                         <div className='relative w-full h-full p-4'>
                             <Image src={el.url} alt="project cover image" fill style={{objectFit:"cover",position:'absolute',clipPath:"inset(0 0 0 100%)"}} id={`parallax-${i}`} loading='eager' sizes='(min-width: 768px) 100vw, (max-width: 768px) 75vw'></Image>
                         </div>
                     </div>
                     )
                 })}
             </div>
        </div>
    )
}

const Content = ({post,nextPost,showPreviousArrow,setShowPreviousArrow,
    showNextArrow,setShowNextArrow}) => {
    const {outro,setOutro} = useContext(OutroTimeline)
    const router = useRouter()
    const [postImages,setPostImages] = useState()
    const [currentSlide,setCurrentSlide] = useState(0)

    const handleNextSlide = () =>{
        const p = document.querySelector(`#slideText-${currentSlide}`)
        const pNext = document.querySelector(`#slideText-${currentSlide+1}`)
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<postImages.length-1){
            const switchNext = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide+1)}))
            switchNext.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",clipPath:"inset(0 100% 0 0)"},"<")
            switchNext.to(`#parallax-${currentSlide+1}`,{duration:2,ease:"power3.inOut",clipPath:'inset(0 0 0 0%)'},"<")
            if(p&&pNext){
                switchNext.to(p.querySelectorAll('.word'),{translateY:"120%"},"<")
                switchNext.to(pNext.querySelectorAll('.word'),{translateY:"0%",stagger:0.03,duration:"power3.out",duration:1})
            }
            switchNext.play()
            // setShowPreviousArrow(true)
        } else {
            return
        }
    }

    const handlePreviousSlide = () => {
        const p = document.querySelector(`#slideText-${currentSlide}`)
        const pPrev = document.querySelector(`#slideText-${currentSlide-1}`)
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide>0){
            const switchPrevious = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide-1)}))
            switchPrevious.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",clipPath:"inset(0 0 0 100%)"},"<")
            switchPrevious.to(`#parallax-${currentSlide-1}`,{duration:2,ease:"power3.inOut",clipPath:'inset(0 0% 0 0)'},"<")
            if(p&&pPrev){
                switchPrevious.to(p.querySelectorAll('.word'),{translateY:"120%"},"<")
                switchPrevious.to(pPrev.querySelectorAll('.word'),{translateY:"0%",stagger:0.03,duration:"power3.out",duration:1})
            }
            switchPrevious.play()
        } else {
            return
        }
    }

    useIsomorphicLayoutEffect(() => {
        const text = SplitType.create(".lined",{types:"lines,words"})
        gsap.set(text.words,{translateY:"120%"})
        gsap.set('#parallax-0',{clipPath:"inset(0 0 0 0%)"})
    },[])    

    useEffect(() => {
        const p = document.querySelector(`#slideText-0`)
        const title = document.querySelector(`.postTitle`)
        const postIntroTL = gsap.timeline({delay:1})
        postIntroTL.to("#main",{clipPath:"inset(0% 0 0% 0)",duration:1.2,ease:"power3.out"})
        gsap.to(p.querySelectorAll(".word"),{translateY:"0%",stagger:0.02,duration:1,ease:"power3.out",delay:2})
        gsap.to(title.querySelectorAll(".word"),{translateY:"0%",stagger:0.02,duration:2,ease:"power3.out",delay:2})
        setOutro(postIntroTL)
        //Count number of sliders
        setPostImages(document.querySelectorAll(".slider"))
    },[setOutro])

    // SWITCH POST
    const handleChangePost = () => {
        let tl = gsap.timeline()
        tl.to('.word',{translateY:"120%",duration:1})
        tl.to('#main',{clipPath:"inset(51% 0 50% 0)",duration:1.2,ease:"ease3.in"})
        setTimeout(()=>router.push(`/posts/${nextPost.slug}`),1000)
    }

    useEffect(() => {
        if(postImages){
            (currentSlide===postImages.length-1)
            ?setShowNextArrow(false)
            :setShowNextArrow(true)
        }
    },[currentSlide,postImages,setShowNextArrow])

    useEffect(() => {
        if (!showNextArrow){
            gsap.to('.nextPost',{clipPath:"inset(0 0 0 0%)"})
        }
    },[showNextArrow])

    return (
        <div className='text-white absolute z-10 w-screen h-full p-4 grid grid-cols-4 md:grid-cols-12 grid-rows-[50vh_100px_2fr]'>
            <div className='col-span-4'>
                <h1 className='lined postTitle text-white text-[10vw] md:text-[4vw] tracking-tighter leading-suis font-medium uppercase'>{post.title}</h1>
            </div>
            <div className='flex flex-row w-full justify-between row-start-2 col-span-4 md:col-span-12 py-2'>
                <div className='overflow-hidden'>
                    <div id="previousArrow" className='overflow-hidden'>
                        <ArrowRight fn={handlePreviousSlide} color={'white'} style={{height:"30px",width:"40px",translateX:"-100%"}} classToAdd={'rotate-[180deg] cursor-pointer'}/>
                    </div>
                </div>
                {(showNextArrow)&&
                    <div className='overflow-hidden'>
                        <div id="nextArrow" className='overflow-hidden'>
                            <ArrowRight fn={handleNextSlide} color={'white'} style={{height:"30px",width:"40px",translateX:"100%"}} classToAdd={'cursor-pointer'}/>
                        </div>
                    </div>
                }
                {(showNextArrow===false)&&
                    <button onClick={handleChangePost} className='nextPost overflow-hidden' style={{clipPath:"inset(0 0 0 100%)"}}>
                        <div className='bg-white px-8 py-2 text-red text-justify'>
                            <h4 className='font-bold'>Next Post</h4>
                            <h6>{nextPost.title}</h6>
                        </div>
                </button>
                }
            </div>
            <div className='paragraphContainer relative text-white col-start-2 md:col-start-9 row-start-3 col-span-4 w-full h-full'>
                {post.body.text.split('\\n').map((el,i) => {
                    return (
                        <div key={i} className='slideText absolute w-full h-full'>
                            <p id={`slideText-${i}`} className='lined text-lg leading-[1.15]'>{el}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Post = ({post,nextPost,previousPost}) => {
    const [postData,setPostData] = useState()
    const changeTheme = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const postWrapper = useRef()
    const [ showPreviousArrow,setShowPreviousArrow ] = useState()
    const [ showNextArrow,setShowNextArrow ] = useState(true)
    const postTL = useRef(gsap.timeline({delay:1}))
    const router = useRouter()
    const [key,setKey] = useState('')
    const sliderImagesLength = previousPost.slide.sliderImages.length
    const {outro,setOutro} = useContext(OutroTimeline)
    
    const props = {
        post,postData,
        nextPost, previousPost,
        showPreviousArrow,setShowPreviousArrow,
        showNextArrow,setShowNextArrow,
        postTL
    }

    const transparent = "rgba(0,0,0,0)"
    const changeBackground = () => {
        gsap.to(["#smooth-wrapper","#hjiLogo"],{backgroundColor:`${transparent}`,duration:1})
        gsap.to("#menuHeader",{backgroundColor:`${transparent}`,color:"white",duration:1})
    }
    changeBackground()

    useEffect(() => {
        // Generate a unique key based on the slug or any other identifier
        const slug = router.query.slug;
        const uniqueKey = slug ? `dynamic-component-${slug}` : '';
        
        setKey(uniqueKey);
    },[router.query.slug])
    
    useEffect(() => {
        setPostData(post)
    },[post])

    return (
        <Layout>
                <main key={key} className='clip flex overflow-x-scroll w-screen h-screen text-white'>
                    <div id="main" className='contentContainer' style={{clipPath:"inset(51% 0 50% 0)"}}>
                        <div ref={postWrapper} className='relative w-screen h-screen'>
                            <Content {...props} />
                            <Slide {...props} />
                        </div>
                    </div>
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
    const posts = await getPostList();
    const list = posts.data.posts;
    const currentIndex = list.findIndex((post) => post.slug === params.slug);
    const currentPost = list[currentIndex];
    let nextPost;
    let previousPost;

    if (currentIndex > 0) {
        if(currentIndex === list.length-1){
            nextPost = list[0];
            previousPost = list[currentIndex - 1];
        } else {
            nextPost = list[currentIndex + 1];
            previousPost = list[currentIndex - 1];
        }
    } else {
        previousPost = list[list.length - 1];
        nextPost = list[currentIndex + 1];
    }

    return {
        props: {
            post: currentPost,
            nextPost,
            previousPost
        }
    }
    
}