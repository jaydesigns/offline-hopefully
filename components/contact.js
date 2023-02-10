import { useRef, useState } from "react";
import NegativeArrow from './negativeArrow'

const Name = (props) => {
    return (
        <form className="w-full">
            <div className="flex bg-black p-4 gap-8 w-full">
                <input className=" bg-black text-white border-white border-b w-full" placeholder="What's your name?" value={props.firstName} onChange={props.handleChange}></input>
                <button onClick={props.handleNameResponse}><NegativeArrow/></button>
            </div>
        </form>
    )
}

const Needs = (props) => {
    return (
        <div className="text-black">
            <button className="block w-full bg-black text-white text-left p-2">Just Looking</button>
            <button className="block w-full bg-black text-white text-left p-2">I need help with branding.</button>
            <button className="block w-full bg-black text-white text-left p-2">My website looks ugly, I want it to look nice.</button>
        </div>
    )
}

const Contact = () => {
    const [firstName,setFirstName] = useState("")
    const headingText = useRef()
    const [step,setStep] = useState("name")

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };
    console.log(firstName);

    const handleNameResponse = (event) =>{
        event.preventDefault()
        if(firstName.length>0){
            const ngan = firstName.split(" ")
            headingText.current.innerText = `Hi ${ngan[0]}! It's nice to have you here! Is there anything I can help you with?`
            setStep("needs")
        } else {
            headingText.current.innerText = `It seems like you didn't put down your name below.`
        }
    }

    return(
        <div className="interactiveContact snap-start w-screen h-screen text-white p-4 pt-28 grid md:grid-rows-layout grid-cols-4 md:grid-cols-12">
            <h3 ref={headingText} className="text-2xl md:text-6xl font-semibold col-span-4 md:col-span-12 mix-blend-exclusion">Hi! Thanks for taking interest in my work. I&apos;d like to know your name.</h3>
            <div className="col-span-4 col-start-5 row-start-4">
                {step==="name"&&<Name handleNameResponse={handleNameResponse} handleChange={handleChange}/>}
                {step==="needs"&&<Needs handleChange={handleChange} handleNameResponse={handleNameResponse}/>}
            </div>
            <div className="row-start-6">
                <h6 className="text-red text-xs font-bold leading-tight">Don&apos;t worry, your name won&apos;t be saved anywhere.</h6>
            </div>
        </div>
    )
}

export default Contact