import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    { name: "Blogs", href: "/blogs" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Industries", href: "/industries" },
    { name: "Careers", href: "/careers" },
  ];

  const collaborateWithUs = [{ name: "Partner", href: "/partners" }];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/intellidelve",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com/intellidelve",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/intellidelve",
    },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/logo.png" alt="IntelliDelve" className="h-10 w-auto" />
            </div>

            <p className="text-gray-400 text-sm mb-6">
              IntelliDelve empowers organizations with intelligent background
              screening, fraud detection, and compliance solutions across 100+
              countries. Our AI-driven platform also delivers cutting-edge data
              science and IT innovations for smarter, faster decisions.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <Link
                to="/privacy-policy"
                onClick={scrollToTop}
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                onClick={scrollToTop}
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
              >
                Cookies
              </Link>
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
                    onClick={scrollToTop}
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
                    onClick={scrollToTop}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-secondary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-primary">Members</h3>
            <div className="flex space-x-4">
              <img
                src="/images/Members_Images/FBR.png"
                alt="Member 1"
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
              />
              <img
                src="/images/Members_Images/PBSA.png"
                alt="Member 2"
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
              />
              <img
                src="/images/Members_Images/SECP.png"
                alt="Member 3"
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-primary">
              Contact Us
            </h3>
            <h6 className="text-gray-400 text-sm mb-2 font-secondary">
              All inquiries are responded to within 24 hours.
            </h6>
            <ul className="space-y-3 text-gray-300 text-sm font-secondary">
              <li className="font-bold">For inquiries:</li>
              <li>info@intellidelve.com</li>

              <li className="font-bold">For Sales:</li>
              <li>sales@intellidelve.com</li>

              <li className="font-bold">For Verification Purposes: </li>
              <li>verify@intellidelve.com </li>

              <li className="font-bold">For Contact: </li>
              <li>Tel: +92 333 000 1456</li>
              <li>Tel: +92 51 612 3383</li>
              <li>Tel: +61 415 55 8159</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm font-secondary">
            Copyright 2022 © All Right Reserved by IntelliDelve
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
