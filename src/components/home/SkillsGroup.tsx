import { useTranslation } from "react-i18next";
import { SkillGroup, SupportedLanguage } from "@/global/types";

interface SkillsGroupProps {
  skills: SkillGroup;
}

const SkillsGroup = ({ skills }: SkillsGroupProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="from-secondary-200 via-secondary-100 to-secondary-300/50 shadow-primary-600 dark:from-primary-700/80 dark:via-primary-800/80 dark:to-primary-900/60 dark:shadow-primary-800 w-full overflow-hidden rounded-md bg-gradient-to-br p-4 shadow-[-18px_15px_20px_-18px] md:h-[400px]">
      <h3 className="from-secondary-900 to-secondary-400 dark:from-primary-900 dark:via-primary-200 dark:to-primary-800 mb-5 bg-gradient-to-r bg-clip-text text-center text-2xl font-bold text-transparent uppercase">
        {typeof skills.category === "string"
          ? skills.category
          : skills.category[i18n.language as SupportedLanguage]}
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
