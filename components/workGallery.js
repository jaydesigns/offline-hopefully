import { useEffect,useRef,useState} from "react";
import ArrowRight from "./arrowRight";
import gsap from "gsap";

const WorkGallery = () => {
    const scrollRef = useRef()

    useEffect(() => {
        if (typeof window === "undefined") {
          return;
        }
    
        const scroll = import("locomotive-scroll").then((LocomotiveScroll) => {
          new LocomotiveScroll.default({
            el: scrollRef.current,
            smooth: true
          });
        });
    
        return () => scroll.destroy();
      }, []);

    return(
        <div data-scroll className="w-full h-screen" useRef={scrollRef}>
            <h1 data-scroll data-scroll-speed="9">Selected Work</h1>
        </div>
    )
}

export default WorkGallery