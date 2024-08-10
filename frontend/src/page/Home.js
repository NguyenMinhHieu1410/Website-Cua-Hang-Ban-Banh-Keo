import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import CardFeature from "../component/CardFeature";
import { useSelector } from 'react-redux';
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListCake = productData.filter((el) => el.category === "cake", []);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  
  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className="h-7" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">Giao Hàng Nhanh Nhất Tại{" "}<span className="text-red-600 text-">Nhà Bạn</span></h2>
          <p className="py-3 text-base ">Tiệm bánh kẹo Đồng Khánh nằm ở trung tâm phố cổ, như một viên ngọc lung linh giữa những con phố đông đúc.
            Ánh đèn vàng nhẹ nhàng chiếu sáng ra khắp, làm nổi bật hình ảnh cổ điển và đẹp mắt của tiệm.
            Mỗi ngày, từ lúc bình minh tới khi hoàng hôn buông xuống, hương vị của bánh ngọt và kẹo đủ loại lan tỏa khắp không gian, thu hút mọi người dừng chân lại.
            Với không gian ấm áp và sản phẩm đa dạng, Đồng Khánh trở thành điểm đến yêu thích của các tín đồ ẩm thực và du khách.</p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Đặt Hàng Ngay
          </button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {homeProductCartList[0] ? homeProductCartList.map((el) => {
            return (
              <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category} />
            );
          })
            : loadingArray.map((el, index) => {
              return <HomeCard key={index + "loading"} loading={"Loading..."} />;

            })}

        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>Các Loại Bánh</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {homeProductCartListCake[0] ?
            homeProductCartListCake.map(el => {
              return (
                <CardFeature
                  key={el._id }
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category} />
              );
            })
            : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "cartLoading"} />
            ))}
        </div>
      </div>
      <AllProduct heading={"Sản Phẩm Của Bạn"}/>
    </div>
  );
};
export default Home;