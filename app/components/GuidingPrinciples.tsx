'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lottie from 'lottie-react'
import animationData from '@/app/lottie/principles.json'

gsap.registerPlugin(ScrollTrigger)

const data = [
    { title: 'Own It', desc: 'We take full responsibility.' },
    { title: 'Make Noise', desc: 'We create impact.' },
    { title: 'Stay Curious', desc: 'We explore constantly.' },
    { title: 'Think Bigger', desc: 'We don’t settle.' },
]

const GuidingPrinciples = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const lottieWrapperRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useLayoutEffect(() => {
        let handleMouseMove: ((e: MouseEvent) => void) | undefined;
        let handleMouseLeave: (() => void) | undefined;
        const sectionEl = sectionRef.current;

        const ctx = gsap.context(() => {
            // Text scroll highlights
            cardsRef.current.forEach((item, i) => {
                if (!item) return;

                ScrollTrigger.create({
                    trigger: item,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => gsap.to(item, { opacity: 1, duration: 0.5 }),
                    onLeaveBack: () => gsap.to(item, { opacity: 0.2, duration: 0.5 }),
                    onLeave: () => gsap.to(item, { opacity: 0.2, duration: 0.5 }),
                    onEnterBack: () => gsap.to(item, { opacity: 1, duration: 0.5 })
                });
            });

            // Set underlying centering transforms so GSAP doesn't break Tailwind's translation
            gsap.set(lottieWrapperRef.current, { xPercent: -50, yPercent: -50 });

            // Cursor following logic for Lottie
            // Adjusted duration to 0.35 for a perfect balance between responsiveness and a "buttery smooth" glide
            const xTo = gsap.quickTo(lottieWrapperRef.current, "x", { duration: 0.35, ease: "power3.out" })
            const yTo = gsap.quickTo(lottieWrapperRef.current, "y", { duration: 0.35, ease: "power3.out" })

            handleMouseMove = (e: MouseEvent) => {
                if (!sectionRef.current) return;
                const rect = sectionRef.current.getBoundingClientRect();

                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                // Adjust for the fact that the CSS 'left' is set to 50%
                xTo(mouseX - (rect.width / 2) + 20);
                yTo(mouseY + 20);
            };

            const handleMouseLeave = () => {
                // Smoothly return to the exact center when mouse leaves the section
                xTo(0);
                yTo(0);
            };

            if (sectionEl) {
                sectionEl.addEventListener("mousemove", handleMouseMove);
                sectionEl.addEventListener("mouseleave", handleMouseLeave);
            }

        }, sectionRef)

        return () => {
            if (sectionEl && handleMouseMove) {
                sectionEl.removeEventListener("mousemove", handleMouseMove);
            }
            if (sectionEl && handleMouseLeave) {
                sectionEl.removeEventListener("mouseleave", handleMouseLeave);
            }
            ctx.revert()
        }
    }, [])

    return (
        <section ref={sectionRef} className="bg-black text-[#dcdcdc] py-32 px-10 relative overflow-hidden cursor-crosshair">

            {/* Header */}
            <div className="text-center mb-24 flex flex-col items-center">
                <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                    Projects
                </h2>
                {/* The Moving Torch */}
                <div
                    ref={lottieWrapperRef}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[60px] top-0 hidden md:block pointer-events-none z-50"
                >
                    <Lottie
                        animationData={animationData}
                        autoplay
                        loop
                    />
                </div>
            </div>

            {/* Principles List */}
            <div className="relative pt-10">
                <div className="container">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardsRef.current[i] = el }}
                            className="principle-item border-t border-white/10 py-16 flex flex-col md:flex-row justify-between items-start opacity-20 hover:opacity-100 transition-opacity"
                        >
                            <div className="flex gap-4">
                                <span className="text-sm md:text-md mt-2 text-gray-500 font-mono">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-5xl md:text-6xl font-serif">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="max-w-sm lg:max-w-xl text-xl font-light mt-6 md:mt-2 text-gray-400 leading-relaxed md:text-right">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GuidingPrinciples
