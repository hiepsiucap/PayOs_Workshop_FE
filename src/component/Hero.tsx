/** @format */

import tag from "../assets/img/hero.png";
export default function Hero() {
  return (
    <div className=" md:container mx-auto flex items-center">
      <div className=" w-1/2 leading-tight px-16 font-poppins pt-32 pb-16 text-6xl">
        Thay đổi <br></br> cách bạn học <br />
        <span className=" text-primary1 ">Tiếng Anh</span>
        <div className=" text-base py-6 text-gray-700">
          Lưu từ vựng nhanh chóng qua tiện ích trình duyệt, ôn tập dễ dàng với
          các trò chơi do AI tạo ra. Trải nghiệm học thú vị, cá nhân hóa, giúp
          ghi nhớ từ hiệu quả.
        </div>
        <div className="text-lg bg-primary w-fit rounded-xl text-white my-6 px-8 py-3">
          Tham gia ngay
        </div>
      </div>
      <div className=" w-1/2">
        <img
          src={tag}
          alt=""
        />
      </div>
    </div>
  );
}
