import { Phone, Mail, MapPin, Send, FileText, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  service: z.string().min(1, "Please select a service"),
  goodsType: z.enum(["dry", "cold"], { required_error: "Please select goods type" }),
  temperature: z.string().optional(),
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
}).refine((data) => {
  if (data.goodsType === "cold" && !data.temperature) {
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
      name: "",
      email: "",
      phone: "",
      service: "",
      goodsType: "dry",
      temperature: "",
      message: "",
    },
  });

  const goodsType = form.watch("goodsType");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: values,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for all your refrigerated transportation needs
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-3">{info.title}</CardTitle>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            {info.links[idx] ? (
                              <a
                                href={info.links[idx]}
                                className="hover:text-primary transition-colors font-medium"
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
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 border-2 shadow-lg animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us A Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Name" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Your Email" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" placeholder="Your Phone" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Service Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="temperature-controlled">
                                Temperature Controlled Transport
                              </SelectItem>
                              <SelectItem value="emergency">Emergency Delivery</SelectItem>
                              <SelectItem value="contract">Contract Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="goodsType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">Goods Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dry" id="dry" />
                              <Label htmlFor="dry" className="cursor-pointer font-normal">
                                Dry Goods
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cold" id="cold" />
                              <Label htmlFor="cold" className="cursor-pointer font-normal">
                                Cold Goods (Refrigerated)
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {goodsType === "cold" && (
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4" />
                            Required Temperature
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., -18°C, 2-8°C, or specify your requirement"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Your Message / Requirements"
                            rows={6}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
