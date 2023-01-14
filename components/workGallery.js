// import ArrowRight from "./arrowRight";
// import gsap from "gsap";
// import { useEffect, useRef } from "react";
import Image from "next/image"

const WorkGallery = () => {
    return(
        <div className="flex flex-col text-white selectedWork w-full h-screen p-4 justify-between pb-36">
            <div className="flex flex-col gap-4 md:flex-row">
                <h1 className="flex-1 text-6xl text-white">Selected Work</h1>
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
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/aloha.jpg'} alt="image" width={260} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/curve.jpg'} alt="image" width={160} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/ocean.jpg'} alt="image" width={260} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/cover-closeup.jpg'} alt="image" width={460} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/DSC_0120_2.jpg'} alt="image" width={460} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/aloha.jpg'} alt="image" width={260} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/curve.jpg'} alt="image" width={160} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/ocean.jpg'} alt="image" width={260} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/cover-closeup.jpg'} alt="image" width={460} height={568}></Image>
                        <p>What</p>
                    </div>
                    <div className="card flex flex-col justify-start w-max">
                        <Image src={'/images/DSC_0120_2.jpg'} alt="image" width={460} height={568}></Image>
                        <p>What</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkGallery