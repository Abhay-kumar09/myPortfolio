'use client'
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta py-20">
            <div className="container">
               <div className="wrapper flex justify-center mx-auto items-center max-w-5xl w-full">
                  <Link href="mailto:abhaydec48@gmail.com" className="button button--bestia">
                    <div className="button_bg"></div>
                     <div className="content-holder block relative overflow-hidden">
                        <span className="first text-[40px] text-center text-[#fff]">Let’s Talk</span>
                        <span className="second absolute! text-[40px] top-full text-center ">Let’s Talk</span>
                     </div>
                  </Link>
               </div>
            </div>
        </section>
    )
}

export default Cta;