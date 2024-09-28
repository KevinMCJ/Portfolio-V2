import { useTranslation } from "react-i18next";
import { FaExternalLinkAlt, FaRegEye, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Project {
  title: { [key: string]: string };
  description: { [key: string]: string };
  thumbnail: string;
  images: string[];
  external_link: { type: string; url: string };
  technologies: string[];
}

interface ProjectCardsProps {
  project: Project;
  openSlider: (images: string[]) => void;
}

const ProjectCard = ({ project, openSlider }: ProjectCardsProps) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <article className="to-project-primary-50 grid h-max max-h-[680px] w-full max-w-[400px] overflow-hidden bg-gradient-to-br from-project-primary p-2 text-project-text shadow-md md:h-[450px] md:max-w-[950px] md:grid-cols-[45%_auto] md:grid-rows-[85%_auto] md:gap-x-5 md:p-3">
      <div className="vstack relative">
        <div
          className="relative overflow-hidden md:rounded-lg"
          onClick={() => openSlider(project.images)}
        >
          <img
            src={project.thumbnail}
            className="h-[300px] max-h-[200px] object-cover sm:max-h-none"
          />
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <FaRegEye className="text-3xl text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 mt-2 flex items-center gap-2 md:static md:grow">
          <Link
            to={project.external_link.url}
            target="_blank"
            className="flex items-center gap-2 bg-project-secondary px-2 py-1 font-semibold shadow-sm md:rounded-md"
          >
            <span>{project.external_link.type}</span>
            <FaExternalLinkAlt />
          </Link>
          <button className="flex items-center gap-2 bg-project-secondary px-2 py-1 font-semibold shadow-sm md:rounded-md">
            <span>{t("project-see-more")}</span>
            <FaInfoCircle />
          </button>
        </div>
      </div>

      <div className="vstack size-full overflow-hidden">
        <h3 className="mb-2 mt-1 text-balance text-xl font-semibold md:mt-0 md:text-center">
          {project.title[currentLanguage]}
        </h3>
        <p className="max-h-[10rem] grow overflow-y-auto text-balance md:max-h-none">
          {project.description[currentLanguage]}
        </p>
      </div>

      <div className="invisible-scroll col-span-full mt-2 flex items-center gap-2 overflow-x-scroll rounded-lg p-1">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="rounded-sm bg-project-secondary px-2 text-sm shadow-md shadow-secondary-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
