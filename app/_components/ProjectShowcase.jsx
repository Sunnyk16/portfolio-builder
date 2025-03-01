export default function ProjectShowcase() {
    const projects = [
      {
        id: 1,
        title: "AI Interview Platform",
        description: "A platform to practice interviews with AI-driven feedback.",
        link: "#",
      },
      {
        id: 2,
        title: "Portfolio Builder",
        description: "A tool to build and showcase your portfolio.",
        link: "#",
      },
      {
        id: 3,
        title: "E-Commerce Website",
        description: "A fully functional e-commerce website built with Next.js.",
        link: "#",
      },
    ];
  
    return (
      <section id="projects" className="w-full py-12 bg-base-200">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
  
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  {/* Project Title */}
                  <h2 className="card-title text-2xl font-bold">{project.title}</h2>
  
                  {/* Project Description */}
                  <p className="text-gray-600">{project.description}</p>
  
                  {/* View Project Button */}
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={project.link}
                      className="btn btn-primary"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }