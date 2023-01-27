// import ArrowRight from "./arrowRight";
// import gsap from "gsap";
// import { useEffect, useRef } from "react";
import Image from "next/image"

const WorkGallery = () => {
    return(
        <div id="selectedWork" className="snap-start flex flex-col text-white selectedWork w-full h-screen p-4 justify-between">
            <div className="flex flex-col gap-4 md:flex-row">
                <h1 className="flex-1 text-6xl">Selected Work</h1>
                <div className="flex-1 flex-col md:flex-row border-t border-white">
                    <span><span>+</span>Type of Work</span>
                    <div className="flex flex-col">
                        <span>Branding</span>
                        <span>UI Design</span>
                        <span>Environmental Design</span>
                        <span>Publication Design</span>
                    </div>
                </div>
                <div className="flex-1 flex-col md:flex-row border-t border-white">
                    <span><span>+</span>Technology Used</span>
                    <div className="flex flex-col">
                        <span>Adobe Illustrator</span>
                        <span>Figma</span>
                        <span>React/NextJS/GSAP</span>
                        <span>Adobe After Effects</span>
                    </div>
                </div>
            </div>
            <div className="flex overflow-x-auto w-screen">
                <div className="flex flex-row gap-4 flex-nowrap">
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-96 h-96">
                        <div className="relative h-2/3 w-full overflow-hidden">
                            <Image src={'/images/aloha.jpg'} alt="image" fill style={{objectFit:"cover"}}></Image>
                        </div>
                        <p className="h-1/3">What</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery