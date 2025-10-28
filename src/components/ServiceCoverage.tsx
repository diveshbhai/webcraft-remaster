import serviceMap from "@/assets/service-map.jpg";

const ServiceCoverage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Pan-India Service Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our extensive network covers major cities and routes across India, ensuring your goods reach every corner of the country
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <img 
            src={serviceMap} 
            alt="JN Logistics service coverage map showing pan-India delivery network"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage;
