
import { Link2, SquareStack } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';

function ProjectListEdit({ projectList }) {
    let timeoutId;
    const [selectedOption, setSelectedOption] = useState();
    const onInputChange = (event, fieldName,projectId) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            const result = await db
                .update(project)
                .set({ [fieldName]: event.target.value })
                .where(eq(project.id, projectId));

            if (result) {
                toast.success('Saved', { position: 'top-right' });
            } else {
                toast.error('Error', { position: 'top-right' });
            }
        }, 1000);
    };

    return (
        <div>
            {projectList.map((project, index) => (
                <div key={index} className='p-3 my-7 rounded-lg bg-gray-800 mt-10'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <img src={project.logo} alt={project.name} className='w-[50px] h-[50px] rounded-full' />
                            <input type='text' className='input input-bordered w-full' placeholder='Project / Startup Name' defaultValue={project.name} 
                            onChange={(event)=>onInputChange(event,'name',project.id)}/>
                        </div>
                        <input type='text' className='input input-bordered w-full text-sm mt-2' placeholder='Tell me about your project' defaultValue={project.description}
                        onChange={(event)=>onInputChange(event,'description',project.id)} />

                        <div>
                            <div className='flex gap-3 mt-3'>
                                <Link2
                                    className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption === 'link' ? 'bg-gray-600' : ''}`}
                                    onClick={() => setSelectedOption('link'+index)}
                                />
                                <SquareStack
                                    className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption === 'category' ? 'bg-gray-600' : ''}`}
                                    onClick={() => setSelectedOption('category'+index)}
                                />
                            </div>

                            {selectedOption === 'link'+index && (
                                <div className='mt-3'>
                                    <label className='input input-bordered flex items-center gap-2'>
                                        <Link2 />
                                        <input type='text' className='grow' placeholder='URL' defaultValue={project.url} onChange={(event)=>onInputChange(event,'url',project.id)} />
                                    </label>
                                </div>
                            )}
                            {selectedOption === 'category'+index && (
                                <div className='mt-3'>
                                    <label className='input input-bordered flex items-center gap-2'>
                                        <SquareStack />
                                        <input type='text' className='grow' placeholder='Category' defaultValue={project.category} 
                                        onChange={(event)=>onInputChange(event,'category',project.id)}/>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectListEdit;