import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ImageSlider from "../ImageSlider";
import data from "@/utils/projects.json";

const mainProjects = data.projects.slice(0, 4);

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const openSlider = (images: string[]) => {
    setIsSliderOpen(true);
    setSliderImages(images);
  };

  return (
    <section id="projects" className="app-container relative">
      <ImageSlider
        isOpen={isSliderOpen}
        setIsOpen={setIsSliderOpen}
        images={sliderImages}
      />
      <h2 className="section-title">{t("content.projects_title")}</h2>
      <div className="grid place-content-center place-items-center gap-5 xl:grid-cols-2">
        {mainProjects.map((project, index) => (
          <ProjectCard key={index} project={project} openSlider={openSlider} />
        ))}
      </div>

      <Link
        to="/projects"
        className="group bg-secondary-500 hover:bg-secondary-600 dark:bg-primary-700 dark:hover:bg-primary-700 absolute right-10 -bottom-16 flex w-fit items-center px-4 py-2 text-white shadow-2xl shadow-black/30 transition-colors"
      >
        <span className="relative z-10 text-sm font-medium">
          {t("content.more_projects_title")}
        </span>

        {/* Punta de la flecha */}
        <div
          className="border-l-secondary-500 group-hover:border-l-secondary-600 dark:border-l-primary-700 dark:group-hover:border-l-primary-700 absolute top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent transition-colors"
          style={{
            right: "-1.1rem",
            borderLeftWidth: "1.5rem",
            borderTopWidth: "1.5rem",
            borderBottomWidth: "1.5rem",
          }}
        ></div>
      </Link>
    </section>
  );
};

export default ProjectsSection;
