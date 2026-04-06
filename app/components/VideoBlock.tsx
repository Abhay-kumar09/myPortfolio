'use client'

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoBlock = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(containerRef.current, {
            width: "90vw",
            height: "90vh",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Start animating when the top of the video enters 80% of the viewport height
                end: "top 20%",   // Finish animating when the top of the video reaches 20% of the viewport height
                scrub: 1,         // Smooth scaling tied to scroll position
            }
        });
    });

    return (
        <section className="mx-auto py-37.5 flex justify-center items-center w-full overflow-hidden">
            <div
                ref={containerRef}
                className="w-75 h-75 sm:w-200 sm:h-100 rounded-3xl overflow-hidden relative"
            >
                <video
                    src="/video.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
        </section>
    )
}

export default VideoBlock;