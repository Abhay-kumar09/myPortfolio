'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import SplitType from 'split-type'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(CustomEase)
    CustomEase.create("hop", "0.87, 0, 0.13, 1")
}

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ✅ INITIAL STATE (images visible from start)
            gsap.set('.hero-images .img', {
                opacity: 1,
                scale: 0.8,
                y: 0
            })

            // TEXT SPLIT
            const split = new SplitType('.hero-header h1', {
                types: 'words,chars'
            })

            gsap.set('.hero-header h1', { opacity: 1 })
            gsap.set(split.words, { overflow: 'hidden', display: 'inline-flex' })
            gsap.set(split.chars, { y: "100%", autoAlpha: 0 })

            const tl = gsap.timeline()
            const counter = document.querySelector('.counter h1')

            // =============================
            // 🔢 COUNTER (0 → 100)
            // =============================
            if (counter) {
                gsap.to(counter, {
                    innerHTML: 100,
                    duration: 2.5,
                    snap: { innerHTML: 1 },
                    ease: "power1.inOut"
                })
            }

            // =============================
            // 📝 OVERLAY TEXT
            // =============================
            gsap.set('.overlay-text', { y: 32 })

            tl.to('.overlay-text', {
                y: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "start")

                .to('.overlay-text', {
                    y: -32,
                    duration: 0.5,
                    ease: "power3.inOut"
                }, "start+=0.8")

                .to('.overlay-text', {
                    y: -64,
                    duration: 0.5,
                    ease: "power3.inOut"
                }, "start+=1.6")

            // =============================
            // 🔥 60% ANIMATION (COME CLOSER)
            // =============================
            tl.to('.hero-images', {
                gap: '4vw',
                duration: 1,
                ease: "power2.inOut"
            }, "start+=1")

            tl.to('.hero-images .img', {
                scale: 1,
                duration: 1,
                ease: "power2.inOut"
            }, "start+=1")

            // =============================
            // 🧼 HIDE OVERLAY (~80%)
            // =============================
            tl.to('.hero-overlay', {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set('.hero-overlay', { display: 'none' })
                }
            }, "start+=2")

            // =============================
            // 🎯 FINAL (ONLY HERO IMAGE)
            // =============================
            tl.to('.hero-images .img:not(.hero-img)', {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power2.inOut"
            }, "start+=2.3")

            tl.to('.hero-img', {
                scale: 2,
                duration: 1,
                ease: "power3.out"
            }, "start+=2.5")

            // =============================
            // ✨ TEXT REVEAL
            // =============================
            tl.to(split.chars, {
                y: "0%",
                autoAlpha: 1,
                duration: 1.2,
                stagger: 0.02,
                ease: "hop"
            }, "start+=2.6")

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className='hero relative w-full h-screen overflow-hidden bg-black text-white'
        >

            {/* =============================
          🔲 PRELOADER
      ============================== */}
            <div className="hero-overlay absolute z-50 w-full h-screen  flex flex-col justify-between p-8">

                <div className="overlay-text-container absolute top-8 left-8 h-8 overflow-hidden text-sm uppercase tracking-widest font-mono text-gray-400">
                    <div className="overlay-text flex flex-col will-change-transform">
                        <p className='h-8 flex items-center m-0'>structure</p>
                        <p className='h-8 flex items-center m-0'>design identity</p>
                        <p className='h-8 flex items-center m-0'>welcome</p>
                    </div>
                </div>

                <div className="counter absolute right-8 bottom-8 text-white">
                    <h1 className='text-[4rem] md:text-[8rem] font-medium leading-none m-0'>0</h1>
                </div>
            </div>

            {/* =============================
          🖼️ IMAGES
      ============================== */}
            <div className="hero-images absolute top-[50%] w-full -translate-y-1/2 px-4 md:px-8 flex flex-row flex-wrap md:flex-nowrap justify-center items-center gap-[5vw] will-change-[gap]">

                <Image className='img w-[20vw] md:w-[15vw] h-[30vh] object-cover rounded-md'
                    src={'/preloader1-scaled.jpg'} width={300} height={400} alt='img1' priority />

                <Image className='img w-[20vw] md:w-[15vw] h-[30vh] object-cover rounded-md'
                    src={'/preloader2-scaled.jpg'} width={300} height={400} alt='img2' />

                <Image className='img hero-img w-[40vw] md:w-[20vw] h-[40vh] object-cover rounded-md z-10'
                    src={'/preloader3-scaled.jpg'} width={400} height={500} alt='hero' priority />

                <Image className='img w-[20vw] md:w-[15vw] h-[30vh] object-cover rounded-md'
                    src={'/preloader4-scaled.jpg'} width={300} height={400} alt='img4' />

                <Image className='img w-[20vw] md:w-[15vw] h-[30vh] object-cover rounded-md'
                    src={'/preloader5-scaled.jpg'} width={300} height={400} alt='img5' />

            </div>

            {/* =============================
          🧠 TITLE
      ============================== */}
            <div className="hero-header absolute bottom-12 w-full z-20 pointer-events-none px-4">
                <h1 className='uppercase text-center text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none m-0 text-white drop-shadow-md opacity-0'>
                    Abhay Kumar
                </h1>
            </div>

        </section>
    )
}

export default Hero