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
        <div className='overflow-hidden py-10 relative'>
            {/* Marquee Container */}
            <motion.div
                className='flex'
                animate={{
                    x: ['0%', '100%'], // Move from 0% to 100% (reverse direction)
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
                        className='flex-shrink-0 w-80 mx-4 p-6 bg-gray-800 rounded-md shadow-sm hover:shadow-xl transition-all relative'
                        style={{
                            boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)', // Minimal white shadow
                        }}
                    >
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