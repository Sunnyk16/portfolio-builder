// 'use client';
// import { useRouter } from "next/navigation";
// import Header from "./_components/Header";
// import ProjectShowcase from "./_components/ProjectShowcase";
// import HowItWorks from "./_components/How/index";
// import MarqueeCards from "./_components/MarqueeCards";
// import MarqueeCardsReverse from "./_components/MarqueeCardsReverse";

// export default function Home() {
//   const router = useRouter();

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className=" flex flex-col justify-center items-center bg-[#212121]">
//       {/* Header */}
//       <Header />

//       {/* Hero Section */}
//       <div
//         className="relative flex h-[600px] space-y-5 w-full items-center flex-col justify-center overflow-hidden rounded-lg bg-background p-10 pt-10 bg-cover bg-center"
//         style={{ backgroundImage: "url('/herobg.jpg')" }}
//       >
//         <h1 className="text-5xl text-center font-extrabold">
//           Build Your <span className="text-blue-700">Portfolio</span>
//         </h1>
//         <p className="max-w-2xl text-sm text-center text-gray-400">
//           Showcase your projects, skills, and experiences with our AI-driven portfolio builder.
//         </p>
//         <div className="z-50 space-x-3">
//           <button
//             onClick={() => router.push('/create')}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:opacity-95 hover:scale-105"
//           >
//             Get Started
//           </button>
//           <button
//             onClick={() => scrollToSection('how-it-works')}
//             className="border border-blue-500 text-gray-100 px-4 py-2 rounded hover:text-white hover:scale-105"
//           >
//             Know More
//           </button>
//         </div>
//       </div>

//       {/* move */}
//       <MarqueeCards/>
//       <MarqueeCardsReverse/>


//       <div id="how-it-works">
//         <HowItWorks />
//       </div>

//       {/* Footer Section */}
//       <section className="flex flex-col items-center justify-center text-center px-6 py-10 md:py-10 lg:py-32">
//         {/* <h3 className="text-gray-100 font-medium text-sm md:text-base">Get started</h3> */}
//         <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">
//           Boost your productivity.<br /> Start using our app today.
//         </h1>
//         <p className="text-gray-400 mt-4 max-w-2xl">
//           Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua
//           proident excepteur commodo do ea.
//         </p>
//         <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition">
//           Get started
//         </button>
//       </section>
//     </div>
//   );
// }
'use client';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "./_components/Header";
import ProjectShowcase from "./_components/ProjectShowcase";
import HowItWorks from "./_components/How/index";
import MarqueeCards from "./_components/MarqueeCards";
import MarqueeCardsReverse from "./_components/MarqueeCardsReverse";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#212121] overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.div
        className="relative flex h-[600px] space-y-5 w-full items-center flex-col justify-center overflow-hidden rounded-lg bg-background p-10 pt-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/herobg.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }} // Faster fade-in
      >
        <motion.h1
          className="text-5xl text-center font-extrabold"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Faster entry
        >
          Build Your <span className="text-blue-700">Portfolio</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-sm text-center text-gray-400"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Reduced delay
        >
          Showcase your projects, skills, and experiences with our AI-driven portfolio builder.
        </motion.p>

        <motion.div
          className="z-50 space-x-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} // Buttons load quickly
        >
          <button
            onClick={() => router.push('/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:opacity-95 hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="border border-blue-500 text-gray-100 px-4 py-2 rounded hover:text-white hover:scale-105"
          >
            Know More
          </button>
        </motion.div>
      </motion.div>

      {/* Marquee Sections */}
      <div className="overflow-hidden w-full">
        <MarqueeCards />
        <MarqueeCardsReverse />
      </div>

      {/* How It Works Section */}
      <motion.div
        id="how-it-works"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      {/* Footer Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center px-6 py-10 md:py-10 lg:py-32"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">
          Boost your productivity.<br /> Start using our app today.
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          Elevate your online presence with a stunning portfolio that highlights your skills, projects, and achievements.
        </p>

        <Link href="/create">
          <motion.button
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get started
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
}