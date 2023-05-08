import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"
import { gsap } from "gsap"

const Credits = () =>{
    useIsomorphicLayoutEffect(()=>{
        gsap.to(".changeBG",{backgroundColor:"#141011"})
    },[])
    return(
        <div className="bg-black text-white p-4 w-screen h-screen">
            <h1 className="text-bio tracking-tighter border-grey border-b py-4">Credits</h1>
            <div className="py-4">
                <p>Designed & Developed &mdash; Jay Indino</p>
                <p>Programming Language &mdash; JavaScript</p>
                <p>CMS &mdash; Strapi</p>
                <p>Font &mdash; Switzer by Jeremie Hornus</p>
                <p>Cascade Stylesheet &mdash; Tailwind</p>
            </div>
        </div>
    )
}

export default Credits