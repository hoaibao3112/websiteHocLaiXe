"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Các khóa học", href: "/khoa-hoc" },
  { label: "Tin tức", href: "/tin-tuc" },
  {
    label: "Góc học tập",
    href: "/dang-nhap",
    dropdownItems: [
      { label: "Video bài học", href: "/dang-nhap" },
      { label: "Học online lý thuyết 600 câu hỏi hạng B. 01, B, C1, C, D1, D2", href: "/dang-nhap" },
      { label: "Học online lý thuyết 250 câu hỏi hạng A1, A", href: "/dang-nhap" },
      { label: "Thi thử 600 câu lý thuyết hạng B.01, B, C1, C, D1, D2", href: "/dang-nhap" },
      { label: "Thi thử 250 câu lý thuyết hạng A1, A", href: "/dang-nhap" },
    ],
  },
  { label: "Tuyển dụng/liên hệ", href: "/lien-he" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Scroll handler with passive listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  }, [pathname]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-neutral-100"
          : "bg-white/90 backdrop-blur-sm border-neutral-100"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <Image
              src="/logo1.jpg"
              alt="Logo Chiến Thắng"
              width={160}
              height={50}
              className="object-contain transition-transform group-hover:scale-102 duration-300 h-10 sm:h-14 w-auto rounded-md"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.dropdownItems && pathname.startsWith(link.href));

              if (link.dropdownItems) {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "px-4 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer outline-none",
                        isActive
                          ? "text-brand-700"
                          : "text-neutral-700 hover:text-brand-600"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute left-0 mt-1 w-72 bg-white border border-neutral-100 shadow-lg rounded-md py-2 z-50 transition-all duration-200 origin-top-left",
                        isDropdownOpen
                          ? "opacity-100 scale-100 translate-y-0 visible"
                          : "opacity-0 scale-95 -translate-y-1 invisible"
                      )}
                    >
                      {/* Top gold line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-md" />
                      {link.dropdownItems.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.href}
                          className="block px-4 py-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-amber-600 transition-colors border-b border-neutral-50/50 last:border-0"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold transition-all duration-200 relative",
                    isActive
                      ? "text-brand-700"
                      : "text-neutral-700 hover:text-brand-600"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Phone call CTA & Login (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0902868928"
              className="bg-brand-800 hover:bg-brand-900 text-white font-bold px-6 py-3 rounded-md text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-xs font-normal text-brand-200">Đăng ký ngay:</span>
              <span>0902.868.928</span>
            </a>
            <Link
              href="/dang-nhap"
              className="p-2.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-brand-600 hover:border-brand-500 transition-all duration-200"
              title="Đăng nhập cổng học viên"
            >
              <LogIn className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Right Actions: Quick Call Button + Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:0902868928"
              className="flex items-center gap-1.5 bg-amber-600 active:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm"
              aria-label="Gọi hotline 0902.868.928"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Gọi ngay</span>
            </a>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu with backdrop */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="lg:hidden bg-white border-t border-neutral-100 shadow-xl animate-slide-down relative z-50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="flex flex-col gap-1">
                  {link.dropdownItems ? (
                    <>
                      <button
                        onClick={() =>
                          setIsMobileDropdownOpen(!isMobileDropdownOpen)
                        }
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-semibold text-neutral-700 hover:text-brand-600 hover:bg-brand-50 min-h-[48px] cursor-pointer"
                        aria-expanded={isMobileDropdownOpen}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isMobileDropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {isMobileDropdownOpen && (
                        <div className="pl-6 flex flex-col gap-1">
                          {link.dropdownItems.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              className="block px-4 py-3 rounded-lg text-xs font-semibold text-neutral-600 hover:text-brand-700 hover:bg-brand-50/50 min-h-[44px] flex items-center"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3.5 rounded-lg text-sm font-semibold transition-colors min-h-[48px] flex items-center",
                        pathname === link.href
                          ? "text-brand-700 bg-brand-50"
                          : "text-neutral-700 hover:text-brand-600 hover:bg-brand-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
                <a
                  href="tel:0902868928"
                  className="block text-center bg-brand-800 hover:bg-brand-900 text-white font-bold px-5 py-3.5 rounded-md text-sm transition-colors min-h-[48px] flex items-center justify-center"
                >
                  Gọi ngay: 0902.868.928
                </a>
                <Link
                  href="/dang-nhap"
                  className="flex items-center justify-center gap-2 text-center border border-neutral-200 text-neutral-700 font-semibold px-5 py-3.5 rounded-md text-sm hover:bg-neutral-50 transition-colors min-h-[48px]"
                >
                  <LogIn className="w-4 h-4" />
                  Cổng học viên
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
