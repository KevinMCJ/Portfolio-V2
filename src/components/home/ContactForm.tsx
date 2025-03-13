import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

const ContactForm = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactData>>({});

  const validate = (data: ContactData) => {
    let errors: Partial<ContactData> = {};

    if (!data.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (data.name.trim().length > 50) {
      errors.name = "No puede tener mas de 50 caracteres";
    }

    if (!data.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = "No es un email valido";
    }

    if (!data.message.trim()) {
      errors.message = "El mensaje es requerido";
    } else if (data.message.trim().length > 1500) {
      errors.message = "No puede tener mas de 1500 caracteres";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const newData = {
      ...data,
      [name]: value,
    };

    setErrors(validate(newData));
    setData(newData);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submitErrors = validate(data);
    setErrors(submitErrors);

    if (!Object.keys(submitErrors).length) {
      alert(JSON.stringify(data));
    }
  };

  return (
    <form
      className="mx-auto my-10 grid max-w-[680px] gap-4 text-inherit"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            className={`${errors.name ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
            type="text"
            name="name"
            placeholder={t("common.name")}
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>
        <div>
          <input
            className={`${errors.email ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
            type="text"
            name="email"
            placeholder={t("common.email")}
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
      </div>
      <div>
        <textarea
          className={`${errors.message ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
          name="message"
          rows={8}
          placeholder={t("common.message")}
          value={data.message}
          onChange={handleChange}
        />
        {errors.message && (
          <span className="text-sm text-red-500">{errors.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="flex max-w-fit cursor-pointer items-center gap-2 rounded-md bg-icon px-4 py-2 capitalize text-primary-50 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-800"
        disabled={Object.keys(errors).length ? true : false}
      >
        {t("common.send")}
        <IoSend className="icon" />
      </button>
    </form>
  );
};

export default ContactForm;
