export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    title: string;
    assetId: string;
    children?: React.ReactNode;
}

export interface Currency {
    currencyId: string;
    quantity: string;
    price: number;
}
