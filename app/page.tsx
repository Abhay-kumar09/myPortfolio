import Hero from "./components/Hero";
import TextBlock from "./components/TextBlock";
import Marquee from "./components/Marquee";
import VideoBlock from "./components/VideoBlock";
import GuidingPrinciples from "./components/GuidingPrinciples";
import Projects from "./components/Projects"
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function Home() {
  const textData = [
    { text: "I am a creative director with a passion for fashion, design and cosmetics, transforming trends into unforgettable campaigns." },
  ]
  const boxdata = [
    { text: "My approach combines strategic planning with a deep understanding of advertising dynamics, allowing me to create campaigns that not only capture attention, but also make an emotional impact." },
  ]
  return (
    <>
      <Hero />
      <TextBlock data={textData} />
      <Marquee />
      <VideoBlock />
      <TextBlock data={boxdata} />
      <GuidingPrinciples />
      <Projects />
      <Cta />
      <Footer />
    </>
  );
}
