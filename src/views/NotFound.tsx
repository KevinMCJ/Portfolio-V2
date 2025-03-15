import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      seconds > 0 ? setSeconds((prev) => prev - 1) : navigate("/");
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <main className="grid min-h-screen place-items-center bg-inherit p-4">
      <div className="text-center">
        <h1 className="bg-gradient-to-br from-secondary-300 to-secondary-500 bg-clip-text text-center text-9xl font-bold uppercase text-transparent dark:from-primary-400 dark:to-primary-100/55">
          404
        </h1>
        <h2 className="mb-3 text-3xl font-semibold text-secondary-900 dark:text-primary-200">
          {t("content.not_found_title")}
        </h2>
        <p className="mb-6 text-xl">
          <Trans
            i18nKey="content.not_found_redirect"
            values={{ seconds }}
            components={{
              time: <span className="font-semibold text-secondary-600" />,
            }}
          />
        </p>
        <Link
          to="/"
          className="text-md underline decoration-icon underline-offset-2 hover:decoration-secondary-400"
        >
          {t("content.not_found_link")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
