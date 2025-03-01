export default function SkillsSection() {
    const skills = [
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Python",
      "AI/ML",
      "GraphQL",
    ];
  
    return (
      <section id="skills" className="w-full py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="px-4 py-2 bg-gray-100 rounded-full">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }