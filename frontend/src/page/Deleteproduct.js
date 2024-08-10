import React from 'react';
import { toast } from 'react-hot-toast';

const handleDeleteProduct = async (productId) => {
  try {
    const response = await fetch(`${process.env.FRONTEND_URL}/product/${productId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    toast(data.message);
    // Cập nhật giao diện người dùng hoặc load lại danh sách sản phẩm nếu cần thiết
  } catch (error) {
    console.error(error);
    toast.error('Failed to delete product');
  }
};

const ProductItem = ({ product }) => {
  const { id, name, image, price, description } = product;

  return (
    <div className="product-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={() => handleDeleteProduct(id)}>Delete</button>
    </div>
  );
};

export default ProductItem;
