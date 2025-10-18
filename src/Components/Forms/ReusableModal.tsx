import { useEffect } from "react";
import { useForm, type SubmitHandler} from "react-hook-form";
import FormInput from "../Forms/FormInput";

interface Field {
  name: string;
  label: string;
  type?: string;
  validation?: Record<string, any>;
  placeholder?: string;
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

  // // helper صغير لتحويل errors (type safety)
  // const getError = (name: string): FieldErrors | undefined => {
  //   return (errors as any)[name];
  // };

  const onSubmitHandler: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              register={register(field.name as any, field.validation) as any}
              error={errors[field.name] as undefined}
            />
          ))}

          <div className="flex justify-end gap-3 mt-4">
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
