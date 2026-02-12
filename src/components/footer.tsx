import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SimpleCounter from "./visitor-counter";

const Footer = () => {
  const quickLinks = ["About Us", "Rooms", "Events", "Gallery"];

  const contactInfo = [
    { icon: <Phone size={20} />, text: "+63 9758569236" },
    { icon: <Mail size={20} />, email: "hiddenbrooke@gmail.com" },
    {
      icon: <MapPin size={20} />,
      text: "Upper Bunguiao, Waray-Waray, Zamboanga City",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={24} />, label: "Facebook" },
    { icon: <Instagram size={24} />, label: "Instagram" },
    { icon: <Youtube size={24} />, label: "YouTube" },
  ];

  return (
    <footer className="bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-400 to-teal-300 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  <Image
                    src="/logo/brooke.png"
                    width={50}
                    height={50}
                    alt="log"
                  />
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold font-[Style_Script] tracking-wider text-yellow-300">
                  HiddenBrooke
                </h2>
                <p className="text-blue-200 text-sm">RESORT</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              A luxury resort where nature meets elegance. Experience
              unparalleled comfort and breathtaking views.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="/not-found"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-linear-to-r from-blue-600 to-teal-600 rounded-lg">
                    {info.icon}
                  </div>
                  <p className="text-gray-300">
                    {info.email} {info.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            {/* © 2024{new Date().getFullYear()} HiddenBrooke Resort All rights */}
            © 2024 HiddenBrooke Resort All Rights Reserved. |{" "}
            <span className="tracking-wider font-extralight text-sm text-orange-500">
              <code>RYU | WebDev</code>
            </span>
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/not-found">Privacy Policy</Link>

            <Link
              href="/not-found"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/not-found"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400 flex items-center justify-center">
            Made with{" "}
            <Heart size={16} className="mx-2 text-red-400 animate-pulse" />
            for our valued guests
          </p>

          <SimpleCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
