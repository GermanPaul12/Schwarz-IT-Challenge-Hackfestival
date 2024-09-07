import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, selectedAmount, handleAmountChange, handleReserve, index }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <div className="product-header">
          <h2>{product.name}</h2>
          <p className="price">{product.price}</p>
        </div>
        <p>Grab until: {product.expiryDate}</p>
        <p>Available Amount: {product.availableAmount} kg</p>
        <div className="product-actions">
          <input
            type="number"
            value={selectedAmount}
            min="0"
            max={product.availableAmount}
            onChange={(e) => handleAmountChange(index, Number(e.target.value))}
            placeholder="Amount"
          />
          <button onClick={() => handleReserve(index)}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
