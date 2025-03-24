import { ReactElement, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoIosSchool } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { BsQuestion } from "react-icons/bs";
import { Experience, ExperienceType, SupportedLanguage } from "@/global/types";

interface TimeLineEventProps {
  item: Experience;
  isEven: boolean;
  index: number;
}

const icon: Record<ExperienceType, ReactElement> = {
  study: <IoIosSchool className="size-full" />,
  work: <MdWork className="size-full" />,
  unknown: <BsQuestion className="size-full" />,
};

const TimelineEvent = ({ item, isEven, index }: TimeLineEventProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  const formatDate = (timestamp?: number, lang: string = currentLanguage) => {
    if (!timestamp) return;
    const date = new Date(timestamp * 1000);
    const monthNames = new Intl.DateTimeFormat(lang, { month: "short" }).format(
      date,
    );
    const year = date.getFullYear();
    const formattedMonth = monthNames.toUpperCase() + ".";
    return `${formattedMonth} ${year}`;
  };

  // ? Fade variants with customizable duration/delay
  const createFadeInVariants = (duration: number, extraDelay: number = 0) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay: index * 0.2 + extraDelay,
        ease: "easeOut",
      },
    },
  });

  const containerVariants = createFadeInVariants(0.5);
  const iconVariants = createFadeInVariants(0.3, 0.1);
  const contentVariants = createFadeInVariants(0.4, 0.2);

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="center relative min-h-28 w-full flex-col gap-3 lg:flex-row lg:gap-[120px]"
    >
      <motion.div
        variants={iconVariants}
        className="center border-secondary-400 bg-secondary-200 text-icon dark:shadow-primary-700 dark:border-primary-400 dark:bg-primary-500 dark:text-primary-400 size-16 min-w-fit rounded-full border-4 p-3 shadow-md lg:absolute lg:order-2 lg:self-start"
      >
        {icon[item.type]}
      </motion.div>

      <motion.span
        variants={contentVariants}
        className={`${isEven ? "lg:order-1" : "lg:order-3"} bg-primary-500 my-5 text-center text-lg font-semibold uppercase lg:order-1 lg:flex-1 lg:self-start`}
      >{`${formatDate(item.unix_timestamp.from)} - ${formatDate(item.unix_timestamp.to) || t("common.always")}`}</motion.span>

      <motion.div
        variants={contentVariants}
        className={`${isEven ? "lg:order-3 lg:items-start" : "lg:order-1 lg:items-end"} w-full lg:flex-1`}
      >
        <div className="bg-secondary-200 dark:bg-primary-700 relative mx-auto w-full max-w-[300px] space-y-2 rounded-md p-4 md:w-full md:max-w-[600px]">
          <div
            className={`top-6 hidden size-0 border-[10px] border-transparent lg:absolute lg:block ${
              isEven
                ? "border-r-secondary-300 dark:border-r-primary-700 -left-5"
                : "border-l-secondary-300 dark:border-l-primary-700 -right-5"
            }`}
          />
          <h2 className="text-center font-bold capitalize md:text-start">
            {item.company || t("common.self_taught")}
          </h2>
          <p className="tracking-tight text-balance md:tracking-normal md:text-wrap">
            {item.description[currentLanguage]}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default TimelineEvent;
