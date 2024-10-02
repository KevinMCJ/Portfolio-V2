import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Project } from "@/global/types";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";

interface ProjectDetailProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  project: Project;
}

const ProjectDetail = ({ isOpen, setIsOpen, project }: ProjectDetailProps) => {
  const { i18n } = useTranslation();
  const detailRef = useRef<HTMLDialogElement | null>(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (!detailRef) return;

    if (isOpen) {
      detailRef.current?.showModal();
    } else {
      detailRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <motion.dialog
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      ref={detailRef}
      className="vstack size-[95%] max-w-[800px] overflow-hidden rounded-lg p-3 md:max-h-[1080px]"
    >
      <button
        className="debug absolute right-0 top-0"
        onClick={() => setIsOpen(false)}
      >
        close
      </button>
      <h2 className="debug text-center text-3xl">
        {project.title[currentLanguage]}
      </h2>
      <div className="debug grid lg:grid-cols-2">
        <img src={project.thumbnail} className="debug max-h-[180px]" />
        <div className="vstack debug">
          <span>project tags</span>
          <span>
            from <time>date</time>
          </span>
          <span>
            to <time>date</time>
          </span>
          <div className="debug">
            <button className="debug">demo</button>
            <button className="debug">yt video or something</button>
          </div>
        </div>
      </div>
      <div className="debug max-h-full grow overflow-y-auto">
        <h3>Details</h3>
        <div
          className="htmlFormat"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              project.htmlDescription[currentLanguage],
            ),
          }}
        />
      </div>
      <div className="debug">
        <h3>Tech stack</h3>
        <div>tech tags moving around</div>
      </div>
    </motion.dialog>
  );
};

export default ProjectDetail;
