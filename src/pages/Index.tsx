import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import ServiceCoverage from "@/components/ServiceCoverage";
import Fleet from "@/components/Fleet";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Contact />
        <Stats />
        <About />
        <Clients />
        <ServiceCoverage />
        <Fleet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
