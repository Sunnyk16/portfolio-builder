
// // import { UserCog } from "lucide-react";
// // import Link from "next/link";

// // export default function Header() {
// //     return (
// //         <header className="w-full  flex items-center ">
// //             <div className="container mx-auto flex justify-center items-center p-2">
// //             <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white">
// //                     <UserCog className="text-blue-500 font-extrabold" />
// //                     <span className="text-white">Portfolio Builder</span>
// //                 </Link>
// //                 {/* Centered Navigation */}
// //                 <nav className="flex space-x-6 mx-auto">
// //                     <button className="btn btn-ghost relative">
// //                         <Link href="/dashboard" className="text-slate-100 hover:text-blue-600 transition duration-300 hover:scale-x-105">
// //                             Dashboard
// //                         </Link>
// //                         {/* <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span> */}
// //                     </button>
// //                     <button className="btn btn-ghost relative">
// //                         <Link href="/projects" className=" text-slate-100 hover:text-blue-600 transition duration-300 hover:scale-x-105">
// //                             Projects
// //                         </Link>
// //                         <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
// //                     </button>
// //                     <button className="btn btn-ghost relative">
// //                         <Link href="/skills" className=" text-slate-100 hover:text-blue-600 transition duration-300">
// //                             Skills
// //                         </Link>
// //                         <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 hover:w-full"></span>
// //                     </button>
// //                 </nav>
// //             </div>
// //         </header>
// //     );
// // }
// import { useState, useEffect, useRef } from "react";
// import { UserCog, Menu, X } from "lucide-react";
// import Link from "next/link";

// export default function Header() {
//     const [isNavOpen, setIsNavOpen] = useState(false);
//     const navRef = useRef(null);

//     const toggleNav = () => {
//         setIsNavOpen(!isNavOpen);
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (navRef.current && !navRef.current.contains(event.target)) {
//                 setIsNavOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <header className="w-full flex items-center relative  shadow-md">
//             <div className="container mx-auto flex justify-between items-center p-4">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white">
//                     <UserCog className="text-blue-500 font-extrabold" />
//                     <span className="text-white">Portfolio Builder</span>
//                 </Link>

//                 {/* Hamburger Menu Button for Small Screens */}
//                 <button className="lg:hidden text-white p-2 rounded-md hover:bg-gray-700 transition-colors" onClick={toggleNav}>
//                     {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                 </button>

//                 {/* Centered Navigation for Larger Screens */}
//                 <nav className="hidden lg:flex space-x-6 mx-auto">
//                     <button className="btn btn-ghost relative">
//                         <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300 hover:scale-x-105">
//                             Dashboard
//                         </Link>
//                     </button>
//                     <button className="btn btn-ghost relative">
//                         <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300 hover:scale-x-105">
//                             Projects
//                         </Link>
//                     </button>
//                     <button className="btn btn-ghost relative">
//                         <Link href="/how-it-works" className="text-slate-100 hover:text-blue-600 transition duration-300">
//                             How it Works?
//                         </Link>
//                     </button>
//                     </nav>
//                     </div>

//                     {/* Dropdown Navigation for Small Screens */}
//             {isNavOpen && (
//                 <nav ref={navRef} className="lg:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg z-50">
//                     <div className="flex flex-col p-4 space-y-3">
//                         <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
//                             Dashboard
//                         </Link>
//                         <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
//                         How It Works?
//                         </Link>
//                         <Link href="/skills" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
//                             Skills
//                         </Link>
//                     </div>
//                 </nav>
//             )}
//         </header>
//     );
// }
import { useState, useEffect, useRef } from "react";
import { UserCog, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Close dropdown when clicking outside
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

    // Animation variants for dropdown menu
    const dropdownVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    // Animation variants for hover effects
    const hoverVariants = {
        hover: { scale: 1.05, color: "#3b82f6" }, // Blue color on hover
        tap: { scale: 0.95 },
    };

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
                    <motion.button
                        className="btn btn-ghost relative"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300">
                            Dashboard
                        </Link>
                    </motion.button>
                    <motion.button
                        className="btn btn-ghost relative"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300">
                            Projects
                        </Link>
                    </motion.button>
                    <motion.button
                        className="btn btn-ghost relative"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Link href="/how-it-works" className="text-slate-100 hover:text-blue-600 transition duration-300">
                            How it Works?
                        </Link>
                    </motion.button>
                </nav>
            </div>

            {/* Dropdown Navigation for Small Screens */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.nav
                        ref={navRef}
                        className="lg:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex flex-col p-4 space-y-3">
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                                <Link href="/admin" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                    Dashboard
                                </Link>
                            </motion.div>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                                <Link href="/projects" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                    Projects
                                </Link>
                            </motion.div>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                                <Link href="/how-it-works" className="text-slate-100 hover:text-blue-600 transition duration-300 py-2 px-4 rounded-md hover:bg-gray-700">
                                    How it Works?
                                </Link>
                            </motion.div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}