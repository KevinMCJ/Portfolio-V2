import { Project, SupportedLanguage } from "@/global/types";
import { useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaRegEye, FaInfoCircle } from "react-icons/fa";
import ProjectDetail from "./ProjectDetail";
import DraggableList from "../common/DraggableList";

interface ProjectCardsProps {
  project: Project;
  openSlider: (images: string[]) => void;
}

const ProjectCard = ({ project, openSlider }: ProjectCardsProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  return (
    <Fragment>
      <ProjectDetail
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        project={project}
      />
      <article className="from-project-primary text-project-text grid h-max max-h-[680px] w-full max-w-[400px] overflow-hidden bg-gradient-to-br p-2 shadow-md md:h-[450px] md:max-w-[950px] md:grid-cols-[45%_auto] md:grid-rows-[85%_auto] md:gap-x-5 md:p-3">
        <div className="vstack relative">
          <div className="relative overflow-hidden md:rounded-lg">
            <img
              src={project.thumbnail}
              alt={`${project.title[currentLanguage]} thumbnail`}
              className="h-[200px] w-full object-cover sm:max-h-none md:h-[300px]"
            />
            <div
              onClick={() => {
                if (project.images.length > 0) {
                  openSlider(project.images);
                } else {
                  window.open(project.external_link.url, "_blank");
                }
              }}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 hover:opacity-100"
            >
              <FaRegEye className="text-3xl text-white" />
            </div>
          </div>
          <div className="absolute right-2 bottom-2 mt-2 flex items-center gap-2 md:static md:mt-2 md:grow">
            <Link
              to={project.external_link.url}
              target="_blank"
              className="btn-secondary flex items-center gap-2 px-2 py-1 font-semibold md:rounded-md"
            >
              <span>{project.external_link.type}</span>
              <FaExternalLinkAlt className="text-icon" />
            </Link>
            <button
              onClick={() => setIsDetailOpen(true)}
              className="btn-secondary flex items-center gap-2 px-2 py-1 font-semibold md:rounded-md"
            >
              <span>{t("content.project_see_more")}</span>
              <FaInfoCircle className="text-icon" />
            </button>
          </div>
        </div>

        <div className="vstack size-full overflow-hidden">
          <h3 className="mt-1 mb-2 text-xl font-semibold text-balance md:mt-0 md:text-center">
            {project.title[currentLanguage]}
          </h3>
          <p className="invisible-scroll max-h-[8rem] grow overflow-y-auto text-balance md:max-h-none">
            {project.description[currentLanguage]}
          </p>
        </div>

        <DraggableList
          items={project.technologies}
          className="col-span-full mt-2 md:mt-0"
        />
      </article>
    </Fragment>
  );
};

export default ProjectCard;
