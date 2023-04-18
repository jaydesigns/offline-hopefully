import {useIsomorphicLayoutEffect} from "../useIsomorphicLayoutEffect"
import {useState, useRef, useEffect, useCallback} from 'react'
import SplitType from "split-type"
import { gsap } from "gsap"
import ArrowRight from "./arrowRight"

const ChatHeaderInnerText =({chatHeader,str})=>{
    return(
        <h3 ref={chatHeader} className="greet leading-suis text-2xl md:text-4xl font-semibold col-span-4 md:col-span-6">{str}</h3>
    )
}

const ChatHeader = ({step,chatHeader,firstName})=>{
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
        {(step===3)&&<ChatHeaderInnerText chatHeader={chatHeader} str={"Third step"}/>}
        </>
    )
}

const PromptBox = ({nextStep,previousStep,step,handleChange,firstName})=>{
    const handleKeyDown = (e)=>{
        e.key==="Enter"?nextStep():console.log(e.key)
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
                <button className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Just Looking</button>
                <button className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Send Jay an email</button>
                <button className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Follow Jay&apos;s social media</button>
            </div>
            }
            {step>1?<button onClick={previousStep}>Back</button>:console.log("Start chatting.")}
        </div>
    )
}

const ChatJPT =()=>{
    const [step,setStep] = useState(1)
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

    return (
        <div className="interactiveContact snap-start w-screen h-screen text-black p-4 pt-4 grid grid-rows-contact grid-cols-4 md:grid-cols-12">
            <div className="flex flex-col justify-start col-span-4 md:col-span-12">
                <div className="border-b border-black py-2 col-span-4">
                    <h4 className="text-2xl md:text-3xl tracking-tight font-semibold">Let&apos;s <br></br>Connect</h4>
                </div>
            </div>
            <div className="col-span-6 md:col-start-4 row-start-2">
                <ChatHeader step={step} chatHeader={chatHeader} firstName={firstName}/>
            </div>
            <div className="col-span-4 md:col-span-6 col-start-1 md:col-start-4 row-start-3">
                <PromptBox nextStep={nextStep} previousStep={previousStep} step={step} handleChange={handleChange} firstName={firstName}/>
            </div>
            <div className="row-start-5 col-span-1">
                <h6 className="text-red text-xs font-bold leading-tight">Don&apos;t worry, your name won&apos;t be saved anywhere.</h6>
            </div>
        </div>
    )
}

export default ChatJPT;