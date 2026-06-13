'use client'

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('video-expanded');
    if (completed === 'true') {
      setIsAnimated(true);
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || isAnimated) return;

    gsap.to(containerRef.current, {
      width: '90vw',
      height: '90vh',
      borderRadius: '0px',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        once: true,
        onLeave: () => {
          localStorage.setItem('video-expanded', 'true');
          setIsAnimated(true);
        },
      },
    });
  }, [isAnimated]);

  return (
    <section className="mx-auto py-37.5 flex justify-center items-center w-full overflow-hidden">
      <div
        ref={containerRef}
        className={`overflow-hidden relative ${
          isAnimated
            ? 'w-[90vw] h-[90vh] rounded-none'
            : 'w-75 h-75 sm:w-200 sm:h-100 max-w-[90vw] rounded-3xl'
        }`}
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
  );
};

export default VideoBlock;