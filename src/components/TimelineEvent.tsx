import { Experience } from "@/global/types";
import { IoIosSchool } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { BsQuestion } from "react-icons/bs";

interface TimeLineEventProps {
  item: Experience;
  isEven: boolean;
}

type ExperienceType = "study" | "work" | "unknown";

const icon = {
  study: <IoIosSchool className="size-full" />,
  work: <MdWork className="size-full" />,
  unknown: <BsQuestion className="size-full" />,
};

const TimelineEvent = ({ item, isEven }: TimeLineEventProps) => {
  const type = item.type as ExperienceType;

  return (
    <article className="center relative w-full flex-col gap-3 lg:flex-row lg:gap-[120px]">
      <div className="debug center size-16 min-w-fit rounded-full p-3 lg:absolute lg:order-2 lg:self-start">
        {icon[type]}
      </div>
      <span
        className={`${isEven ? "lg:order-1" : "lg:order-3"} my-5 text-center font-medium uppercase lg:order-1 lg:flex-1 lg:self-start`}
      >{`${item.from} - ${item.to}`}</span>
      <div
        className={`${isEven ? "lg:order-3" : "lg:order-1"} w-full lg:flex-1`}
      >
        <div
          className={`${isEven ? "lg:ml-auto" : "lg:mr-auto"} debug relative mx-auto w-full max-w-[300px] space-y-2 rounded-md p-4 md:w-full md:max-w-[600px]`}
        >
          <div
            className={`top-6 hidden size-0 border-[10px] border-transparent lg:absolute lg:block ${
              isEven
                ? "-left-5 border-r-stone-500"
                : "-right-5 border-l-stone-500"
            }`}
          />
          <h2 className="text-center font-bold capitalize md:text-start">
            {item.company}
          </h2>
          <p className="hidden md:block">{item.description}</p>
        </div>
      </div>
    </article>
  );
};

export default TimelineEvent;
