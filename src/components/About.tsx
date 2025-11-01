import { Truck, Users, MapPin, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Modern Fleet",
    description: "State-of-the-art refrigerated vehicles equipped with advanced temperature control systems",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Professional drivers with extensive experience in handling temperature-sensitive cargo",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "GPS tracking system for complete visibility of your shipment throughout the journey",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Strict adherence to cold chain standards and quality control procedures",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        {/* Founder Info */}
        <div className="mb-20 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Founders</h2>
          <Card className="max-w-3xl mx-auto border-2 shadow-md">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center">
                <div className="mb-4 p-6 bg-primary/10 rounded-full">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Amit Tharwani & GautamSinh Vaghela
                </h3>
                <p className="text-muted-foreground mb-3 font-semibold">
                  Founders & Managing Directors
                </p>
                <p className="text-foreground max-w-2xl">
                  Leading JN Logistics with years of expertise in cold chain transportation
                  and logistics management, committed to delivering excellence in every shipment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About JN Logistics
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Established in the year 2017, JN Logistics has garnered a respectable name for itself in the domain of providing temperature controlled reefer trucks services to its various clients ranging from Amul, Food Asia, Snowman Logistics, etc. Over the years, we have grown into a vast organization.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              All the operations are handled by GautamSinh Vaghela, who is having more than 5 years of experience in logistics industry. Our head office is located at Bhat near by Gandhinagar, capital of Gujarat.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide realtime monitoring of your goods along with location of in-transit truck as well as temperature of the container. Always on the cusp of innovation, we provide solution to Real-time problems for dairy sector, food sector, hospitality sector & pharmacy sector using temperature controlled system and highly accurate tracking system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-3 p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
