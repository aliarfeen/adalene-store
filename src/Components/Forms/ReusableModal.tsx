import { useForm} from "react-hook-form";
import type {SubmitHandler } from "react-hook-form";
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
}

const ReusableModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
}: ReusableModalProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>

        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<T>)}
          className="space-y-5"
        >
          {fields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              register={register(field.name as any, field.validation)}
              error={errors[field.name]}
            />
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
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
};

export default ReusableModal;
