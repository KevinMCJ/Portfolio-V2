import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import programmer from "/hero-programmer.webp";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="app-container grid h-[calc(100dvh-5rem)] max-h-[900px] min-h-[600px] place-content-center items-center justify-items-center gap-10 md:grid-cols-2 md:justify-items-start">
      <div className="md:5 max-w-[600px] text-center md:text-start">
        <span className="text-xl">
          <Trans
            i18nKey="content.hero_welcome"
            components={{ colored: <span className="text-accent" /> }}
          />
        </span>
        <h2 className="text-4xl font-bold text-balance">
          <Trans
            i18nKey="content.hero_role"
            components={{ colored: <span className="text-accent" /> }}
          />
        </h2>
        <p className="mt-2 mb-8 text-lg text-balance">
          {t("content.hero_paragraph")}
        </p>
        <a
          href="/curriculums/Kevin_Mamani_Spanish_CV.pdf"
          download
          className="btn text-primary-50 inline-flex items-center gap-2"
        >
          {t("content.hero_download_resume")}
          <HiOutlineDownload className="size-6" />
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
        alt={t("content.hero_img_alt")}
        className="w-full max-w-[400px] scale-100 md:max-w-[800px]"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
    </section>
  );
};

export default HeroSection;
