import React, { useState } from 'react';

function ProductCard({ product, selectedAmount, handleAmountChange, handleReserve, index }) {
  const [errorMessage, setErrorMessage] = useState('');

  const onReserveClick = () => {
    if (selectedAmount <= 0) {
      setErrorMessage('Please select a valid amount.');
    } else if (selectedAmount > product.availableAmount) {
      setErrorMessage('Not enough stock available.');
    } else {
      setErrorMessage('');
      handleReserve(index);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <div className="product-header">
          <h2>{product.name}</h2>
          <p className="price">{product.price}</p>
        </div>
        <div className="product-meta">
          <p>Expiry Date: {product.expiryDate}</p>
          <p>Available: {product.availableAmount}</p>
        </div>
      </div>
      <div className="product-actions">
        <input
          type="number"
          min="1"
          max={product.availableAmount}
          value={selectedAmount}
          onChange={(e) => handleAmountChange(index, Number(e.target.value))}
          placeholder="Enter amount to reserve"
        />
        <button onClick={onReserveClick}>Reserve</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProductCard;
