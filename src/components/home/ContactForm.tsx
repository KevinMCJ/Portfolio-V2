import { FormEvent, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { FaCircleCheck, FaFaceSadTear } from "react-icons/fa6";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const initialData = { name: "", email: "", message: "" };
const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
type SubmitStatus = "success" | "error" | null;

const ContactForm = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactData>(initialData);
  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const validate = (data: ContactData) => {
    let errors: Partial<ContactData> = {};

    if (!data.name.trim()) {
      errors.name = t("errors.name.required");
    } else if (data.name.trim().length > 50) {
      errors.name = t("errors.common.max_length", { max: 50 });
    }

    if (!data.email.trim()) {
      errors.email = t("errors.email.required");
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = t("errors.email.invalid");
    }

    if (!data.message.trim()) {
      errors.message = t("errors.message.required");
    } else if (data.message.trim().length > 1500) {
      errors.message = t("errors.common.max_length", { max: 1500 });
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const newData = {
      ...data,
      [name]: value,
    };

    setErrors(validate(newData));
    setData(newData);
  };

  const resetForm = () => {
    setData(initialData);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submitErrors = validate(data);
    setErrors(submitErrors);
    if (Object.keys(submitErrors).length) return;

    try {
      setIsSubmitting(true);
      await sleep(2000);
      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // ? After 2,5 seconds the message will dis
      setTimeout(() => setSubmitStatus(null), 2500);
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
            className={`${errors.name ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon disabled:opacity-60 dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
            type="text"
            name="name"
            placeholder={t("common.name")}
            disabled={isSubmitting}
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>
        <div>
          <input
            className={`${errors.email ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none disabled:opacity-60 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
            type="text"
            name="email"
            placeholder={t("common.email")}
            disabled={isSubmitting}
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
          className={`${errors.message ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} w-full rounded-sm border-b-4 p-2 placeholder:capitalize placeholder:text-secondary-800/80 focus:outline-none disabled:opacity-60 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70`}
          name="message"
          rows={8}
          placeholder={t("common.message")}
          disabled={isSubmitting}
          value={data.message}
          onChange={handleChange}
        />
        {errors.message && (
          <span className="text-sm text-red-500">{errors.message}</span>
        )}
      </div>
      <div className="vstack gap-6 min-[840px]:flex-row min-[840px]:justify-between">
        {submitStatus && (
          <div
            className={`flex items-center gap-3 text-sm min-[840px]:order-2 ${submitStatus === "success" ? "text-green-600 dark:text-green-500" : "text-red-500"}`}
          >
            {submitStatus === "success" ? (
              <FaCircleCheck className="size-6 text-lg" />
            ) : (
              <FaFaceSadTear className="size-6 text-lg" />
            )}
            <span>
              {submitStatus === "success" ? t("form.success") : t("form.error")}
            </span>
          </div>
        )}
        <button
          type="submit"
          className="flex max-w-fit cursor-pointer items-center gap-2 rounded-md bg-icon px-4 py-2 capitalize text-primary-50 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-800 min-[840px]:order-1"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          {isSubmitting ? (
            <Fragment>
              {t("common.sending") + "..."}
              <div className="size-4 animate-spin rounded-full border-2 border-inherit border-t-transparent"></div>
            </Fragment>
          ) : (
            <Fragment>
              {t("common.send")}
              <IoSend className="icon" />
            </Fragment>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
