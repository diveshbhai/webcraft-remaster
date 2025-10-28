import truck1 from "@/assets/truck-1.jpg";
import truck2 from "@/assets/truck-2.jpg";
import { Card } from "@/components/ui/card";

const Fleet = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Our Modern Fleet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art refrigerated trucks equipped with advanced temperature control systems
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={truck1} 
              alt="JN Logistics refrigerated truck with temperature control"
              className="w-full h-auto"
            />
          </Card>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={truck2} 
              alt="JN Logistics insulated cargo truck for cold chain transportation"
              className="w-full h-auto"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
