import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';



const ProductItem = ({ product, onProductUpdated }) => {
  const { id, name, image, price, description } = product;
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setEditedName(value);
    } else if (name === 'price') {
      setEditedPrice(value);
    } else if (name === 'description') {
      setEditedDescription(value);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);

    try {
      let imageUrl = image; // Use existing image if not changed

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await axios.post(
          `${process.env.FRONTEND_URL}/api/upload`,
          formData
        );
        imageUrl = imageResponse.data.imageUrl;
      }

      const productResponse = await axios.put(
        `http://localhost:3000/product/${product.id}`,
        {
          name: editedName,
          price: editedPrice,
          image: imageUrl,
          description: editedDescription,
        }
      );

      if (!productResponse.ok) {
        throw new Error('Failed to update product on server');
      }

      toast.success('Product updated successfully!');
      onProductUpdated(product.id, productResponse.data);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="product-item">
      <img src={image} alt={name} />
      <input type="text" name="name" value={editedName} onChange={handleInputChange} />
      <input type="number" name="price" value={editedPrice} onChange={handleInputChange} />
      <textarea name="description" value={editedDescription} onChange={handleInputChange} />
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button onClick={handleSave} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

// ... (UpdateProduct component remains the same)


const Updateproduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ... (fetchProducts function remains the same)
  }, []);

  const handleProductUpdated = (productId, updatedProduct) => {
    setProducts(prevProducts => prevProducts.map(product => 
        product.id === productId ? updatedProduct : product
      )
    );
  };

  return (
    <div>
      <h2>Update Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onProductUpdated={handleProductUpdated} 
          />
        ))}
      </div>
    </div>
  );
};

export default Updateproduct;
