import { Snowflake, Clock, Route, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Snowflake,
    title: "Temperature Controlled Transport",
    description:
      "Maintain optimal temperature for your perishable goods throughout the journey. Our refrigerated vans ensure your products stay fresh from pickup to delivery.",
    features: [
      "Temperature monitoring",
      "Multi-temperature zones",
      "Real-time alerts",
    ],
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description:
      "Round-the-clock availability for urgent deliveries and time-sensitive shipments. We understand that fresh goods can't wait.",
    features: [
      "Emergency deliveries",
      "Night transport",
      "Weekend service",
    ],
  },
  {
    icon: Route,
    title: "Flexible Routes",
    description:
      "Customized delivery routes to meet your specific transportation needs. We adapt to your schedule and requirements.",
    features: [
      "Custom routing",
      "Multiple stops",
      "Express delivery",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cold chain logistics solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-4 p-4 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
