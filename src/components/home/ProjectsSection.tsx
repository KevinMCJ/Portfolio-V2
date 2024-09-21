import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import data from "@/utils/projects.json";

const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="app-container">
      <h2 className="section-title">{t("projects-title")}</h2>
      <div className="grid place-content-center place-items-center gap-5 xl:grid-cols-2">
        {data.projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
