'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export const Header = () => {

    const headerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(headerRef.current, { opacity: 0 })

            gsap.to(headerRef.current, {
                opacity: 1,
                duration: 3,
                delay: 3 // sync with your loader
            })

            gsap.to('.wrapper a', {
                y: 0,
                duration: 3,
                delay: 3,
                ease: "power3.inOut"
            })

        }, headerRef)

        return () => ctx.revert()
    }, [])

    return (
        <header ref={headerRef} className='fixed w-full z-[100]'>
            <div className="container">
                <div className="wrapper py-[1rem] flex justify-between items-start">
                    <div className="logo-wrap">
                        <Link href={'/'}>Abhay Kumar</Link>
                    </div>
                    <div className="nav-items">
                        <ul className='flex flex-col items-end'>
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link href={'/about'}>About</Link>
                            </li>
                            <li>
                                <Link href={'/contact'}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
