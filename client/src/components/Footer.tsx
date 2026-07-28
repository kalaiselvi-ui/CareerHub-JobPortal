import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaGithub, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFFFF] text-surface-dark border-t border-border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center">
              {" "}
              <img
                src={logo}
                alt="logo"
                className="w-36 h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Connecting talented professionals with top companies across the
              world.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-surface-light rounded-full text-slate-600 hover:text-primary-hover hover:bg-blue-50 transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 bg-[#3d95ee] rounded-full text-slate-600 hover:text-primary-hover hover:bg-blue-50 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 bg-surface-light rounded-full text-slate-600 hover:text-primary-hover hover:bg-blue-50 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-surface-light rounded-full text-slate-600 hover:text-primary-hover hover:bg-blue-50 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-surface-dark mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2.5 text-sm">
              <Link
                to="/"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Jobs
              </Link>
              <Link
                to="/companies"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Companies
              </Link>
              <Link
                to="/about"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-base font-semibold text-surface-dark mb-4">
              Job Categories
            </h3>
            <nav className="flex flex-col space-y-2.5 text-sm">
              <Link
                to="/jobs?category=frontend"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Frontend Developer
              </Link>
              <Link
                to="/jobs?category=backend"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Backend Developer
              </Link>
              <Link
                to="/jobs?category=fullstack"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                Full Stack Developer
              </Link>
              <Link
                to="/jobs?category=uiux"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                UI/UX Designer
              </Link>
              <Link
                to="/jobs?category=devops"
                className="text-slate-600 hover:text-primary-hover transition-colors"
              >
                DevOps Engineer
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-base font-semibold text-surface-dark mb-4">
              Contact
            </h3>
            <address className="not-italic flex flex-col space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:support@careerhub.com"
                  className="hover:text-primary-hover transition-colors"
                >
                  support@careerhub.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+97141234567"
                  className="hover:text-primary-hover transition-colors"
                >
                  +971 4 123 4567
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CareerHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="hover:text-primary-hover transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-primary-hover transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
