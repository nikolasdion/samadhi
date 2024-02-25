import { useEffect, useRef } from "react";
import Button from "./Button";

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
      className="h-1/2 w-1/2 rounded bg-gray-900 bg-opacity-50 p-5 text-gray-400 backdrop-blur-sm"
    >
      {children}
      <Button onClick={onClose} text="Close" />
    </dialog>
  );
};

export default Modal;
