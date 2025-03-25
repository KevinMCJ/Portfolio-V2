import { useTranslation } from "react-i18next";
import data from "@/utils/skills.json";
import SkillsGroup from "./SkillsGroup";

const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="lg:section-max-h app-container">
      <h2 className="section-title">{t("content.skills_title")}</h2>
      <div className="grid items-center justify-items-center gap-5 md:grid-cols-2">
        {data.skills.map((skills, index) => (
          <SkillsGroup key={index} skills={skills} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
