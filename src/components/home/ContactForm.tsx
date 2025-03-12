import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form className="mx-auto my-10 grid max-w-[680px] gap-4 text-inherit">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            className="w-full rounded-sm border-b-4 border-b-icon/40 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:border-b-icon focus:outline-none dark:border-b-secondary-500/40 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 dark:focus:border-b-secondary-500"
            type="text"
            name="name"
            placeholder={t("name")}
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="w-full rounded-sm border-b-4 border-b-icon/40 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:border-b-icon focus:outline-none dark:border-b-secondary-500/40 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 dark:focus:border-b-secondary-500"
            type="text"
            name="email"
            placeholder={t("email")}
            value={data.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <textarea
          className="w-full rounded-sm border-b-4 border-b-icon/40 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:border-b-icon focus:outline-none dark:border-b-secondary-500/40 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 dark:focus:border-b-secondary-500"
          name="message"
          rows={8}
          placeholder={t("message")}
          value={data.message}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="flex max-w-fit items-center gap-2 rounded-md bg-icon px-4 py-2 capitalize text-primary-50 dark:bg-primary-800"
      >
        {t("send")}
        <IoSend className="icon" />
      </button>
    </form>
  );
};

export default ContactForm;
