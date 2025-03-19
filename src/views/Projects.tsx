import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <div className="center min-h-screen">
      <h2 className="section-title font-semibold tracking-wide">
        {t("content.v_projects_provisional")}
      </h2>
    </div>
  );
};

export default Projects;
