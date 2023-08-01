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


const Content = ({postData,setPostData,nextPost,previousPost,showPreviousArrow,setShowPreviousArrow,showNextArrow,setShowNextArrow,postTL}) => {
    const [currentSlide,setCurrentSlide] = useState(0)
    const slideArray = postData.slide.sliderImages
    const [postImages,setPostImages] = useState()
    const sliderBox = useRef()
    const postTitle = useRef()
    const bodyTxt = useRef()
    const [ postBody,setPostBody ] = useState()
    const router = useRouter()
    const {outro,setOutro} = useContext(OutroTimeline)

    const props = {
        postBody,
        postTL
    }

    // Initialize post content
    //
    //    
    useIsomorphicLayoutEffect(() => {
        setPostBody(postData)
        gsap.to(`#parallax-0`,{clipPath:"inset(0 0 0 0%)",duration:2,ease:"power3.inOut"})
    },[postData])

    useEffect(() => {
        if (postBody) {
            let title = new SplitType(postTitle.current,{types:"lines,words"})
            let firstParagraph = document.querySelector('#slideText-0')
            let firstSlideText = firstParagraph.querySelectorAll('.word')
            let body = new SplitType('.lined',{types:"lines,words"})
            gsap.set([title.words,body.words],{translateY:"120%"})
            // Run Split
            gsap.to(title.words,{translateY:"0%",stagger:0.2,ease:"power3.out",duration:2})
            // postTL.current.to('.contentContainer',{clipPath:"inset(0% 0 0 0)",ease:"power3.inOut"},"<")
            // postTL.current.to(firstSlideText,{translateY:"0%",duration:1,stagger:0.02,ease:"power3.inOut"},'<')
        }
    },[postBody,postTL,setOutro])

    //
    //Initialize the post images
    //
    useEffect(() => {
        setPostImages(document.querySelectorAll(".slider"))
    },[slideArray])


    //
    //SHOW OR HIDE ARROWS
    //
    useEffect(() => {
        (showNextArrow)
        ?gsap.to('#nextArrow',{translateX:"0%"})
        :gsap.to('#nextArrow',{translateX:"100%"})
    },[showNextArrow])

    useEffect(() => {
        (showPreviousArrow)
        ?gsap.to('#previousArrow',{translateX:"0%"})
        :gsap.to('#previousArrow',{translateX:"-100%"})
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

    useEffect(() => {
        if (!showNextArrow){
            gsap.to('.nextPost',{clipPath:"inset(0 0 0 0%)"})
        }
    },[showNextArrow])

    const handleNextSlide = () =>{
        const p = document.querySelector(`#slideText-${currentSlide}`)
        gsap.registerPlugin(ScrollToPlugin)
        if(currentSlide<postImages.length-1){
            const switchNext = (gsap.timeline({onComplete:()=>setCurrentSlide(currentSlide+1)}))
            switchNext.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",clipPath:"inset(0 100% 0 0)"},"<")
            switchNext.to(`#parallax-${currentSlide+1}`,{duration:2,ease:"power3.inOut",clipPath:'inset(0 0 0 0%)'},"<")
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
            switchPrevious.to(`#parallax-${currentSlide}`,{duration:2,ease:"power3.inOut",clipPath:"inset(0 0 0 100%)"},"<")
            switchPrevious.to(`#parallax-${currentSlide-1}`,{duration:2,ease:"power3.inOut",clipPath:'inset(0 0% 0 0)'},"<")
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
            }
        }
    },[postBody,currentSlide,postTL])

    //
    // SWITCH POST
    //
    //
    const handleChangePost = () => {
        let tl = gsap.timeline()
        tl.to('.word',{translateY:"120%"})
        tl.to('#previousArrow',{translateX:"-100%"},"<")
        tl.to('.nextPost',{clipPath:"inset(0 0 0 100%)"},"<")
        //tl.to('.contentContainer',{translateX:'-50%'})
        setTimeout(()=>router.push(`/posts/${nextPost.slug}`),1000)
    }

    return(
        <div className='absolute z-50'>
            {(postBody)&&
            
                <div className='w-screen h-full p-4 grid grid-cols-4 md:grid-cols-12 grid-rows-[50vh_100px_2fr]'>
                    <div className='col-span-4'>
                        <h1 ref={postTitle} className='postTitle text-white text-[10vw] md:text-[4vw] tracking-tighter leading-suis font-medium uppercase'>{postData.title}</h1>
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
                    <div ref={bodyTxt} className='paragraphContainer relative text-white col-start-2 md:col-start-9 row-start-3 col-span-4 w-full h-full'>
                        {postBody.body.text.split('\\n').map((el,i) => {
                            return (
                                <div key={i} className='slideText relative w-full h-full'>
                                    <p id={`slideText-${i}`} className='lined absolute text-lg leading-[1.15] font-thin'>{el}</p>
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
                            <Image src={el.url} alt="project cover image" fill style={{objectFit:"cover",clipPath:"inset(0 0 0 100%)"}} id={`parallax-${i}`} loading='eager' className="absolute" sizes='(min-width: 768px) 100vw, (max-width: 768px) 75vw'></Image>
                        </div>
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
    const [ showNextArrow,setShowNextArrow ] = useState()
    const postTL = useRef(gsap.timeline({delay:1}))
    const router = useRouter()
    const [key,setKey] = useState('')
    const {outro,setOutro} = useContext(OutroTimeline)
    const sliderImagesLength = previousPost.slide.sliderImages.length

    const props = {
        postData : postData,
        nextPost, previousPost,
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
    },[post,previousPost])

    useEffect(() => {
        changeTheme("rgba(0,0,0,0)")
    },[changeTheme])

    useEffect(() => {
        let postTL = gsap.timeline()
        postTL.fromTo('.contentContainer',{opacity:0},{opacity:1})
        setOutro(postTL)
    },[setOutro])

    // console.log(previousPost.slide.sliderImages[sliderImagesLength-1])
    return (
        <Layout>
                <main key={key} className='clip flex overflow-x-scroll w-screen h-screen text-white'>
                    {(postData)&&
                            <div className='contentContainer block whitespace-nowrap' /* style={{clipPath:"inset(100% 0 0 0)"}} */>
                                <div className='absolute w-screen h-screen inline-block'>
                                    <Image src={previousPost.slide.sliderImages[sliderImagesLength-1].url} alt={'wow'} sizes='100vw' fill style={{objectFit:'cover',position:'absolute'}}/>
                                </div>
                                <div ref={postWrapper} className='w-screen h-screen inline-block whitespace-normal'>
                                    <Content {...props} />
                                    <Slide {...props} />
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