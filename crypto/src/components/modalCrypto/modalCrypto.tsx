import React from 'react';

type CryptoModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  crypto: Crypto; // Add crypto prop of type Crypto
};

interface Crypto {
  id: string;
  name: string;
  quantity: number;
}

const ModalCrypto: React.FC<CryptoModalProps> = ({ children, onClose, isOpen, title, crypto }) => { // Pass crypto as a prop

  const [quantity, setQuantity] = React.useState<string>('');

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleSaveClick = () => {
    // Проверяем, что введенное значение является числом
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity)) {
      alert('Please enter a valid quantity.');
      return;
    }

    // Сохраняем данные в localStorage
    const storedCryptos = JSON.parse(localStorage.getItem('cryptos') || '[]');
    const updatedCryptos = storedCryptos.map((storedCrypto: Crypto) => {
      if (storedCrypto.id === crypto.id) {
        return { ...storedCrypto, quantity: storedCrypto.quantity + parsedQuantity };
      } else {
        return storedCrypto;
      }
    });
    localStorage.setItem('cryptos', JSON.stringify(updatedCryptos));

    // Закрываем модальное окно
    onClose();
  };

  return (
    <div>
      <h2>Add Quantity for {crypto.name}</h2>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ModalCrypto;
