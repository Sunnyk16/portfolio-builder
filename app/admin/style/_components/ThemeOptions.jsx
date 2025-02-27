"use client";
import React, { useContext ,useState} from 'react';
import Theme from '../../../_data/Theme';
import { db } from '../../../../utils';
import { userInfo } from '../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';
import { UserDetailContext } from '../../Provider';

function ThemeOptions() {
    const { user } = useUser();
    const { userDetails, setUserDetails } = useContext(UserDetailContext) || {};
    const [selectedTheme, setSelectedTheme] = useState();

    const onThemeSelect = async (themeName) => {
        try {
            setSelectedTheme(themeName);
            const result = await db.update(userInfo)
                .set({ theme: themeName })
                .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

            if (result) {
                console.log("Theme Updated Successfully");
                toast.success("Theme Updated Successfully", { position: 'top-right' });

                // Update context state
                setUserDetails((prev) => ({ ...prev, theme: themeName }));
            }
        } catch (error) {
            console.error("Error updating theme:", error);
            toast.error("Failed to update theme", { position: 'top-right' });
        }
    };

    return (
        <div>
            <h2 className='font-bold text-2xl mb-4'>Select your Theme Option.</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {Theme.map((theme, index) => (
                    <div 
                        key={index} 
                        className={`p-3 bg-gray-900 rounded-lg hover:scale-105 transition-all cursor-pointer 
                        ${userDetails?.theme === theme.theme || selectedTheme === theme.theme ? 'border border-white' : ''}`}
                        onClick={() => onThemeSelect(theme.theme)}
                    >
                        <h3 className="text-center font-semibold mb-2">{theme.theme}</h3>

                        {/* Primary Color */}
                        <div className='w-full h-[40px] rounded-md mb-1' style={{ backgroundColor: theme.primary }} />

                        {/* Secondary Color */}
                        <div className='w-full h-[40px] rounded-md mb-1' style={{ backgroundColor: theme.secondary }} />

                        {/* Accent Color */}
                        <div className='w-full h-[40px] rounded-md' style={{ backgroundColor: theme.accent }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThemeOptions;
