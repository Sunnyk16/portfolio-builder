
import { useState, useEffect, useRef } from "react";
import { UserCog, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);
    const { isSignedIn } = useUser(); 

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full flex items-center relative shadow-md bg-gray-900">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white">
                    <UserCog className="text-blue-500 font-extrabold" />
                    <span className="text-white">Portfolio Builder</span>
                </Link>

                {/* Hamburger Menu Button for Small Screens */}
                <motion.button
                    className="lg:hidden text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                    onClick={toggleNav}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>

                {/* Centered Navigation for Larger Screens */}
                <nav className="hidden lg:flex space-x-6 mx-auto">
                    <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300">
                        Dashboard
                    </Link>
                    <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300">
                        Projects
                    </Link>
                    <Link href="/how-it-works" className="text-slate-100 hover:text-blue-600 transition duration-300">
                        How it Works?
                    </Link>
                </nav>

                {/* User Button for Desktop */}
                <div className="hidden lg:flex items-center space-x-4">
                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <span className="text-slate-100 hover:text-blue-600 transition duration-300 cursor-pointer">
                                    Sign In
                                </span>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <span className="text-slate-100 hover:text-blue-600 transition duration-300 cursor-pointer">
                                    Sign Up
                                </span>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>

            {/* Dropdown Navigation for Small Screens */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.nav
                        ref={navRef}
                        className="lg:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg z-50"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    >
                        <div className="flex flex-col p-4 space-y-3">
                            <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                Dashboard
                            </Link>
                            <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                Projects
                            </Link>
                            <Link href="/how-it-works" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                How it Works?
                            </Link>

                            {/* User Button inside mobile menu */}
                            <div className="mt-4 border-t border-gray-700 pt-3">
                                {isSignedIn ? (
                                    <UserButton afterSignOutUrl="/" />
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <SignInButton mode="modal">
                                            <span className="text-slate-100 hover:text-blue-600 transition duration-300 cursor-pointer">
                                                Sign In
                                            </span>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <span className="text-slate-100 hover:text-blue-600 transition duration-300 cursor-pointer">
                                                Sign Up
                                            </span>
                                        </SignUpButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
