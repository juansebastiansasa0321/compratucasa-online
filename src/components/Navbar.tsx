"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, MapPin, Settings, Building2, BookOpen, Mail } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Inicio", href: "/", icon: Home },
        { name: "Catálogo", href: "/#catalogo", icon: Building2 },
        { name: "Oferta Jamundí", href: "/jamundi", icon: MapPin },
        { name: "Blog", href: "/blog", icon: BookOpen },
        { name: "Contacto", href: "/#contacto", icon: Mail },
    ];

    return (
        <nav className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 lg:h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="font-black text-xl sm:text-2xl text-gray-900 dark:text-white tracking-tighter">CompraTu<span className="text-emerald-600">Casa</span></span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                                        isActive 
                                        ? "text-emerald-600 dark:text-emerald-400" 
                                        : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 hover:text-emerald-600 focus:outline-none p-2.5 bg-gray-50 rounded-xl dark:bg-gray-800/50 dark:text-white transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-gray-100 dark:border-gray-800/50 shadow-2xl absolute w-full left-0">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 block px-4 py-3 rounded-lg text-base font-bold ${
                                        isActive 
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" 
                                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800/50"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
