import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../Forms/FormInput";

interface Option {
  label: string;
  value: string;
}

interface Field {
  name: string;
  label: string;
  type?: string;
  validation?: Record<string, any>;
  placeholder?: string;
  options?: Option[]; //  for select dropdown
}

interface ReusableModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  title: string;
  fields: Field[];
  initialValues?: Partial<T>;
}

function ReusableModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialValues,
}: ReusableModalProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    defaultValues: (initialValues || {}) as any,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues as T);
    } else {
      reset({} as T);
    }
  }, [initialValues, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset(initialValues ? (initialValues as T) : ({} as T));
    }
  }, [isOpen, initialValues, reset]);

  if (!isOpen) return null;

  const onSubmitHandler: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 text-center sticky top-0 bg-white z-10 pb-2">
          {title}
        </h2>

        {/* Scrollable content */}
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="space-y-5 overflow-y-auto pr-2 flex-1"
        >
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "select" && field.options ? (
                <>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <select
                    {...register(field.name as any, field.validation)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-[#a25a2a]/40"
                    defaultValue={initialValues?.[field.name] || ""}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {(errors[field.name] as any)?.message}
                    </p>
                  )}
                </>
              ) : (
                <FormInput
                  label={field.label}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  register={register(field.name as any, field.validation) as any}
                  error={errors[field.name] as undefined}
                />
              )}
            </div>
          ))}

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 mt-4 sticky bottom-0 bg-white pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset(initialValues ? (initialValues as T) : ({} as T));
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#a25a2a] hover:bg-[#5c3317] text-white font-semibold transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReusableModal;
