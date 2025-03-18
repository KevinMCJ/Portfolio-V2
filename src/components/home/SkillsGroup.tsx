import { useTranslation } from "react-i18next";
import { SkillGroup } from "@/global/types";

interface SkillsGroupProps {
  skills: SkillGroup;
}

const SkillsGroup = ({ skills }: SkillsGroupProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="dark:via-primary-400/4 w-full overflow-hidden rounded-md bg-gradient-to-br from-secondary-200 via-secondary-100 to-secondary-300/50 p-4 shadow-[-18px_15px_20px_-18px] shadow-primary-600 dark:from-primary-700/80 dark:via-primary-800/80 dark:to-primary-900/60 dark:shadow-primary-800 md:h-[400px]">
      <h3 className="mb-5 bg-gradient-to-r from-secondary-900 to-secondary-400 bg-clip-text text-center text-2xl font-bold uppercase text-transparent dark:from-primary-900 dark:via-primary-200 dark:to-primary-800">
        {typeof skills.category === "string"
          ? skills.category
          : skills.category[i18n.language]}
      </h3>
      <div className="flex flex-wrap place-content-center gap-10 md:gap-14 md:gap-y-10">
        {skills.technologies.map((tech) => (
          <div
            key={tech.name}
            className="vstack items-center justify-center gap-1"
          >
            <img src={tech.icon} alt={tech.name} className="size-12" />
            <span className="font-semibold uppercase">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGroup;
