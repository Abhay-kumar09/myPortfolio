import Link from "next/link"

const Footer = () => {
  return (
   <footer className='footer py-10'>
    <div className="container">
        <div className="wrapper flex flex-wrap justify-between items-center">
            <div className="link-wrapper flex flex-wrap gap-4">
                 <div className="link-wrap">
                    <Link href={'/'} className="uppercase">Instagram</Link>
                 </div>
                <div className="link-wrap">
                    <Link href={'/'} className="uppercase text-[20px]">Linkedin</Link>
                 </div>
                 <div className="link-wrap">
                    <Link href={'/'} className="uppercase text-[20px]">Github</Link>
                 </div>
            </div>
            <div className="privacy-wrap">
                <p>@ 2026 Abhay Kumar</p>
            </div>
        </div>
    </div>
   </footer>
  )
}

export default Footer