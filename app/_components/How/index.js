
// import { Atom, Edit, Share2 } from 'lucide-react'
// import { useRouter } from 'next/navigation';
// import React from 'react'


// const HowItWorks = () => {

//     const router = useRouter();

//     const howConfig = [
//         {
//             icon: Edit,
//             title: 'Create Your Portfolio',
//             description: 'Start by adding your personal information and a professional photo.',
//         },
//         {
//             icon: Atom,
//             title: 'Add Your Projects',
//             description: 'Showcase your best work by adding detailed descriptions and images of your projects.',
//         },
//         {
//             icon: Share2,
//             title: 'Share Your Portfolio',
//             description: 'Easily share your portfolio with potential employers and clients.',
//         },
//     ]

//     return (
//         <div id='how' className='py-10 gap-3 flex flex-col justify-center items-center'>

//             <div className='p-5 flex flex-col justify-center items-center gap-3'>
//                 <h1 className='font-bold text-5xl text-gray-100'>How it Works?</h1>
//                 <p className='text-slate-50 text-xs font-light'>Give mock interview in just 3 simple easy steps</p>
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//                 {
//                     howConfig && howConfig.map((item, index) => {
//                         return (
//                             <div key={index} className='border shadow-lg pb-12 p-8 rounded-lg flex flex-col justify-start hover:shadow-blue-100 max-w-sm space-y-2'>

//                                 {item.icon && <item.icon size={30} />}

//                                 <h1 className='text-center font-bold text-xl'>{item.title}</h1>
//                                 <p className='text-center text-slate-500 text-sm'> {item.description}</p>
//                             </div>
//                         )
//                     })
//                 }
//             </div>

//             {/* <button onClick={() => { router.push('/admin') }} className="border m-5 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 hover:scale-90">Get Started</button> */}

//         </div>
//     )
// }

// export default HowItWorks
import { Atom, Edit, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const router = useRouter();

    const howConfig = [
        {
            icon: Edit,
            title: 'Create Your Portfolio',
            description: 'Start by adding your personal information and a professional photo.',
        },
        {
            icon: Atom,
            title: 'Add Your Projects',
            description: 'Showcase your best work by adding detailed descriptions and images of your projects.',
        },
        {
            icon: Share2,
            title: 'Share Your Portfolio',
            description: 'Easily share your portfolio with potential employers and clients.',
        },
    ];

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div id='how' className='py-20' style={{ backgroundColor: '#212121' }}>
            <div className='container mx-auto px-4'>
                {/* Heading Section */}
                <div className='text-center mb-16'>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='font-bold text-5xl text-white mb-4'
                    >
                        How it Works?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='text-slate-300 text-lg font-light'
                    >
                        Build your portfolio in just 3 simple steps
                    </motion.p>
                </div>

                {/* Cards Section */}
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {howConfig.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                            className='bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 border border-gray-700 transition-all relative'
                            style={{
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {/* Floating Effect */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: 'easeInOut',
                                }}
                                className='absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-800/10 opacity-50'
                            />

                            <div className='flex flex-col items-center space-y-6 relative z-10'>
                                {/* Icon with Animation */}
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.5 }}
                                    className='p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg'
                                >
                                    <item.icon size={30} className='text-white' />
                                </motion.div>

                                {/* Title */}
                                <h2 className='text-2xl font-bold text-white text-center'>{item.title}</h2>

                                {/* Description */}
                                <p className='text-slate-300 text-center text-sm'>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Optional Get Started Button */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex justify-center mt-16'
                >
                    <button
                        onClick={() => router.push('/admin')}
                        className='bg-gradient-to-br from-blue-600 to-blue-800 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 hover:scale-105 transition-all shadow-lg'
                    >
                        Get Started
                    </button>
                </motion.div> */}
            </div>
        </div>
    );
};

export default HowItWorks;