import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Project, SupportedLanguage } from "@/global/types";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaLink, FaVideo, FaWindowClose } from "react-icons/fa";
import DOMPurify from "isomorphic-dompurify";
import DraggableList from "../common/DraggableList";

interface ProjectDetailProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  project: Project;
}

const ProjectDetail = ({ isOpen, setIsOpen, project }: ProjectDetailProps) => {
  const { t, i18n } = useTranslation();
  const detailRef = useRef<HTMLDialogElement | null>(null);
  const currentLanguage = i18n.language as SupportedLanguage;

  useEffect(() => {
    if (!detailRef) return;

    if (isOpen) {
      detailRef.current?.showModal();
    } else {
      detailRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return;

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return;
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    return date.toLocaleDateString(
      currentLanguage === "es" ? "es-ES" : "en-US",
    );
  };

  return (
    <motion.dialog
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      ref={detailRef}
      className="vstack bg-primary-500 dark:text-primary-100 m-auto size-[95%] max-w-[800px] gap-5 overflow-hidden rounded-lg p-3 md:max-h-[1080px] md:p-5"
    >
      <button
        className="absolute top-0 right-0"
        onClick={() => setIsOpen(false)}
      >
        <FaWindowClose className="text-secondary-600 size-8" />
      </button>
      <h2 className="text-secondary-800 dark:text-primary-400 text-center text-3xl font-bold">
        {project.title[currentLanguage]}
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4 md:gap-6">
        <img
          src={project.thumbnail}
          className="max-h-[180px] w-full rounded-xs object-cover"
        />
        <div className="vstack gap-1">
          <div className="align mb-2 flex-wrap gap-2">
            {Array.isArray(project.tags[currentLanguage])
              ? project.tags[currentLanguage].map((tag, index) => (
                  <span
                    key={index}
                    className="border-secondary-500 text-secondary-700 dark:border-primary-400 dark:text-primary-300 rounded-md border px-2 py-1 text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))
              : null}
          </div>
          <span className="align gap-1">
            <MdDateRange className="text-icon" />
            {t("common.from")}:{" "}
            <time>{formatDate(project.unix_timestamp.from)}</time>
          </span>
          <span className="align gap-1">
            <MdDateRange className="text-icon" />
            {t("common.to")}:{" "}
            <time>
              {formatDate(project.unix_timestamp.to) || t("common.present")}
            </time>
          </span>
          <div className="align mt-auto gap-2">
            <Link
              to={project.external_link.url}
              target="_blank"
              className="align bg-secondary-200 dark:bg-primary-700 gap-1 rounded-md px-2 py-1"
            >
              <FaLink className="text-icon" />
              <span className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold uppercase">
                {project.external_link.type}
              </span>
            </Link>
            {project.video.exists && (
              <Link
                to={project.video.url}
                target="_blank"
                className="align bg-secondary-200 dark:bg-primary-700 gap-1 rounded-md px-2 py-1"
              >
                <FaVideo className="text-icon" />
                <span className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold uppercase">
                  video
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-full grow overflow-y-auto">
        <h3 className="text-secondary-700 dark:text-primary-300 text-center text-xl font-bold uppercase">
          {t("content.project_detail_info_title")}
        </h3>
        <div
          className="htmlFormat"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              project.html_description[currentLanguage],
            ),
          }}
        />
      </div>

      <div className="vstack gap-2">
        <h3 className="text-secondary-700 dark:text-primary-300 font-semibold">
          {t("content.project_detail_tech_title")}
        </h3>
        <DraggableList
          items={project.technologies}
          itemClassName="w-fit text-nowrap shadow-md shadow-secondary-200 p-1 dark:shadow-secondary-800"
        />
      </div>
    </motion.dialog>
  );
};

export default ProjectDetail;
