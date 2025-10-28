import { Award, TrendingUp, Clock, Users } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "8+",
    label: "Years Experience",
  },
  {
    icon: Award,
    value: "1000+",
    label: "Successful Deliveries",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Service Availability",
  },
  {
    icon: Users,
    value: "100%",
    label: "Customer Satisfaction",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
