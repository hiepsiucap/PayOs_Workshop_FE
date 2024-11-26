/** @format */
import { Link } from "react-router-dom";
import tag from "../assets/img/hero.png";
export default function Hero() {
  return (
    <div className=" md:container  mx-auto flex flex-col md:flex-row items-center">
      <div className=" flex items-center justify-center">
        <img
          src={tag}
          alt=""
          className=" w-2/3 md:hidden"
        />
      </div>
      <div className=" md:w-1/2 leading-tight px-8 md:px-16 text-center md:text-start font-poppins md:pt-32 pt-12 pb-16 md:text-6xl text-4xl">
        Thay đổi <br className=" hidden md:block"></br> cách bạn học <br />
        <span className=" text-primary1 ">Tiếng Anh</span>
        <div className=" md:text-base text-sm  py-6 text-gray-700">
          Lưu từ vựng nhanh chóng qua tiện ích trình duyệt, ôn tập dễ dàng với
          các trò chơi do AI tạo ra. Trải nghiệm học thú vị, cá nhân hóa, giúp
          ghi nhớ từ hiệu quả.
        </div>
        <Link
          to="https://flpayment.netlify.app/payment/673dbbd30aa76950d9bcdfb4"
          className="md:text-lg text-base bg-primary w-fit rounded-xl text-white my-6 px-8 py-3"
        >
          Tham gia ngay
        </Link>
      </div>
      <div className=" hidden md:block w-1/2">
        <img
          src={tag}
          alt=""
        />
      </div>
    </div>
  );
}
