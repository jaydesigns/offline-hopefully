import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import NegativeArrow from './negativeArrow'
import SplitType from "split-type";
import gsap from "gsap";
import LinkText from "./linkText";
import ArrowRight from "./arrowRight";

const Greeting = (props) =>{
    useEffect(()=>{
        // console.log("greet");
    })
    return (
        <>
            <div ref={props.headingText} className="relative w-full">
                <div className="absolute" data-name="name">
                    <h3 className="greet leading-suis text-2xl md:text-3xl font-semibold col-span-4 md:col-span-6">Thanks for taking interest in my work. I&apos;d like to know your name.</h3>
                </div>
            </div>
        </>
    )
}

const Meet = (props) =>{
    const meetText = useRef()
    let una = props.firstName.split(" ")
    useIsomorphicLayoutEffect(()=>{
        let lines;
        const runSplit = () => {
          //@ts-ignore
          lines = new SplitType(".greet",{types:'lines,words'})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplit()
        })
        gsap.set(meetText.current.querySelectorAll(".word"),{translateY:"120%"})
        gsap.to(meetText.current.querySelectorAll(".word"),{translateY:"0%",duration:1,stagger:0.02,ease:"power3.out"})
    },[])
    return (
        <>
            <div ref={props.headingText} className="relative w-full">
                <div className="absolute" data-name="needs">
                    <h3 ref={meetText} className="greet text-2xl md:text-3xl tracking-tight leading-suis font-semibold col-span-4 md:col-span-6">Hi <span style={{color:"#F45844"}}>{una[0]}</span>! It&apos;s great to have you here. Can I help you with something?</h3>
                </div>
            </div>
        </>
    )
}

const Looking = (props) =>{
    const justLookingText = useRef()
    useIsomorphicLayoutEffect(()=>{
        let lines;
        const runSplit = () => {
          //@ts-ignore
          lines = new SplitType(".greet",{type:'lines'})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplit()
        })
        gsap.set(justLookingText.current.querySelectorAll(".word"),{translateY:"120%"})
        gsap.to(justLookingText.current.querySelectorAll(".word"),{translateY:"0%",duration:1,stagger:0.02,ease:"power3.out"})
    },[])
    return (
        <>
            <div ref={props.headingText} className="relative w-full">
                <div className="absolute" data-name="looking">
                    <h3 ref={justLookingText} className="greet text-2xl md:text-3xl tracking-tight leading-suis font-semibold col-span-4 md:col-span-6">Hey, feel free to look around. If you feel inspired or just want to chat, you can always find my contact info on those three dots on the bottom-right.</h3>
                </div>
            </div>
        </>
    )
}

const Error = (props) =>{
    useIsomorphicLayoutEffect(()=>{
        let lines;
        const runSplit = () => {
          //@ts-ignore
          lines = new SplitType(".greet",{type:'lines'})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplit()
        })
        gsap.set(".word",{translateY:"120%"})
        gsap.to(".word",{translateY:"0%",duration:1,ease:"power3.out"})
    },[])
    return (
        <>
            <div ref={props.headingText} className="relative w-full">
                <div className="absolute" data-name="error">
                    <h3 className="greet text-2xl md:text-3xl font-semibold col-span-4 md:col-span-6">I&apos;m sorry, I didn&apos;t get your name.</h3>
                </div>
            </div>
        </>
    )
}

const Name = (props) => {
    useEffect(()=>{
        // console.log("name");
    })
    return (
        <div className="w-full">
            <div className="flex bg-black p-4 gap-8 w-full">
                <input type="text" className=" bg-black text-white border-white border-b w-full" placeholder="Replace this with your name" value={props.firstName} onChange={props.handleChange}></input>
                <div data-name="needs" ref={props.submitBtn} onClick={props.handleNameResponse} className="text-white px-2 flex gap-2 items-center"><div className="border border-white rounded-full h-[1rem] aspect-square"><ArrowRight color={"white"} classToAdd={"scale-50"}/></div><p>Enter</p></div>
            </div>
        </div>
    )
}

const Needs = (props) => {
    return (
        <div className="text-black">
            <button data-name="looking" onClick={props.handleNameResponse} className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Just Looking</button>
            <button className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Send Jay an email</button>
            <button className="block w-full bg-black text-white text-left px-8 py-4 text-sm border-b border-white hover:bg-red">Follow Jay&apos;s social media</button>
        </div>
    )
}

const Contact = () => {
    const [firstName,setFirstName] = useState("")
    const [ response,setResponse ] = useState("")
    const headingText = useRef()
    const [step,setStep] = useState("name")
    const submitBtn = useRef()
    const tl = useRef(gsap.timeline())

    useIsomorphicLayoutEffect(()=>{
        // console.log("contact");
        let lines;
        const runSplit = () => {
          //@ts-ignore
          lines = new SplitType(".greet",{type:'lines'})
        }
        runSplit()
        window.addEventListener("resize",()=>{
            lines.revert();
            runSplit()
        })
    },[])

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };
    console.log(firstName);

    const handleNameResponse = (event) =>{
        // event.preventDefault()
        console.log(event.currentTarget);
        // setStep("needs")
        if(firstName.length>0){
            tl.current.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
            console.log(event.arget.getAttribute("data-name"));
            tl.current.play().then(()=>setStep(event.target.getAttribute("data-name")))
        } else {
            tl.current.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
            tl.current.play().then(()=>setStep("error"))
        }
    }

    //
    //Enter button event listener
    //
    useEffect(()=>{
        window.addEventListener("keydown",(e)=>{
            e.key==="Enter"?handleNameResponse:console.log(e.key)
        })
    },[])
    
    /* useEffect(()=>{
        //let tl = gsap.timeline()
        let selected = document.querySelector(`[data-name='${step}']`)
        //tl.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
        // tl.current.to(selected.querySelectorAll(".word"),{translateY:"0%",duration:1,ease:"power3.out"})
        
        setTimeout(()=>{
            //
        },1500)
    },[step]) */

    return(
        <div className="interactiveContact snap-start w-screen h-screen text-black p-4 pt-4 grid grid-rows-contact md:grid-rows-6 grid-cols-4 md:grid-cols-12">
            <div className="flex flex-col justify-start col-span-4 md:col-span-12">
                <div className="border-b border-black py-2 col-span-4">
                    <h4 className="text-2xl md:text-3xl tracking-tight font-semibold">ChatJPT</h4>
                </div>
            </div>
            <div className="col-span-6 md:col-start-4 row-start-3">
                {step==="name"&&<Greeting handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn} headingText={headingText}/>}
                {step==="needs"&&<Meet handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn} firstName={firstName} headingText={headingText}/>}
                {step==="error"&&<Error headingText={headingText}/>}
                {step==="looking"&&<Looking headingText={headingText}/>}
            </div>
            
            <div className="col-span-4 md:col-span-6 col-start-1 md:col-start-4 row-start-4">
                {(step==="name"||step==="error")&&<Name handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>}
                {/* {step==="error"&&<Name handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>} */}
                {step==="needs"&&<Needs handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>}
                {(step==="looking"||step==="socials")&&<Needs handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>}
            </div>
            <div className="row-start-5 col-span-1">
                <h6 className="text-red text-xs font-bold leading-tight">Don&apos;t worry, your name won&apos;t be saved anywhere.</h6>
            </div>
        </div>
    )
}

export default Contact