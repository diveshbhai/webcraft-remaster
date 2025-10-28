import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-truck.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="JN Logistics Trucks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            JN LOGISTICS
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-4 font-semibold">
            Refrigerated Van Owners & Contractors
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Professional cold chain transportation services for your perishable goods.
            Trusted, reliable, and available 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={scrollToServices}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8"
            >
              Our Services
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">Call us now</p>
                <a
                  href="tel:+919924848030"
                  className="text-lg font-semibold hover:text-secondary transition-colors"
                >
                  +91 9924848030
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">Alternate number</p>
                <a
                  href="tel:+919924848039"
                  className="text-lg font-semibold hover:text-secondary transition-colors"
                >
                  +91 9924848039
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
