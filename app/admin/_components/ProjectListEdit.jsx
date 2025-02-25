
// import { Image, LineChart, Link2, SquareStack, Trash2 } from 'lucide-react';
// import React, { use, useState,useEffect } from 'react';
// import { db } from '../../../utils';
// import { project } from '../../../utils/schema';
// import { eq } from 'drizzle-orm';
// import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';

// function ProjectListEdit({ projectList, refreshData }) {
//     let timeoutId;
//     const [selectedOption, setSelectedOption] = useState();
//     const [projectListdata, setProjectListData] = useState([]);

//     useEffect(() => {
//         projectList && setProjectListData(projectList);
//     }, [projectList]);

//     const onInputChange = (value, fieldName, projectId) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(async () => {
//             const result = await db
//                 .update(project)
//                 .set({ [fieldName]: value })
//                 .where(eq(project.id, projectId));




//             if (result) {
//                 refreshData();
//                 toast.success('Saved', { position: 'top-right' });
//             } else {
//                 toast.error('Error', { position: 'top-right' });
//             }
//         }, 1000);
//     };

//     const OnProjectDelete = (projectId) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const result = await db.delete(project).where(eq(project.id, projectId));
//                 Swal.fire({
//                     title: "Deleted!",
//                     text: "Your file has been deleted.",
//                     icon: "success"
//                 });
//                 refreshData();
//                 toast.error('Deleted', { position: 'top-right' });
//             }
//         });
//     }
//     const handleOnDragEnd = async(result) => {
//         const newList = Array.from(projectListdata);
//         const [reorderedList] = newList.splice(result.source.index, 1);
//         newList.splice(result.destination.index, 0, reorderedList);
//         setProjectListData(newList);
//         console.log(newList);
//         console.log(result);

//         const result1=await db.update(project).set({order:result.destination.index}).where(eq(project.order,result.source.index)).where(eq(project.id,result?.draggableId));

//         console.log(result1);
        

//         // const result=await db.update(project).set({order:result?.source.index}).where(eq(project.order,result.destination.index)).where(eq(project.id,result?.draggableId))
        
        

//     }

//     return (
//         <div>
//             <DragDropContext onDragEnd={handleOnDragEnd}>
//                 <Droppable droppableId='droppable'>
//                     {(provided) => (
//                         <div ref={provided.innerRef} {...provided.droppableProps}>
//                             {projectList.map((project, index) => (
//                                 <Draggable draggableId={(project.id).toString()} index={index}>
//                                     {(provided) => (
//                                         <div key={project.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='p-3 my-7 rounded-lg bg-gray-800 mt-10'>
//                                             <div>
//                                                 <div className='flex items-center gap-3'>
//                                                     <img src={project.logo} alt={project.name} className='w-[50px] h-[50px] rounded-full' />
//                                                     {/* add insert from basic detail */}
//                                                     <input type='text' className='input input-bordered w-full' placeholder='Project / Startup Name' defaultValue={project.name}
//                                                         onChange={(event) => onInputChange(event.target.value, 'name', project.id)} />
//                                                 </div>
//                                                 <input type='text' className='input input-bordered w-full text-sm mt-2' placeholder='Tell me about your project' defaultValue={project.description}
//                                                     onChange={(event) => onInputChange(event.target.value, 'description', project.id)} />

//                                                 <div>
//                                                     <div className='flex gap-3 mt-3 items-center justify-between'>
//                                                         <div className='flex gap-3 mt-3'>
//                                                             <Link2
//                                                                 className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption === 'link' + index ? 'bg-gray-600' : ''}`}
//                                                                 onClick={() => setSelectedOption('link' + index)}
//                                                             />
//                                                             <SquareStack
//                                                                 className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption === 'category' + index ? 'bg-gray-600' : ''}`}
//                                                                 onClick={() => setSelectedOption('category' + index)}
//                                                             />
//                                                             {/* <Image className={`h-12 w-12 p-3 rounded-md hover:bg-gray-600 ${selectedOption === 'banner' + index ? 'bg-gray-600' : ''}`}
//                                         onClick={() => setSelectedOption('banner' + index)} /> */}

