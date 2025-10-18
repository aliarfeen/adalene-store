interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  text,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        border-2 border-solid py-3 px-6 mt-3 rounded transition-all duration-200 
        ${disabled 
          ? "border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed" 
          : "border-orange-800 text-orange-800 hover:bg-orange-800 hover:text-white"} 
        ${className}
      `}
    >
      {text}
    </button>
  );
};
