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
        <h1 className="from-secondary-300 to-secondary-500 dark:from-primary-400 dark:to-primary-100/55 bg-linear-to-br bg-clip-text text-center text-9xl font-bold text-transparent uppercase">
          404
        </h1>
        <h2 className="text-secondary-900 dark:text-primary-200 mb-3 text-3xl font-semibold">
          {t("content.not_found_title")}
        </h2>
        <p className="mb-6 text-xl">
          <Trans
            i18nKey="content.not_found_redirect"
            values={{ seconds }}
            components={{
              time: <span className="text-secondary-600 font-semibold" />,
            }}
          />
        </p>
        <Link
          to="/"
          className="text-md decoration-icon hover:decoration-secondary-400 underline underline-offset-2"
        >
          {t("content.not_found_link")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
