import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import NegativeArrow from '../components/negativeArrow'
import { BackgroundTheme, ThemeContext } from '../components/layout'
import { useContext } from "react"
import Layout from "../components/layout"
import Image from "next/image"
import {OutroTimeline} from "../pages/_app"
import SplitType from "split-type"

const Credits = () =>{
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    const {outro,setOutro} = useContext(OutroTimeline)

    useIsomorphicLayoutEffect(()=>{
        const creditsTL = gsap.timeline()
        let text
        const runSplit = () => {

            text = new SplitType(".lined",{types:'lines,words'})
        }
        runSplit()
        gsap.set([text.words,'.creditTitle'],{translateY:"120%"})
        creditsTL.fromTo(".imageContainer",{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",ease:"power3.inOut",duration:2})
        creditsTL.fromTo(".creditBorder",{width:"0"},{width:"100%"},"<")
        creditsTL.to(['.creditTitle',text.words],{translateY:"0%",stagger:0.008,duration:0.5},"-=1")
        themeChange(`${ThemeColors.black}`)
        creditsTL.play()
        setOutro(creditsTL)
        window.addEventListener("resize",()=>{
            runSplit()
        })
    },[])

    return(
        <Layout>
            <div className="text-white p-4 w-screen h-screen flex flex-col">
                <div className="creditBorder border-grey border-b py-4 shrink overflow-hidden">
                    <h1 className="creditTitle text-[28vw] md:text-[16vw] leading-suis tracking-tighter">Credits</h1>
                </div>
                <div className="grow flex flex-col justify-between mb-20">
                    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-[auto_200px_auto] py-4 gap-4">
                        <div className="flex flex-col col-start-2 col-span-3 md:col-start-9 md:col-span-4">
                            <p className="lined">Designed & Developed &mdash; Jay Indino</p>
                            <p className="lined">Programming Language &mdash; JavaScript</p>
                            <p className="lined">CMS &mdash; Hygraph&trade;</p>
                            <p className="lined">Font &mdash; Saans&trade; by Displaay&reg;</p>
                            <p className="lined">Cascade Stylesheet &mdash; Tailwind&reg;</p>
                        </div>
                        <div className="imageContainer relative row-span-2 row-start-1 col-start-2 md:col-start-1 col-span-3 md:col-span-6">
                            <Image
                            onMouseEnter={e=>e.target.style.filter="invert(0) grayscale(100%)"}
                            onTouchStart={e=>e.target.style.filter="invert(0) grayscale(100%)"}
                            onMouseLeave={e=>e.target.style.filter="invert(100%)"}
                            alt="ocean"
                            src={'/images/pexels-oliver-sjöström-1074505.jpg'}
                            style={{objectFit:'cover',filter:'invert(100%)'}}
                            fill
                            sizes="(min-width:768px) 100vw, 100vw"/>
                        </div>
                        <div className="row-start-3 col-start-1 col-span-4 md:col-start-5">
                            <p className="lined">Try this optical illusion that I learned when I was younger. All you have to do is look at the center of the image and hold it for 30 seconds. And then move the cursor over the image or tap it to see what it is.</p><br></br><p className="lined"> Is it a colored image or a black and white one? Pretty cool huh!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Credits