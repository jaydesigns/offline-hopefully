import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import NegativeArrow from './negativeArrow'
import SplitType from "split-type";
import gsap from "gsap";

const Greeting = (props) =>{
    useEffect(()=>{
        console.log("greet");
    })
    return (
        <>
            <div ref={props.headingText} className="relative col-span-12">
                <div className="absolute" data-name="name">
                    <h3 className="greet text-2xl md:text-6xl font-semibold col-span-8 md:col-span-12 mix-blend-exclusion">Thanks for taking interest in my work. I&apos;d like to know your name.</h3>
                </div>
            </div>
        </>
    )
}

const Meet = (props) =>{
    let una = props.firstName.split(" ")
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
            <div className="relative col-span-12">
                <div className="absolute" data-name="needs">
                    <h3 className="greet text-2xl md:text-6xl font-semibold col-span-8 md:col-span-12 mix-blend-exclusion">Hi {una[0]}! It&apos;s great to have you here. Can I help you with something?</h3>
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
            <div ref={props.headingText} className="relative col-span-12">
                <div className="absolute" data-name="error">
                    <h3 className="greet text-2xl md:text-6xl font-semibold col-span-8 md:col-span-12 mix-blend-exclusion">I&apos;m sorry, I didn&apos;t get your name.</h3>
                </div>
            </div>
        </>
    )
}

const Name = (props) => {
    useEffect(()=>{
        console.log("name");
    })
    return (
        <form className="w-full">
            <div className="flex bg-black p-4 gap-8 w-full">
                <input className=" bg-black text-white border-white border-b w-full" placeholder="What's your name?" value={props.firstName} onChange={props.handleChange}></input>
                <button ref={props.submitBtn} onClick={props.handleNameResponse}><NegativeArrow/></button>
            </div>
        </form>
    )
}

const Needs = (props) => {
    return (
        <div className="text-black">
            <button className="block w-full bg-black text-white text-left p-2">Just Looking</button>
            <button className="block w-full bg-black text-white text-left p-2">I want to learn more about branding.</button>
            <button className="block w-full bg-black text-white text-left p-2">What can I do with the modern web?</button>
            <button className="block w-full bg-black text-white text-left p-2">Social media platforms</button>
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

    const contactResponsObject = {
        name:"",
        needs:"",
        branding:"",
    }

    useIsomorphicLayoutEffect(()=>{
        console.log("contact");
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

    /* useIsomorphicLayoutEffect(()=>{
        console.log(submitBtn.current);
        submitBtn.current.addEventListener("click",(e)=>{
            e.preventDefault()
            lines.revert();
            let tl = gsap.timeline()
            tl.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
            runSplit()
            tl.to(headingText.current.querySelectorAll(".word"),{translateY:"0%",duration:1,ease:"power3.in"})
        })
    },[]) */

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };
    //console.log(firstName);

    const handleNameResponse = (event) =>{
        event.preventDefault()
        // setStep("needs")
        if(firstName.length>0){
            tl.current.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
            tl.current.play().then(()=>setStep("needs"))
        } else {
            tl.current.to(headingText.current.querySelectorAll(".word"),{translateY:"120%",duration:1,ease:"power3.in"})
            tl.current.play().then(()=>setStep("error"))
        }
    }

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
        <div className="interactiveContact snap-start w-screen h-screen text-white p-4 pt-28 grid md:grid-rows-layout grid-cols-4 md:grid-cols-12">
            {step==="name"&&<Greeting handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn} headingText={headingText}/>}
            {step==="needs"&&<Meet handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn} firstName={firstName}/>}
            {step==="error"&&<Error headingText={headingText}/>}
            
            <div className="col-span-4 col-start-1 md:col-start-5 row-start-4 md:row-start-4">
                {(step==="name"||step==="error")&&<Name handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>}
                {/* {step==="error"&&<Name handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>} */}
                {step==="needs"&&<Needs handleNameResponse={handleNameResponse} handleChange={handleChange} submitBtn={submitBtn}/>}
            </div>
            <div className="row-start-6">
                <h6 className="text-red text-xs font-bold leading-tight">Don&apos;t worry, your name won&apos;t be saved anywhere.</h6>
            </div>
        </div>
    )
}

export default Contact