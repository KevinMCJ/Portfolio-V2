import { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSlider from "@/components/ImageSlider";
import ProjectCard from "@/components/home/ProjectCard";
import data from "@/utils/projects.json";

const additionalProjects = data.projects.slice(4);

const Projects = () => {
  const { t } = useTranslation();
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const openSlider = (images: string[]) => {
    setIsSliderOpen(true);
    setSliderImages(images);
  };

  return (
    <section className="app-container">
      <h2 className="section-title font-semibold tracking-wide">
        {t("content.more_projects_title")}
      </h2>
      <ImageSlider
        isOpen={isSliderOpen}
        setIsOpen={setIsSliderOpen}
        images={sliderImages}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {additionalProjects.map((project, index) => (
          <ProjectCard key={index} project={project} openSlider={openSlider} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
