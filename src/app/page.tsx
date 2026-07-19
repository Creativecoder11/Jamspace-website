import { Hero } from "@/components/sections/home/Hero";
import { About } from "@/components/sections/home/About";
import { Stats } from "@/components/sections/home/Stats";
import { Services } from "@/components/sections/home/Services";
import { Projects } from "@/components/sections/home/Projects";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { VideoShowcase } from "@/components/sections/home/VideoShowcase";
import { Marquee } from "@/components/sections/home/Marquee";
import { Blog } from "@/components/sections/home/Blog";
import { CTA } from "@/components/sections/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Projects />
      <Testimonials />
      <VideoShowcase />
      <Marquee />
      <Blog />
      <CTA />
    </>
  );
}
