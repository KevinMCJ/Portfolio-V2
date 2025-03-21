import { Experience } from "@/global/types";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { validateExperience } from "@/utils/validators";
import { motion, useInView } from "framer-motion";
import TimelineEvent from "../TimelineEvent";
import data from "@/utils/experience.json";

const items = data.items.filter(validateExperience) as Experience[];

const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeInOut",
    },
  },
};

const ExperienceSection = () => {
  const { t } = useTranslation();
  const lineRef = useRef(null);
  const isLineInView = useInView(lineRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <section id="experience" className="app-container">
      <h2 className="section-title">{t("content.experience_title")}</h2>
      <div className="center relative mx-auto flex-col gap-12 md:w-[90%]">
        <motion.div
          ref={lineRef}
          className="absolute left-1/2 top-6 z-0 h-full w-1 -translate-x-1/2 transform rounded-md bg-secondary-400 dark:bg-primary-400"
          initial="hidden"
          animate={isLineInView ? "visible" : "hidden"}
          variants={lineVariants}
        />
        {items.map((item, index) => (
          <TimelineEvent
            item={item}
            key={index}
            isEven={index % 2 == 0}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
