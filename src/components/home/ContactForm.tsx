import { ContactData, ContactFormErrors } from "@/global/types";
import { FormEvent, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { FaCircleCheck, FaFaceSadTear } from "react-icons/fa6";
import { contactValidator } from "@/utils/validators";
import emailjs from "@emailjs/browser";

type SubmitStatus = "success" | "error" | null;

const initialData = { name: "", email: "", message: "" };
const initialTouched = { name: false, email: false, message: false };

const ContactForm = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContactData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const resetForm = () => {
    setData(initialData);
    setTouched(initialTouched);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);

    // * Validate field only if was touched
    if (touched[name as keyof ContactData]) {
      const fieldToValidate = { ...data, [name]: value };
      setErrors((prev) => ({
        ...prev,
        ...contactValidator(fieldToValidate),
      }));
    }
  };

  // * Handle touched field status on focus
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldToValidate = { ...data };
    setErrors((prev) => ({
      ...prev,
      ...contactValidator(fieldToValidate),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    const submitErrors = contactValidator(data);
    setErrors(submitErrors);
    if (Object.keys(submitErrors).length) return;

    try {
      setIsSubmitting(true);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { ...data },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );

      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
            className={`${errors.name && touched.name ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500 disabled:opacity-60"} placeholder:text-secondary-800/80 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 w-full rounded-xs border-b-4 p-2 placeholder:capitalize focus:outline-hidden`}
            type="text"
            name="name"
            placeholder={t("common.name")}
            disabled={isSubmitting}
            value={data.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>
        <div>
          <input
            className={`${errors.email && touched.email ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} placeholder:text-secondary-800/80 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 w-full rounded-xs border-b-4 p-2 placeholder:capitalize focus:outline-hidden disabled:opacity-60`}
            type="text"
            name="email"
            placeholder={t("common.email")}
            disabled={isSubmitting}
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
      </div>
      <div>
        <textarea
          className={`${errors.message && touched.message ? "border-b-red-500" : "border-b-icon/40 focus:border-b-icon dark:border-b-secondary-500/40 dark:focus:border-b-secondary-500"} placeholder:text-secondary-800/80 dark:bg-primary-100 dark:text-primary-800 dark:placeholder:text-primary-800/70 w-full resize-none rounded-xs border-b-4 p-2 placeholder:capitalize focus:outline-hidden disabled:opacity-60`}
          name="message"
          rows={8}
          placeholder={t("common.message")}
          disabled={isSubmitting}
          value={data.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.message && touched.message && (
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
          className="bg-icon text-primary-50 dark:bg-primary-800 flex max-w-fit cursor-pointer items-center gap-2 rounded-md px-4 py-2 capitalize disabled:cursor-not-allowed disabled:opacity-60 min-[840px]:order-1"
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
