import { motion } from 'framer-motion';

// Demo data for the cards
const demoData = [
    {
        name: 'John Doe',
        review: 'Amazing service!',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        name: 'Jane Smith',
        review: 'Highly recommended!',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        name: 'Alice Johnson',
        review: 'Great experience!',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        name: 'Bob Brown',
        review: 'Fantastic support!',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
        name: 'Charlie Davis',
        review: 'Very professional!',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
        name: 'Diana Prince',
        review: 'Exceptional quality!',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
        name: 'Clark Kent',
        review: 'Superb experience!',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
        name: 'Bruce Wayne',
        review: 'Outstanding!',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    },
    {
        name: 'Selina Kyle',
        review: 'Top-notch!',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
        name: 'Barry Allen',
        review: 'Fast and reliable!',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
];

const MarqueeCardsReverse = () => {
    return (
        <div className='overflow-hidden relative'>
            {/* Marquee Container */}
            <motion.div
                className='flex'
                animate={{
                    x: ['0%', '20%'], // Move from 0% to 20% (reverse direction)
                }}
                transition={{
                    duration: 10, // Duration of one loop (adjust based on the number of cards)
                    repeat: Infinity, // Infinite loop
                    ease: 'linear', // Smooth linear animation
                }}
            >
                {/* Double the data to create a seamless loop */}
                {[...demoData, ...demoData].map((item, index) => (
                    <motion.div
                        key={index}
                        className='flex-shrink-0 w-80 mx-4 p-6 bg-gray-800 rounded-xl shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 border border-gray-700 transition-all relative'
                        whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }} // Floating effect on hover
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

                        <div className='flex flex-col items-center space-y-4 relative z-10'>
                            {/* Avatar */}
                            <img
                                src={item.avatar}
                                alt={item.name}
                                className='w-16 h-16 rounded-full mb-4 border-2 border-blue-500'
                            />
                            {/* Name */}
                            <h3 className='text-xl font-bold text-white'>{item.name}</h3>
                            {/* Review */}
                            <p className='text-sm text-slate-300'>{item.review}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MarqueeCardsReverse;