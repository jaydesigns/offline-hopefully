import { useRef, useState } from "react";

const Contact = () => {
    const [firstName,setFirstName] = useState("")
    const headingText = useRef()

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleNameResponse = (event) =>{
        event.preventDefault()
        if(firstName.length>0){
            headingText.current.innerText = `Hi ${firstName}! It's nice to have you here! Is there anything I can help you with?`
        } else {
            headingText.current.innerText = `It seems like you didn't put down your name below.`
        }
    }

    return(
        <div className="interactiveContact w-screen h-screen text-black p-4 pt-28 grid grid-rows-2">
            <h3 ref={headingText} className="text-2xl md:text-6xl font-semibold indent-48">Hi! Thanks for taking interest in my work. I&apos;d like to meet you. What&apos;s your name?</h3>
            <form>
                <input className="bg-black text-white p-2" placeholder="First name will do" value={firstName} onChange={handleChange}></input>
                <button onClick={handleNameResponse}>Submit</button>
            </form>
        </div>
    )
}

export default Contact