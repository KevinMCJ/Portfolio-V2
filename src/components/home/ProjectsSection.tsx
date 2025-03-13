import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ImageSlider from "../ImageSlider";
import data from "@/utils/projects.json";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const openSlider = (images: string[]) => {
    setIsSliderOpen(true);
    setSliderImages(images);
  };

  return (
    <section id="projects" className="app-container">
      <ImageSlider isOpen={isSliderOpen} setIsOpen={setIsSliderOpen} images={sliderImages} />
      <h2 className="section-title">{t("content.projects_title")}</h2>
      <div className="grid place-content-center place-items-center gap-5 xl:grid-cols-2">
        {data.projects.map((project, index) => (
          <ProjectCard key={index} project={project} openSlider={openSlider} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
