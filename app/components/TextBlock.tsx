'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

const TextBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      // ✅ Split text
      const split = new SplitType('.textblock h3', {
      types: 'words,chars'
      })

      // ✅ Initial state (hidden below)
      gsap.set(split.chars, {
        y: '100%',
        autoAlpha: 0
      })

      gsap.set(split.words, {
        overflow: 'hidden',
        display: 'inline-block'
      })

      // ✅ Scroll animation
      gsap.to(split.chars, {
        y: '0%',
        autoAlpha: 1,
        stagger: 0.02,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',   // when section enters
          end: 'top 30%',
          toggleActions: 'play none none none',
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className='textblock py-25 overflow-hidden'>
      <div className="main-container">
        <h3 className='text-[7rem] font-normal leading-tight'>
          I am a creative director with a passion for fashion, design and
          cosmetics, transforming trends into unforgettable campaign.
        </h3>
      </div>
    </section>
  )
}

export default TextBlock