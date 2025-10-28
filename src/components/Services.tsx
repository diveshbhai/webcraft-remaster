import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const services = [
  "Frozen/Chilled Transportation Services",
  "Interstate Small Reefer Truck Transportation",
  "Dairy Product Transportation",
  "Farmfresh Products Transportation",
  "Bio Tech Product Transportation",
  "Pharma Product Carriers",
  "Poultry Product Transportation",
  "Blood Plasma Transportation",
  "Ice Cream Transportation",
  "Clinic Trail Samples Transportation",
  "Frozen Product Transportation",
  "Container Transportation Services",
  "Full Truck Load Service",
];

const coverageFeatures = [
  "Point to Point Full Truck Load Service",
  "Customized door to door and dedicated runs",
  "Inter state/city and long haul runs",
  "Chilled frozen and ambient movement",
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            What We Do?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We are best known and recognized for temperature sensitive consignments including dairy, food, pharmacy and hospitality sector & accurate real time GPS tracking of trucks.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center mb-4">
                Transportation Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-2 shadow-lg bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center mb-4">
                Transportation Services Covers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coverageFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-3 w-3 rounded-full bg-primary-foreground" />
                    </div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
