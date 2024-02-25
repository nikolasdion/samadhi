interface Props {
  onClick: () => void;
  text: string;
}

const Button: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button
      className={
        "m-4 h-auto w-32 rounded border-2 border-white border-opacity-30 bg-white bg-opacity-0 px-3 py-2 text-lg hover:border-opacity-50 hover:bg-opacity-15 "
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
