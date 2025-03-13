import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import programmer from "@/assets/hero-programmer.png";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="grid h-[calc(100dvh-5rem)] max-h-[900px] min-h-[600px] place-content-center items-center justify-items-center gap-10 app-container md:grid-cols-2 md:justify-items-start">
      <div className="md:5 max-w-[600px] text-center md:text-start">
        <span className="text-xl">
          <Trans
            i18nKey="content.hero_welcome"
            components={{ colored: <span className="text-accent" /> }}
          />
        </span>
        <h2 className="text-balance text-4xl font-bold">
          <Trans
            i18nKey="content.hero_role"
            components={{ colored: <span className="text-accent" /> }}
          />
        </h2>
        <p className="mb-8 mt-2 text-balance text-lg">{t("content.hero_paragraph")}</p>
        <a
          href="/src/assets/curriculums/spanish-resume.pdf"
          download
          className="btn inline-block"
        >
          {t("content.hero_download_resume")}
        </a>
        <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
          <Link
            to={"https://www.linkedin.com/in/kevin-mamani-capuma/"}
            target="_blank"
            className="social-btn"
          >
            <FaLinkedin className="size-full" />
          </Link>
          <Link
            to={"https://github.com/kevinMCJ?"}
            target="_blank"
            className="social-btn"
          >
            <FaGithub className="size-full" />
          </Link>
        </div>
      </div>
      <img
        src={programmer}
        className="w-full max-w-[400px] scale-100 md:max-w-[800px]"
      />
    </section>
  );
};

export default HeroSection;
