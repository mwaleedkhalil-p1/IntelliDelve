import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const solutionsServices = [
    {
      name: "Background Screening and Risk Mitigation",
      href: "/solutions/background-screening",
    },
    {
      name: "Corporate Due Diligence and Risk Compliance",
      href: "/solutions/corporate-due-diligence",
    },
    {
      name: "AI and Data Science Solutions",
      href: "/solutions/ai-data-science",
    },
    {
      name: "Tech and Innovation Services",
      href: "/solutions/tech-innovation",
    },
  ];

  const weAreDelvers = [
    { name: "About Us", href: "/about" },
    { name: "Our Clients", href: "/clients" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Industries", href: "/industries" },
    { name: "Careers", href: "/careers" },
    { name: "Partner", href: "/partners" },
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/intellidelve",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/intellidelve",
    },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="https://cdn.builder.io/api/v1/assets/81cccb29f2444c41b07efa4cabfb0846/logo-4ec879?format=webp&width=800"
                alt="IntelliDelve"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A Background Checker Company™
            </p>
            <p className="text-gray-400 text-sm mb-6">
              IntelliDelve is a global risk management and background
              investigation firm that offers comprehensive verification services
              worldwide. We specialize in providing security and verification
              solutions to companies, helping them make informed decisions while
              mitigating risks during the recruitment process.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Our AI-driven platform combines cutting-edge technology with human
              expertise to deliver accurate, efficient, and compliant background
              screening solutions. We serve businesses across multiple
              industries, ensuring the highest standards of due diligence and
              risk assessment.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-primary">
              Solutions & Services
            </h3>
            <ul className="space-y-3">
              {solutionsServices.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-primary">
              We Are Delvers
            </h3>
            <ul className="space-y-3">
              {weAreDelvers.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-primary">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm font-secondary">
              <li>Tel: +92 333 000 1456</li>
              <li>Tel: +92 51 612 3383</li>
              <li>Sales@intellidelve.com</li>
              <li>info@intellidelve.com</li>
            </ul>
            <div className="mt-6">
              <Link
                to="/privacy-policy"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary dark:text-accent" />
              <span className="text-gray-300 font-secondary">
                sales@intellidelve.com
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary dark:text-accent" />
              <span className="text-gray-300 font-secondary">
                +92 333 000 1456
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary dark:text-accent" />
              <span className="text-gray-300 font-secondary">
                Islamabad, Pakistan
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm font-secondary">
            Copyright 2022 © All Right Reserved by IntelliDelve
          </p>
        </div>
      </div>
    </footer>
  );
}
