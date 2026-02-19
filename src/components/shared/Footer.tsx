"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copiedPhone, setCopiedPhone] = useState(false);

  const footerIndustries = [
    {
      name: "Smart Manufacturing",
      link: "smart-manufacturing",
    },
    {
      name: "Logistics & Supply Chain",
      link: "logistics-supply-chain",
    },
    {
      name: "Energy & Utilities",
      link: "energy-utilities",
    },
    {
      name: "Automotive & Transportation",
      link: "automotive-transportation",
    },
    {
      name: "Aerospace & Defense",
      link: "aerospace-defense",
    },
    {
      name: "Smart Buildings & Infrastructure",
      link: "smart-buildings-infrastructure",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://facebook.com/share/1DMVcQZtNu/",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com/company/Verxeon/",
    },
    { name: "X", icon: FaXTwitter, href: "https://x.com/Devsol_ai" },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com/Verxeon.ai/",
    },
  ];

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText("+92 318 1685611");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Interested in Verxeon Services");
    const body = encodeURIComponent(
      "Interested in Verxeon! I would like to know more about your services."
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=contact@verxeon.com&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <footer className="relative bg-[#08273b] text-white overflow-hidden lg:m-5 lg:rounded-lg">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Quick Links */}
          <div className="space-y-4 order-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/industries"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Industries we Serve
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 order-3">
            <h3 className="text-lg font-semibold text-white">Industries we Serve</h3>
            <ul className="space-y-2">
              {footerIndustries.map((name) => (
                <li key={name.name}>
                  <Link
                    href={`/industries/${name.link}`}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {name.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4 order-4 lg:order-3">
            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
            <div className="space-y-3">
              <div className="relative">
                <button
                  onClick={handlePhoneCopy}
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors cursor-pointer group"
                >
                  <IoMdCall className="h-5 w-5" />
                  <span className="text-sm md:text-base">+92 318 1685611</span>
                </button>
                {copiedPhone && (
                  <div className="absolute left-0 -top-8 bg-white text-[#08273b] px-3 py-1 rounded text-xs font-medium shadow-lg">
                    Copied!
                  </div>
                )}
              </div>
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                <MdEmail className="h-5 w-5" />
                <span className="text-sm md:text-base">
                  contact@verxeon.com
                </span>
              </button>
            </div>
            <div className="pt-2">
              <Link
                href="/contact?tab=consultation"
                className="inline-flex items-center justify-center rounded-lg border border-white/100 bg-white/5 hover:bg-white/10 text-white px-4 py-2 text-sm md:text-base transition-colors"
              >
                Book a Meeting
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 sm:col-span-2 lg:col-span-1 order-5"
          >
            <h3 className="text-lg font-semibold text-white ">
              Join Our Newsletter
            </h3>
            <p className="text-white/80 mb-3 text-sm md:text-base">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="relative w-full max-w-xl">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full h-11 md:h-12 rounded-lg pl-4 pr-28 bg-white text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none"
                aria-label="Email address"
              />
              <button
                className="absolute right-1 top-1 bottom-1 rounded-lg px-3 md:px-4 text-white text-sm md:text-base font-semibold tracking-wide bg-[#08273b] hover:opacity-95 active:opacity-90 transition-opacity"
                type="button"
              >
                SUBMIT
              </button>
            </div>
          </motion.div>
        </div>

        {/* Social icons row above divider */}
        <div className="mt-6 md:mt-8 flex justify-end">
          <div className="flex items-center gap-4 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
            <span className="text-white/70 text-sm">Follow Us</span>
            <div className="flex items-center gap-5 flex-nowrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white flex-shrink-0"
                >
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-4 md:pt-6 mt-6 md:mt-8">
          <div className="text-center">
            <p className="text-white/70 text-xs md:text-sm">
              © {currentYear} Verxeon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
