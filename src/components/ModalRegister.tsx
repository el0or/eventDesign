import React from 'react';
import ReactModal from 'react-modal';

interface ModalRegisterProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ isOpen, onRequestClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Register Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Регистрация</h2>
            {/* Add your registration form here */}
            <button onClick={onRequestClose}>Закрыть</button>
        </ReactModal>
    );
};

export default ModalRegister;