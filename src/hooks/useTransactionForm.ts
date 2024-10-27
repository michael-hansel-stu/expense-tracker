import { validateTransactionForm } from "@/lib/validation/validateTransactionForm";
import { TransactionFormValues } from "@/types/Transaction";
import { useEffect, useState } from "react";

export const useTransactionForm = (
  onSubmit: (formData: TransactionFormValues) => Promise<void>,
  initialValues: TransactionFormValues
) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target; 
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    const validateErrors = validateTransactionForm(formData);
    if (Object.keys(validateErrors).length > 0) {
      setErrors({ ...validateErrors, global: "please fix the errors above." });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);

      if (!formData.id) {
        setFormData(initialValues);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setErrors({ global: "An error occured while submitting the form." });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    success,
    handleChange,
    handleSubmit,
  };
};
