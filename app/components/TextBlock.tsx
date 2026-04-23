'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { editorial } from '@/lib/fonts/page'

type TextItem = {
  text: string
}

type TextBlockProps = {
  data: TextItem[]
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const splits: SplitType[] = []

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLHeadingElement>('h3')

      headings.forEach((heading) => {
        const split = new SplitType(heading, {
          types: 'words,chars'
        })

        splits.push(split)

        gsap.set(split.words, {
          overflow: 'hidden',
          display: 'inline-block'
        })

        gsap.set(split.chars, {
          yPercent: 100,
          opacity: 0
        })

        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 60%',
            toggleActions: 'play none none none',
          }
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
      splits.forEach((split) => split.revert())
    }
  }, [data]) // ✅ re-run if data changes

  return (
    <section ref={containerRef} className="textblock py-25 overflow-hidden">
      <div className="main-container space-y-10">
        {data.map((item, i) => (
          <h3
            key={i}
            className={`${editorial.className} text-[4vw] font-normal leading-tight`}
          >
            {item.text}
          </h3>
        ))}
      </div>
    </section>
  )
}

export default TextBlock