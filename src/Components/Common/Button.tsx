interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string; 
  type?: "button" | "submit" | "reset"; 
}

export const Button = ({ text, onClick, className = "", type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 border-solid border-orange-800 text-orange-800 py-3 px-6 mt-3 rounded transition-all duration-200 hover:bg-orange-800 hover:text-white ${className}`}
    >
      {text}
    </button>
  );
};
