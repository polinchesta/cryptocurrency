import React, { useState, useContext, useEffect } from 'react';
import { ModalProps } from '../../types/ModalTypes';
import './Modal.scss';

interface ModalContextValue {
    quantity: string;
    setQuantity: (value: string) => void;
}

const ModalContext = React.createContext<ModalContextValue>({
    quantity: '',
    setQuantity: () => { },
});

const Modal: React.FC<ModalProps> = ({ onClose, isOpen, title, assetId }) => {
    const [quantity, setQuantity] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^(0(\.\d{0,3})?|[1-9]\d*(\.\d{0,3})?)$/.test(value) || value === '') {
            setQuantity(value);
        }
    };
    
    const handleSave = () => {
        localStorage.setItem(assetId, quantity);
        window.location.reload();
        onClose();
        setQuantity('');
    };


    if (!isOpen) {
        return null;
    }

    return (
        <ModalContext.Provider value={{ quantity, setQuantity }}>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-close" onClick={onClose}>
                            &times;
                        </div>
                        <div className="modal-title">{title}</div>
                        <div className="modal-body">
                            <label>Введите количество:</label>
                            <input
                                className="modal-text"
                                type="text"
                                value={quantity === '' ? '' : quantity.toString()}
                                onChange={handleChange}
                            />
                            <button className="modal-save" onClick={handleSave} type="button">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-overlay"></div>
            </div>
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    return useContext(ModalContext);
};

export default Modal;
