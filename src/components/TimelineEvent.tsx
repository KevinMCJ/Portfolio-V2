import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoIosSchool } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { BsQuestion } from "react-icons/bs";
import { Experience } from "@/global/types";

interface TimeLineEventProps {
  item: Experience;
  isEven: boolean;
}

const icon = {
  study: <IoIosSchool className="size-full" />,
  work: <MdWork className="size-full" />,
  unknown: <BsQuestion className="size-full" />,
};

const TimelineEvent = ({ item, isEven }: TimeLineEventProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const formatDate = (timestamp?: number, lang: string = currentLanguage) => {
    if (!timestamp) return;
    const date = new Date(timestamp * 1000);
    const monthNames = new Intl.DateTimeFormat(lang, { month: "short" }).format(date);
    const year = date.getFullYear();
    const formattedMonth = monthNames.toUpperCase() + ".";
    return `${formattedMonth} ${year}`;
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="center relative min-h-28 w-full flex-col gap-3 lg:flex-row lg:gap-[120px]"
    >
      <div className="center size-16 min-w-fit rounded-full border-4 border-secondary-400 bg-secondary-200 p-3 text-icon shadow-md dark:border-primary-400 dark:bg-primary-500 dark:text-primary-400 lg:absolute lg:order-2 lg:self-start">
        {icon[item.type]}
      </div>
      <span
        className={`${isEven ? "lg:order-1" : "lg:order-3"} my-5 bg-primary-500 text-center text-lg font-semibold uppercase lg:order-1 lg:flex-1 lg:self-start`}
      >{`${formatDate(item.unix_timestamp.from)} - ${formatDate(item.unix_timestamp.to) || t("common.always")}`}</span>
      <div
        className={`${isEven ? "lg:order-3 lg:items-start" : "lg:order-1 lg:items-end"} w-full lg:flex-1`}
      >
        <div className="relative mx-auto w-full max-w-[300px] space-y-2 rounded-md bg-secondary-200 p-4 dark:bg-primary-700 md:w-full md:max-w-[600px]">
          <div
            className={`top-6 hidden size-0 border-[10px] border-transparent lg:absolute lg:block ${
              isEven
                ? "-left-5 border-r-secondary-300 dark:border-r-primary-700"
                : "-right-5 border-l-secondary-300 dark:border-l-primary-700"
            }`}
          />
          <h2 className="text-center font-bold capitalize md:text-start">
            {item.company || t("common.self_taught")}
          </h2>
          <p className="text-balance tracking-tight md:text-wrap md:tracking-normal">
            {item.description[currentLanguage]}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default TimelineEvent;
