/** @format */
import { Outlet } from "react-router-dom";
import logo from "../assets/English.svg";
import { Link } from "react-router-dom";
import Hamburger from "./Hambuger";

export default function DefaultLayout() {
  return (
    <section className=" bg-slate-50">
      <div className=" md:block hidden">
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
              to="/payment/673dbbd30aa76950d9bcdfb4"
              className=" bg-primary rounded-xl  text-white p-4 px-8"
            >
              Tham gia ngay
            </Link>
          </div>
        </nav>
      </div>
      <div className=" block px-4 md:hidden">
        <nav className=" md:container mx-auto flex justify-between py-3   ">
          <ul className="flex space-x-16 px-4 justify-between w-full  font-lexend items-center text-primary ">
            <li className=" flex space-x-2 items-center  font-medium">
              <Link
                className=" font-bold text-2xl pb-2"
                to="/"
              >
                {" "}
                <img
                  src={logo}
                  alt=""
                  className="h-16"
                />
              </Link>
            </li>
            <li className=" flex space-x-2 justify-between pb-1 font-medium">
              <Hamburger></Hamburger>
            </li>
          </ul>
        </nav>
      </div>
      <section className=" bg-slate-50">
        <Outlet></Outlet>
      </section>
    </section>
  );
}
