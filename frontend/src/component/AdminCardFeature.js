import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCardFeature = ({ id, image, name, price, category, loading }) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedImage, setEditedImage] = useState(image);
  const [editedCategory, setEditedCategory] = useState(category);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Gửi yêu cầu cập nhật sản phẩm tới máy chủ
      await axios.put(`http://localhost:3000/product/${id}`, {
        name: editedName,
        price: editedPrice,
        image: editedImage,
        category: editedCategory
      });
      alert("Cập nhật sản phẩm thành công");
      setIsEditing(false);
      // Thực hiện các hành động cần thiết sau khi cập nhật sản phẩm
    } catch (error) {
      console.error("Cập nhập sản phẩm thành công", error);
      alert("Cập nhập sản phẩm thành công");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      try {
        // Gửi yêu cầu xóa sản phẩm tới máy chủ
        await axios.delete(`http://localhost:3000/product/${id}`);
        alert("Xóa sản phẩm thành công");
        // Thực hiện các hành động cần thiết sau khi xóa sản phẩm
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Xóa sản phẩm thành công");
      }
    }
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full mb-2"
          />
          <input
            type="text"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            className="w-full mb-2"
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="w-full mb-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-2"
          />
          {editedImage && (
            <img src={editedImage} alt="Preview" className="h-28 mt-2" />
          )}
          <div className="flex justify-between mt-2">
            <button onClick={handleSave} className="bg-green-500 text-white py-1 px-2 rounded">
              Lưu
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white py-1 px-2 rounded">
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <>
          {image ? (
            <>
              <Link
                to={`/productlist/${id}`}
                onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
              >
                <div className="h-28 flex flex-col justify-center items-center">
                  <img src={image} className="h-full" alt={name} />
                </div>
                <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
                  {name}
                </h3>
                <p className="text-slate-500 font-medium">{category}</p>
                <p className="font-bold">
                  <span className="text-red-500">₫</span>
                  <span>{price}</span>
                </p>
              </Link>
              <div className="flex justify-between mt-2">
                <button onClick={handleEdit} className="bg-blue-500 text-white py-1 px-2 rounded">
                  Sửa
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white py-1 px-2 rounded">
                  Xóa
                </button>
              </div>
            </>
          ) : (
            <div className="min-h-[150px] flex justify-center items-center">
              <p>{loading}</p>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AdminCardFeature;
