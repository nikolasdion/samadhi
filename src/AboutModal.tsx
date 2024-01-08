import Modal from "./components/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-justify p-4">
        <ul>
          <li>
            <a href="https://github.com/nikolasdion/samadhi">GitHub</a>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default AboutModal;
