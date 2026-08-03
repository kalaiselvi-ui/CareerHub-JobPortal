import React, { useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore.ts";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
  ];

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold"
        : "text-surface-dark hover:text-primary"
    }`;

  const mobileLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `block py-2 text-base font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold"
        : "text-surface-dark hover:text-primary"
    }`;

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="w-20">
            <img src={logo} alt="logo" className="object-cover h-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={linkStyles}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-dark/5 transition-colors text-surface-dark focus:outline-none"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                    {user?.fullName ? (
                      user.fullName.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <span className="text-sm font-medium">
                    {user?.fullName || "Account"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-surface-dark/60 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border-subtle py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-dark hover:bg-surface-dark/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-surface-dark/60" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-dark hover:bg-surface-dark/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-surface-dark/60" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/applications"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-dark hover:bg-surface-dark/5 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-surface-dark/60" />
                      <span>Applications</span>
                    </Link>

                    <Link
                      to="/saved-jobs"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-dark hover:bg-surface-dark/5 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-surface-dark/60" />
                      <span>Saved Jobs</span>
                    </Link>

                    <div className="my-1 border-t border-border-subtle" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-surface-dark hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-md transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 rounded-md text-surface-dark hover:text-primary hover:bg-surface-light focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface-light">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={mobileLinkStyles}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-surface-dark border border-border-subtle rounded-md bg-white hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
