import { useTranslation } from "react-i18next";
import TimelineEvent from "../TimelineEvent";
import data from "@/utils/experience.json";

const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="app-container">
      <h2 className="section-title">{t("experience-title")}</h2>
      <div className="center relative mx-auto flex-col gap-12 md:w-[90%]">
        <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 transform bg-primary-300" />
        {data.items.map((item, index) => (
          <TimelineEvent item={item} key={index} isEven={index % 2 == 0} />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