//                                                             <LineChart className={`h-12 w-12 p-3 rounded-md hover:bg-gray-600 ${selectedOption === 'banner' + index ? 'bg-gray-600' : ''}`}
//                                                                 onClick={() => setSelectedOption('linechart' + index)} />

//                                                         </div>

//                                                         <div className='flex gap-2 items-center'>
//                                                             <button className='btn  btn-error   btn-sm'
//                                                                 onClick={() => OnProjectDelete(project.id)}

//                                                             ><Trash2 /></button>
//                                                             <input type="checkbox" defaultChecked className="toggle toggle-secondary"
//                                                                 checked={project.active} onChange={(event) => onInputChange(event.target.checked, 'active', project.id)} />

//                                                         </div>
//                                                     </div>

//                                                     {selectedOption === 'link' + index && (
//                                                         <div className='mt-3'>
//                                                             <label className='input input-bordered flex items-center gap-2'>
//                                                                 <Link2 />
//                                                                 <input type='text' className='grow' placeholder='URL' defaultValue={project.url} onChange={(event) => onInputChange(event.target.value, 'url', project.id)} />
//                                                             </label>
//                                                         </div>
//                                                     )}
//                                                     {selectedOption === 'category' + index && (
//                                                         <div className='mt-3'>
//                                                             <label className='input input-bordered flex items-center gap-2'>
//                                                                 <SquareStack />
//                                                                 <input type='text' className='grow' placeholder='Category' defaultValue={project.category}

//                                                                     onChange={(event) => onInputChange(event.target.value, 'category', project.id)} />
//                                                             </label>
//                                                         </div>
//                                                     )}
//                                                     {/* banner option */}
//                                                     {/* {selectedOption === 'banner' + index && (
//                                 <div className='mt-2'>
//                                     <label>Add Banner</label>
//                                     <label className='flex items-center gap-2 cursor-pointer'>
//                                         <Image className='w-[100px] h-[100px]' />
//                                         <input type='file' className='hidden' onChange={(event) => handleFileUploadForProject(event, project.id)} />
//                                     </label>
//                                 </div>
//                             )} */}
//                                                     {selectedOption === 'linechart' + index && (
//                                                         <div className='mt-2 flex justify-between items-center'>
//                                                             <label>Show Project Visitors Graph</label>
//                                                             <label className='flex items-center gap-2 cursor-pointer'>
//                                                                 <input type="checkbox" defaultChecked className="toggle toggle-secondary"
//                                                                     checked={project?.showGraph} onChange={(event) => onInputChange(event.target.checked, 'showGraph', project.id)} />

//                                                             </label>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}

//                         </div>
//                     )}

//                 </Droppable>
//             </DragDropContext>
//         </div>
//     );
// }

// export default ProjectListEdit;
import { Image, LineChart, Link2, SquareStack, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function ProjectListEdit({ projectList, refreshData }) {
    const [selectedOption, setSelectedOption] = useState();
    const [projectListData, setProjectListData] = useState([]);

    useEffect(() => {
        if (projectList) setProjectListData(projectList);
    }, [projectList]);

    const onInputChange = (value, fieldName, projectId) => {
        setTimeout(async () => {
            try {
                await db.update(project).set({ [fieldName]: value }).where(eq(project.id, projectId));
                refreshData();
                toast.success('Saved', { position: 'top-right' });
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
        } catch (error) {
            console.error('Error updating order:', error);
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
                                                    <img src={project.logo} alt={project.name} className='w-[50px] h-[50px] rounded-full' />
                                                    <input type='text' className='input input-bordered w-full' placeholder='Project / Startup Name' defaultValue={project.name} onChange={(event) => onInputChange(event.target.value, 'name', project.id)} />
                                                </div>
                                                <input type='text' className='input input-bordered w-full text-sm mt-2' placeholder='Tell me about your project' defaultValue={project.description} onChange={(event) => onInputChange(event.target.value, 'description', project.id)} />
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
