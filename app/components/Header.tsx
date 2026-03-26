import React from 'react'
import Link from 'next/link'

export const Header = () => {
    return (
        <header className='fixed w-full p-[2rem] z-99'>
            <div className="container">
                <div className="wrapper flex justify-between items-start">
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
