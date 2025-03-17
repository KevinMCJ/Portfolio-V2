import { Fragment } from "react";
import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  AboutSection,
  ContactSection,
} from "../components/home";

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <div className="vstack gap-14 md:gap-20">
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </div>
    </Fragment>
  );
};

export default Home;
