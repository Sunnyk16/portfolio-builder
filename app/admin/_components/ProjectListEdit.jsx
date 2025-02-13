
import { Link2, SquareStack, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function ProjectListEdit({ projectList, refreshData }) {
    let timeoutId;
    const [selectedOption, setSelectedOption] = useState();
    const onInputChange = (value, fieldName, projectId) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            const result = await db
                .update(project)
                .set({ [fieldName]: value })
                .where(eq(project.id, projectId));




            if (result) {
                refreshData();
                toast.success('Saved', { position: 'top-right' });
            } else {
                toast.error('Error', { position: 'top-right' });
            }
        }, 1000);
    };

    const OnProjectDelete=(projectId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const result =await db.delete(project).where(eq(project.id, projectId));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                refreshData();
               toast.error('Deleted', { position: 'top-right' });
            }
          });
    }

    return (
        <div>
            {projectList.map((project, index) => (
                <div key={index} className='p-3 my-7 rounded-lg bg-gray-800 mt-10'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <img src={project.logo} alt={project.name} className='w-[50px] h-[50px] rounded-full' />
                            {/* add insert from basic detail */}
                            <input type='text' className='input input-bordered w-full' placeholder='Project / Startup Name' defaultValue={project.name}
                                onChange={(event) => onInputChange(event.target.value, 'name', project.id)} />
                        </div>
                        <input type='text' className='input input-bordered w-full text-sm mt-2' placeholder='Tell me about your project' defaultValue={project.description}
                            onChange={(event) => onInputChange(event.target.value, 'description', project.id)} />

                        <div>
                            <div className='flex gap-3 mt-3 items-center justify-between'>
                                <div className='flex gap-3 mt-3'>
                                    <Link2
                                        className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption === 'link' + index ? 'bg-gray-600' : ''}`}
                                        onClick={() => setSelectedOption('link' + index)}
                                    />
                                    <SquareStack
                                        className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption === 'category' + index ? 'bg-gray-600' : ''}`}
                                        onClick={() => setSelectedOption('category' + index)}
                                    />
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <button className='btn  btn-error   btn-sm'
                                        onClick={() => OnProjectDelete(project.id)}

                                    ><Trash2 /></button>
                                    <input type="checkbox" defaultChecked className="toggle toggle-secondary"
                                        checked={project.active} onChange={(event) => onInputChange(event.target.checked, 'active', project.id)} />

                                </div>
                            </div>

                            {selectedOption === 'link' + index && (
                                <div className='mt-3'>
                                    <label className='input input-bordered flex items-center gap-2'>
                                        <Link2 />
                                        <input type='text' className='grow' placeholder='URL' defaultValue={project.url} onChange={(event) => onInputChange(event.target.value, 'url', project.id)} />
                                    </label>
                                </div>
                            )}
                            {selectedOption === 'category' + index && (
                                <div className='mt-3'>
                                    <label className='input input-bordered flex items-center gap-2'>
                                        <SquareStack />
                                        <input type='text' className='grow' placeholder='Category' defaultValue={project.category}

                                            onChange={(event) => onInputChange(event.target.value, 'category', project.id)} />
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