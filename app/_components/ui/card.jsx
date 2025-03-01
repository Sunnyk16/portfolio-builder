import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
    <section id="projects" className="w-full py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={project.link} className="text-blue-600 hover:underline">
                  View Project
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}