import { Link2 } from 'lucide-react'
import React from 'react'


function ProjectListEdit(projectList) {
  return (
    <div>
        {projectList.projectList.map((project,index)=>(
            <div key={index} className='p-3 my-7 rounded-lg bg-gray-800 mt-10' >
                <div   >
                    <div className='flex items-center gap-3 '>
                
                {/* .............................................. */}
                {/* <TwicPicture src={project.logo} alt={project.name} classname="w-[50px] h-[50px] rounded-full"  /> */}

                {/* ................ */}
                <img src={project.logo} alt={project.name} className="w-[50px] h-[50px] rounded-full" />
                <input type="text" className="input input-bordered w-full" placeholder="Project / Startup Name"/>
                </div>
                <input type="text" className="input input-bordered w-full text-sm mt-2" placeholder="tell me about your project"/>

                <div>
                <div className="flex gap-3 mt-3">
                    <Link2
                        className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${
                            selectedOption == 'location' && 'bg-gray-600'
                        }`}
                        onClick={() => setSelectedOption('location')}
                    />
                    <Link2
                        className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${
                            selectedOption == 'link' && 'bg-gray-600'
                        }`}
                        onClick={() => setSelectedOption('link')}
                    />
                </div>

                {selectedOption == 'location' ? (
                    <div className="mt-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <MapPin />
                            <input
                                type="text"
                                className="grow"
                                placeholder="Location"
                                // onChange={(event) => onInputChange(event, 'location')}
                                key={1}
                                defaultValue={project?.url}
                            />
                        </label>
                    </div>
                ) : selectedOption == 'link' ? (
                    <div className="mt-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <Link2 />
                            <input
                                type="text"
                                className="grow"
                                placeholder="URL"
                                onChange={(event) => onInputChange(event, 'link')}
                                defaultValue={userDetails?.link}
                                key={2}
                            />
                        </label>
                    </div>
                ) : null}
            </div>

                </div>

            </div>
        ))}
    </div>
  )
}

export default ProjectListEdit