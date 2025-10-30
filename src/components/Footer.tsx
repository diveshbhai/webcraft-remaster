import logo from "@/assets/jn-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="JN Logistics" className="h-12 w-auto" />
            <span className="text-2xl font-bold">JN LOGISTICS</span>
          </div>
          <p className="text-primary-foreground/80 text-center">
            Professional Refrigerated Van Services | Cold Chain Transportation
          </p>
          <p className="text-primary-foreground/80 text-sm">
            GST: 24AHOPT2830N1ZT
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="tel:+919924848030" className="hover:text-secondary transition-colors">
              +91 9924848030
            </a>
            <span className="text-primary-foreground/40">|</span>
            <a href="tel:+919924848039" className="hover:text-secondary transition-colors">
              +91 9924848039
            </a>
            <span className="text-primary-foreground/40">|</span>
            <a href="mailto:jnlogistics48@gmail.com" className="hover:text-secondary transition-colors">
              jnlogistics48@gmail.com
            </a>
          </div>
          <div className="text-sm text-primary-foreground/60 text-center">
            <p>&copy; {new Date().getFullYear()} JN Logistics. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
