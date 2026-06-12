import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import About       from "@/components/About";
import HowItWorks  from "@/components/HowItWorks";
import ModelStats  from "@/components/ModelStats";
import Demo        from "@/components/Demo";
import TechStack   from "@/components/TechStack";
import Footer      from "@/components/Footer";
import PageLoader  from "@/components/PageLoader";

export default function Home() {
  return (
    <PageLoader>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <ModelStats />
      <Demo />
      <TechStack />
      <Footer />
    </PageLoader>
  );
}