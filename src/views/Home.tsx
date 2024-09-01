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
    <div className="vstack">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;
