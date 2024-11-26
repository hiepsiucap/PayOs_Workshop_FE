/** @format */
import { Outlet } from "react-router-dom";
import logo from "../assets/English.svg";
import { Link } from "react-router-dom";
export default function DefaultLayout() {
  return (
    <section className=" bg-slate-50">
      <nav className="md:container  flex justify-between  pt-6 mx-auto">
        {" "}
        <div className=" flex  space-x-20">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="h-16"
            />
          </Link>
          <div className=" flex items-center font-poppins space-x-16">
            <Link
              to="/"
              className=" border-b-2 border-primary pb-1 "
            >
              Trang chủ
            </Link>
            <Link
              className="pb-1"
              to="/"
            >
              Tính năng
            </Link>
            <Link
              to="/"
              className="pb-1"
            >
              Mức giá
            </Link>
          </div>
        </div>
        <div className=" flex space-x-6 font-poppins items-center">
          <Link to="/">Đăng nhập</Link>
          <Link
            to="https://flpayment.netlify.app/payment/673dbbd30aa76950d9bcdfb4"
            className=" bg-primary rounded-xl  text-white p-4 px-8"
          >
            Tham gia ngay
          </Link>
        </div>
      </nav>

      <section className=" bg-slate-50">
        <Outlet></Outlet>
      </section>
    </section>
  );
}
