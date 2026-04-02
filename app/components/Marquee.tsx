"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { type FC, useMemo, useRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import gsapIcon from "../../public/gsap.svg"
import nextIcon from "../../public/next.svg"
import reactIcon from "../../public/react.svg";
import tailwindIcon from "../../public/tailwind.svg";
import threeIcon from "../../public/three.svg";
import typescriptIcon from "../../public/typescript.svg";
import webGLIcon from "../../public/webgl.svg";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  isReversed?: boolean;
  className?: string;
};

const TECHNOLOGY_ICONS: StaticImageData[] = [
  gsapIcon,
  nextIcon,
  webGLIcon,
  reactIcon,
  tailwindIcon,
  threeIcon,
  typescriptIcon,
];

const ELEMENTS = [...TECHNOLOGY_ICONS, ...TECHNOLOGY_ICONS];

const Marquee: FC<Props> = ({ isReversed = false, className }) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | null>(null);

  useGSAP(() => {
    if (!movingContainer.current) return;

    const el = movingContainer.current;

    const setupInfiniteMarqueeTimeline = () => {
      gsap.set(el, {
        xPercent: isReversed ? -50 : 0,
      });

      timeline.current = gsap.timeline({
        defaults: { ease: "none" },
        repeat: -1,
        paused: true,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => timeline.current?.play(),
          onLeave: () => timeline.current?.pause(),
          onEnterBack: () => timeline.current?.play(),
          onLeaveBack: () => timeline.current?.pause(),
        },
      }).to(el, {
        xPercent: isReversed ? 0 : -50,
        duration: 20,
      });
    };

    setupInfiniteMarqueeTimeline();
  }, { dependencies: [isReversed] });

  const timelineTimeScaleTween = useRef<GSAPTween | null>(null);

  const onPointerEnter = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  const list = useMemo(
    () => (
      <div className="flex w-fit items-center gap-10">
        {ELEMENTS.map((src, index) => {
          const isLast = index === ELEMENTS.length - 1;
          return (
            <div
              key={index}
              className={twJoin(
                "relative flex shrink-0 items-center justify-center",
                isLast && "mr-10"
              )}
              style={{ height: src.height, width: src.width }}
            >
              <Image
                src={src}
                alt="technologies icon"
                height={40}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    ),
    []
  );

  return (
    <div
      className={twMerge("w-full max-w-[100vw] select-none overflow-hidden", className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      <div ref={movingContainer} className="flex w-fit">
        {list}
        {list}
      </div>
    </div>
  );
};

export default Marquee;