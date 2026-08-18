import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  Users,
  X,
  PlusCircle,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore.ts";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  /*
   * Role-based dropdown menu
   */
  const getDropdownItems = () => {
    if (user?.role === "admin") {
      return [
        {
          label: "Admin Dashboard",
          path: "/admin/dashboard",
          icon: ShieldCheck,
        },
        {
          label: "Manage Jobs",
          path: "/jobs/manage",
          icon: BriefcaseBusiness,
        },
        {
          label: "Manage Users",
          path: "/users/manage",
          icon: Users,
        },
        {
          label: "Categories",
          path: "/categories/manage",
          icon: FileText,
        },
        {
          label: "Profile",
          path: "/profile",
          icon: User,
        },
      ];
    }

    if (user?.role === "recruiter") {
      return [
        {
          label: "Recruiter Dashboard",
          path: "/recruiter/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "My Jobs",
          path: "/recruiter/jobs",
          icon: BriefcaseBusiness,
        },
        {
          label: "Create Job",
          path: "/jobs/create",
          icon: PlusCircle,
        },
        {
          label: "Profile",
          path: "/profile",
          icon: User,
        },
      ];
    }

    // Candidate
    return [
      {
        label: "Dashboard",
        path: "/candidate/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Applications",
        path: "/candidate/my-applications",
        icon: FileText,
      },
      {
        label: "Saved Jobs",
        path: "/saved-jobs",
        icon: Bookmark,
      },
      {
        label: "Profile",
        path: "/profile",
        icon: User,
      },
    ];
  };

  const dropdownItems = getDropdownItems();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate("/login");
  };

  const handleMobileNavigation = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="w-20">
            <img src={logo} alt="logo" className="object-cover h-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={linkStyles}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Button */}
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
                    className={`w-4 h-4 text-surface-dark/60 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border-subtle py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Role */}
                    <div className="px-4 py-2 border-b border-border-subtle mb-1">
                      <p className="text-xs text-surface-dark/50 capitalize">
                        {user?.role}
                      </p>
                    </div>

                    {dropdownItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-surface-dark hover:bg-surface-dark/5 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-surface-dark/60" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}

                    {/* Logout */}
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
              /* Login / Register */
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface-light">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {/* Main Navigation */}
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={mobileLinkStyles}
                onClick={handleMobileNavigation}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-border-subtle">
              {isAuthenticated ? (
                <>
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 pb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {user?.fullName ? (
                        user.fullName.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-surface-dark">
                        {user?.fullName || "Account"}
                      </p>

                      <p className="text-xs text-surface-dark/50 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  {/* Role-based Mobile Menu */}
                  <div className="space-y-1">
                    {dropdownItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleMobileNavigation}
                          className="flex items-center gap-3 py-2 text-sm text-surface-dark hover:text-primary transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Logout */}
                  <div className="mt-2 pt-2 border-t border-border-subtle">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Mobile Login / Register */
                <div className="flex flex-col gap-2">
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
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
