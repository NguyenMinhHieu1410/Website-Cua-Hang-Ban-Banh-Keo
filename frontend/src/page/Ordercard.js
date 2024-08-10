import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Ordercard = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-slate-600">Hóa Đơn Thanh Toán</h2>
      <div className="mt-4 bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">Thông tin khách hàng</h3>
          <p>Tên: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Sản phẩm đã mua</h3>
          <ul>
            {productCartItem.map((item) => (
              <li key={item._id} className="border-b py-2">
                <p>{item.name}</p>
                <p>Giá: <span className="text-red-500">₫</span> {item.price}</p>
                <p>Số lượng: {item.qty}</p>
                <p>Tổng: <span className="text-red-500">₫</span> {item.total}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t pt-4">
          <h3 className="text-xl font-bold">Tổng kết</h3>
          <p>Tổng số lượng: {totalQty}</p>
          <p>Tổng giá trị: <span className="text-red-500">₫</span> {totalPrice}</p>
        </div>
        <Link to="/" className="mt-4 block text-center bg-blue-500 text-white py-2 rounded">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Ordercard;
