import type { Metadata } from "next";
const helvetica = { className: "font-sans" };
import "./globals.css";
import { Header } from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Homepage - Abhay Kumar",
  description: "My Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helvetica.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
