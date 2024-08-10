import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminProduct from "../component/AdminProduct";


const ProductList = () => {
  const { filterby } = useParams();

  const productData = useSelector((state) => state.product.productList);

  // Find the product that matches the filter ID
  const productDisplay = productData.find((el) => el._id === filterby);

  

  return (
    <div className="p-2 md:p-4">
      
      <AdminProduct heading={"Danh sách sản phẩm"} />
    </div>
  );
};

export default ProductList;
