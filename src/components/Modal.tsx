import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="w-1/2 h-1/2 p-5 bg-gray-900 bg-opacity-50 text-gray-400 rounded backdrop-blur-sm"
    >
      {children}
      <button className=" bg-red-950 p-2 rounded " onClick={onClose}>
        Close
      </button>
    </dialog>
  );
};

export default Modal;
