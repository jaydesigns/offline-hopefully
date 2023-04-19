import {useIsomorphicLayoutEffect} from "../useIsomorphicLayoutEffect"
import {useState, useRef, useEffect, useCallback} from 'react'
import SplitType from "split-type"
import { gsap } from "gsap"
import ArrowRight from "./arrowRight"
import Link from "next/link"

const ChatHeaderInnerText =({chatHeader,str})=>{
    return(
        <h3 ref={chatHeader} className="greet leading-suis text-2xl md:text-4xl font-semibold col-span-4 md:col-span-6">{str}</h3>
    )
}

const ChatHeader = ({step,chatHeader,firstName,purpose})=>{
    const firstNameSplit = firstName.split(" ")
    useIsomorphicLayoutEffect(()=>{
        let lines
        const runSplit = ()=>{
            lines = new SplitType(".greet",{types:'lines,words'})
        }
        runSplit()
        gsap.set(chatHeader.current.querySelectorAll(".word"),{translateY:"120%"})
        gsap.fromTo(chatHeader.current.querySelectorAll(".word"),{translateY:"120%"},{translateY:"0%",ease:"power3.out",stagger:0.02,duration:1})
    },[step])

    return(
        <>
        {(step===1)&&<ChatHeaderInnerText chatHeader={chatHeader} str={"Thank you for taking interest in my work. I'd like to know your name."}/>}
        {(step===2)&&<ChatHeaderInnerText chatHeader={chatHeader} str={`Hi ${firstNameSplit[0]}! Nice to have you here. Can I help you with anything?`}/>}
        {(step===3)&&(purpose==='looking')&&<ChatHeaderInnerText chatHeader={chatHeader} str={"Well, If you're interested in some of my personal projects, check the links below."}/>}
        {(step===3)&&(purpose==='connect')&&<ChatHeaderInnerText chatHeader={chatHeader} str={"Nice!"}/>}
        {(step===3)&&(purpose==='inspiration')&&<ChatHeaderInnerText chatHeader={chatHeader} str={"Really?"}/>}
        </>
    )
}

const PromptBox = ({nextStep,previousStep,step,handleChange,firstName,selectedPurpose})=>{
    const handleKeyDown = (e)=>{
        e.key==="Enter"?nextStep():null
    }

    return(
        <div>
            {(step===1)&&
            <div className="flex bg-black p-4 gap-8 w-full">
                <input type="text" className=" bg-black text-white border-white border-b w-full" placeholder="Replace this with your name" value={firstName} onChange={handleChange} onKeyDown={handleKeyDown}></input>
                <button onClick={nextStep} className="flex text-white items-center gap-2"><div className="border border-white rounded-full h-[1rem] aspect-square"><ArrowRight color={"white"} classToAdd={"scale-50"}/></div>Enter</button>
            </div>
            }
            {(step===2)&&
            <div>
                <button onClick={nextStep} onMouseDown={selectedPurpose} data-selection="looking" className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Just looking around.</button>
                <button onClick={nextStep} onMouseDown={selectedPurpose} data-selection="connect" className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">I want to connect.</button>
                <button onClick={nextStep} onMouseDown={selectedPurpose} data-selection="inspiration" className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Explore Jay&apos;s collection &#40;sandbox&#41;.</button>
            </div>
            }
            {step>1?<button onClick={previousStep} className="flex items-center gap-2"><div className="border border-black rounded-full h-[1rem] aspect-square"><ArrowRight color={"black"} classToAdd={"scale-50 rotate-180"}/></div>Back</button>:null}
        </div>
    )
}

const LinkBox = ({step})=>{
    return(
        <>
            {(step===3)&&<div className="flex justify-between w-full">
                <Link href="/" className="flex gap-2">Awwwards<ArrowRight color={"black"} classToAdd={"rotate-[-45deg]"}/></Link>
                <Link href="/" className="flex gap-2">Codesandbox<ArrowRight color={"black"} classToAdd={"rotate-[-45deg]"}/></Link>
                <Link href="/" className="flex gap-2">Behance<ArrowRight color={"black"} classToAdd={"rotate-[-45deg]"}/></Link>
            </div>
            }
        </>
    )
}

const ChatJPT =()=>{
    const [step,setStep] = useState(1)
    const [purpose,setPurpose] = useState()
    const wordsSlide = useRef(gsap.timeline())
    const chatHeader = useRef()
    const [firstName,setFirstName] = useState("")

    const nextStep = ()=>{
        wordsSlide.current.addLabel("slideDown")
        wordsSlide.current.to(chatHeader.current.querySelectorAll('.word'),{translateY:'120%',ease:'power3.in'},"slideDown")
        wordsSlide.current.play("slideDown").then(()=>setStep(step+1))
    }

    const previousStep =()=>{
        wordsSlide.current.addLabel("slideDown")
        wordsSlide.current.to(chatHeader.current.querySelectorAll('.word'),{translateY:'120%',ease:'power3.in'},"slideDown")
        wordsSlide.current.play("slideDown").then(()=>setStep(step-1))
    }

    const handleChange =(e)=>{
        setFirstName(e.target.value)
    }

    const selectedPurpose =(e)=>{
        setPurpose(e.target.getAttribute('data-selection'))
    }

    return (
        <div className="interactiveContact snap-start w-screen h-screen text-black p-4 pt-4 grid grid-rows-contact grid-cols-4 md:grid-cols-12">
            <div className="flex flex-col justify-start col-span-4 md:col-span-12">
                <div className="border-b border-black py-2 col-span-4">
                    <h4 className="text-2xl md:text-3xl tracking-tight font-semibold">Let&apos;s <br></br>Connect</h4>
                </div>
            </div>
            <div className="col-span-6 md:col-start-4 row-start-2">
                <ChatHeader step={step} chatHeader={chatHeader} firstName={firstName} purpose={purpose}/>
            </div>
            <div className="col-span-4 md:col-span-6 col-start-1 md:col-start-4 row-start-3">
                <PromptBox nextStep={nextStep} previousStep={previousStep} step={step} handleChange={handleChange} firstName={firstName} selectedPurpose={selectedPurpose}/>
            </div>
            <div className="col-span-4 md:col-span-6 col-start-1 md:col-start-4 row-start-4">
                <LinkBox step={step} />
            </div>
            <div className="row-start-5 col-span-1">
                <h6 className="text-red text-xs font-bold leading-tight">Don&apos;t worry, your name won&apos;t be saved anywhere.</h6>
            </div>
        </div>
    )
}

export default ChatJPT;