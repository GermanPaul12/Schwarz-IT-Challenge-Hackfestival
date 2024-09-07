import { useState } from 'react';
import './App.css';
import ProductCard from './ProductCard';

function App() {
  const initialProducts = [
    {
      name: 'Strawberries',
      price: '5€/kg',
      expiryDate: '09.09.2024',
      image: 'src/assets/strawberries.jpg',
      availableAmount: 100, // Make availableAmount a number
    },
    {
      name: 'Olive Oil',
      price: '6.99€/l',
      expiryDate: '10.09.2024',
      image: 'src/assets/olive_oil.jpg',
      availableAmount: 50, // Make availableAmount a number
    },
    {
      name: 'Bananas',
      price: '1.39€/kg',
      expiryDate: '09.09.2024',
      image: 'src/assets/bananas.jpg',
      availableAmount: 75, // Make availableAmount a number
    },
    {
      name: 'Product 4',
      price: '$25.00',
      expiryDate: '2024-10-20',
      image: 'https://via.placeholder.com/150',
      availableAmount: 120,
    },
    {
      name: 'Product 5',
      price: '$50.00',
      expiryDate: '2025-05-05',
      image: 'https://via.placeholder.com/150',
      availableAmount: 30,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedAmounts, setSelectedAmounts] = useState(Array(products.length).fill(0));

  const handleAmountChange = (index, value) => {
    const newSelectedAmounts = [...selectedAmounts];
    newSelectedAmounts[index] = value;
    setSelectedAmounts(newSelectedAmounts);
  };

  const handleReserve = (index) => {
    const amountToReserve = selectedAmounts[index];
    const available = products[index].availableAmount;

    if (amountToReserve > 0 && amountToReserve <= available) {
      const updatedProducts = [...products];
      updatedProducts[index].availableAmount -= amountToReserve;
      setProducts(updatedProducts);
      handleAmountChange(index, 0); // Reset amount after reservation
    }
  };

  return (
    <div className="App">
      <h1>B2B Schwarz Dashboard for Upcycling</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            selectedAmount={selectedAmounts[index]}
            handleAmountChange={handleAmountChange}
            handleReserve={handleReserve}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
