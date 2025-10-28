import clientLogos from "@/assets/client-logos.png";

const Clients = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Our Trusted Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We proudly serve leading brands across India with our reliable cold chain logistics services
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <img 
            src={clientLogos} 
            alt="Our clients including Amul, US Pizza, Aarti Industries, Britannia, West-Coast, Bunge, Schmitten, Mangalam Drugs, and McCain"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
