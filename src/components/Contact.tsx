import { Phone, Mail, MapPin, Send, FileText, Thermometer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  type: z.enum(["cold", "dry"], { required_error: "Please select type" }),
  pickupAddress: z.string().min(1, "Pickup address is required").max(200, "Address must be less than 200 characters"),
  dropAddress: z.string().min(1, "Drop address is required").max(200, "Address must be less than 200 characters"),
  phone: z.string().min(10, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  companyName: z.string().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  size: z.string().min(1, "Vehicle size is required"),
  temperature: z.string().optional(),
}).refine((data) => {
  if (data.type === "cold" && !data.temperature) {
    return false;
  }
  return true;
}, {
  message: "Temperature is required for cold goods",
  path: ["temperature"],
});

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+91 9924848030", "+91 9924848039"],
    links: ["tel:+919924848030", "tel:+919924848039"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["jnlogistics48@gmail.com"],
    links: ["mailto:jnlogistics48@gmail.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["E-201, Narayan Avenue,", "Bhat, Gandhinagar - 382428"],
    links: ["https://www.google.com/maps/search/?api=1&query=E-201,+Narayan+Avenue,+Bhat,+Gandhinagar+-+382428"],
  },
  {
    icon: FileText,
    title: "GST Number",
    details: ["24AHOPT2830N1ZT"],
    links: [""],
  },
];

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "cold",
      pickupAddress: "",
      dropAddress: "",
      phone: "",
      companyName: "",
      size: "",
      temperature: "",
    },
  });

  const transportType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Save to database with mapped fields
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: values.companyName,
          email: "no-reply@jnlogistics.com", // Default email
          phone: values.phone,
          service: values.type === "cold" ? "temperature-controlled" : "dry-goods",
          goods_type: values.type,
          temperature: values.temperature,
          message: `Pickup: ${values.pickupAddress}\nDrop: ${values.dropAddress}\nSize: ${values.size}`,
        });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Request sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error: any) {
      console.error("Error sending request:", error);
      toast({
        title: "Error sending request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Truck className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Get Estimate
              </h2>
            </div>
            <p className="text-muted-foreground">
              Quick quote for your transportation needs
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="border-2 shadow-xl animate-scale-in bg-card">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Type Select */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-input bg-background">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cold">COLD GOODS (REEFER LOGISTICS)</SelectItem>
                            <SelectItem value="dry">DRY GOODS</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pickup Address */}
                  <FormField
                    control={form.control}
                    name="pickupAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Pickup Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Pickup Address"
                            className="h-12 border-input bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Drop Address */}
                  <FormField
                    control={form.control}
                    name="dropAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Drop Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Drop Address"
                            className="h-12 border-input bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mobile Number */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Mobile Number
                        </FormLabel>
                        <div className="flex">
                          <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md border-input bg-muted text-muted-foreground">
                            +91
                          </div>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter Mobile Number"
                              className="h-12 rounded-l-none border-input bg-background"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company Name */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Company Name"
                            className="h-12 border-input bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Size */}
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide">
                          Size (Vehicle)
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-input bg-background">
                              <SelectValue placeholder="Select Vehicle Size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small (Upto 7 ft)</SelectItem>
                            <SelectItem value="medium">Medium (14 ft)</SelectItem>
                            <SelectItem value="large">Large (17 ft)</SelectItem>
                            <SelectItem value="xlarge">Extra Large (19 ft)</SelectItem>
                            <SelectItem value="custom">Custom Size</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Temperature - Only for Cold Goods */}
                  {transportType === "cold" && (
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                            <Thermometer className="h-4 w-4" />
                            Temperature Required
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., -18°C, 2-8°C"
                              className="h-12 border-input bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold bg-destructive hover:bg-destructive/90 text-white"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Info Below Form */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border hover:shadow-md transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">
                          {info.links[idx] ? (
                            <a
                              href={info.links[idx]}
                              className="hover:text-primary transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
