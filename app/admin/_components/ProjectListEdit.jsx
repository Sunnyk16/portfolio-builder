
import { Image, LineChart, Link2, SquareStack, Trash2 } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PreviewUpdatedContext } from '../../_context/PreviewUpdatedContext';
import { CldUploadWidget } from 'next-cloudinary';

function ProjectListEdit({ projectList, refreshData }) {
    const [selectedOption, setSelectedOption] = useState();
    const [projectListData, setProjectListData] = useState([]);
    const { updatePreview, setupdatePreview } = useContext(PreviewUpdatedContext);

    useEffect(() => {
        if (projectList) setProjectListData(projectList);
    }, [projectList]);

    const onInputChange = (value, fieldName, projectId) => {
        setTimeout(async () => {
            try {
                await db.update(project).set({ [fieldName]: value }).where(eq(project.id, projectId));
                refreshData();
                toast.success('Saved', { position: 'top-right' });
                setupdatePreview(updatePreview + 1);
            } catch (error) {
                toast.error('Error saving changes', { position: 'top-right' });
            }
        }, 1000);
    };

    const onProjectDelete = (projectId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await db.delete(project).where(eq(project.id, projectId));
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    refreshData();
                    toast.error('Deleted', { position: 'top-right' });
                    setupdatePreview(updatePreview + 1);
                } catch (error) {
                    toast.error('Error deleting project', { position: 'top-right' });
                }
            }
        });
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;

        const newList = Array.from(projectListData);
        const [reorderedItem] = newList.splice(result.source.index, 1);
        newList.splice(result.destination.index, 0, reorderedItem);
        setProjectListData(newList);

        try {
            await db.update(project)
                .set({ order: result.destination.index })
                .where(eq(project.id, result.draggableId));
            setupdatePreview(updatePreview + 1);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleLogoUploadSuccess = async (result, projectId) => {
        if (result?.info?.secure_url) {
            const imageUrl = result.info.secure_url;
            console.log('Uploaded Logo URL:', imageUrl);

            try {
                await db.update(project)
                    .set({ logo: imageUrl })
                    .where(eq(project.id, projectId));

                toast.success('Logo updated successfully!', { position: 'top-right' });
                refreshData(); // Refresh the project list to reflect the new logo
                setupdatePreview(updatePreview + 1);
            } catch (error) {
                toast.error('Failed to update logo!', { position: 'top-right' });
            }
        }
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='droppable'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {projectListData.map((project, index) => (
                                <Draggable key={project.id} draggableId={project.id.toString()} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='p-3 my-7 rounded-lg bg-gray-800 mt-10'>
                                            <div>
                                                <div className='flex items-center gap-3'>
                                                    <div className="relative">
                                                        <img
                                                            src={`${project.logo || '/default-logo.png'}?${Date.now()}`} // Cache-busting query parameter
                                                            alt={project.name}
                                                            className='w-[50px] h-[50px] rounded-full'
                                                        />
                                                        <CldUploadWidget
                                                            uploadPreset="portfolio-developer" // Your Cloudinary upload preset
                                                            onSuccess={(result) => handleLogoUploadSuccess(result, project.id)}
                                                        >
                                                            {({ open }) => (
                                                                <Image
                                                                    className="absolute bottom-0 right-0 p-1 h-6 w-6 bg-gray-500 rounded-full cursor-pointer"
                                                                    onClick={() => open()}
                                                                />
                                                            )}
                                                        </CldUploadWidget>
                                                    </div>
                                                    <input
                                                        type='text'
                                                        className='input input-bordered w-full'
                                                        placeholder='Project / Startup Name'
                                                        defaultValue={project.name}
                                                        onChange={(event) => onInputChange(event.target.value, 'name', project.id)}
                                                    />
                                                </div>
                                                <input
                                                    type='text'
                                                    className='input input-bordered w-full text-sm mt-2'
                                                    placeholder='Tell me about your project'
                                                    defaultValue={project.description}
                                                    onChange={(event) => onInputChange(event.target.value, 'description', project.id)}
                                                />
                                                <div className='flex gap-3 mt-3 items-center justify-between'>
                                                    <div className='flex gap-3 mt-3'>
                                                        <Link2 className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption === 'link' + index ? 'bg-gray-600' : ''}`} onClick={() => setSelectedOption('link' + index)} />
                                                        <SquareStack className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption === 'category' + index ? 'bg-gray-600' : ''}`} onClick={() => setSelectedOption('category' + index)} />
                                                        <LineChart className={`h-12 w-12 p-3 rounded-md hover:bg-gray-600 ${selectedOption === 'linechart' + index ? 'bg-gray-600' : ''}`} onClick={() => setSelectedOption('linechart' + index)} />
                                                    </div>
                                                    <div className='flex gap-2 items-center'>
                                                        <button className='btn btn-error btn-sm' onClick={() => onProjectDelete(project.id)}><Trash2 /></button>
                                                        <input type='checkbox' defaultChecked className='toggle toggle-secondary' checked={project.active} onChange={(event) => onInputChange(event.target.checked, 'active', project.id)} />
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
                                                            <input type='text' className='grow' placeholder='Category' defaultValue={project.category} onChange={(event) => onInputChange(event.target.value, 'category', project.id)} />
                                                        </label>
                                                    </div>
                                                )}
                                                {selectedOption === 'linechart' + index && (
                                                    <div className='mt-2 flex justify-between items-center'>
                                                        <label>Show Project Visitors Graph</label>
                                                        <input type='checkbox' className='toggle toggle-secondary' checked={project.showGraph} onChange={(event) => onInputChange(event.target.checked, 'showGraph', project.id)} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ProjectListEdit;
