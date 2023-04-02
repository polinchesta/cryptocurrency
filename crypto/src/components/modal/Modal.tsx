import React from 'react'
import './Modal.scss'

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    title: string;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, isOpen, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-close" onClick={onClose}>
                    &times;
                </div>
                <div className="modal-title">{title}</div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};


export default Modal;