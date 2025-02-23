import { useUser } from '@clerk/nextjs';
import { Link2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { project } from '../../../utils/schema';
import { UserDetailContext } from '../Provider';
import { toast } from 'react-toastify';

import { db } from '../../../utils';

function AddProject() {
    const [openUrlInput, setOpenUrlInput] = useState(false);
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await db.insert(project).values({
                url: e.target[0].value,
                emailRef: user?.primaryEmailAddress?.emailAddress,
                useRef: userDetail?.id
            });

            setOpenUrlInput(false);

            if (result) {
                toast.success('Project added successfully', {
                    position: 'top-right'
                });
            } else {
                toast.error('An error occurred, try again', {
                    position: 'top-right'
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred, try again', {
                position: 'top-right'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!openUrlInput ? (
                <button
                    className="btn btn-secondary w-full"
                    onClick={() => setOpenUrlInput(true)}
                >
                    + Add Project / Startups
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="p-3 rounded-md bg-gray-800">
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <Link2 size={24} />
                        <input type="url" placeholder="Project URL" defaultValue="https://" required />
                    </label>
                    <button type="submit" className="btn btn-secondary w-full" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddProject;
