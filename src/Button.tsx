interface Props {
  onClick: () => void;
  text: string;
}

const Button: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button
      className={
        "w-32 h-auto px-3 py-2 m-4 text-lg rounded border-2 border-gray-400 hover:border-gray-300 hover:text-gray-300 hover:bg-opacity-15 hover:bg-white bg-transparent"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
