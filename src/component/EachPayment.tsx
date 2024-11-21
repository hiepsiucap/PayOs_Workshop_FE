/** @format */
import pricecheck from "../assets/img/pricecheck.png";
import { Link } from "react-router-dom";
interface Price {
  _id: string;
  title: string;
  price: number;
  time: number;
  description: [string];
}
export default function EachPayment({
  rounded,
  click,
  sub,
}: {
  rounded: boolean;
  click: boolean;
  sub: Price;
}) {
  if (click) {
    return (
      <div
        className={
          rounded
            ? `rounded-l-2xl rounded-s-2xl shadow-md bg-white   p-8`
            : " shadow-md bg-white   p-8"
        }
      >
        <h4 className=" font-bold text-2xl">{sub.title}</h4>
        <h6 className=" font-semibold">{sub.description[0]}</h6>
        <div className=" flex space-x-2 py-3 pb-2 items-end  ">
          <h2 className="  text-4xl font-bold">
            {sub.price.toLocaleString("vi-VN")}{" "}
          </h2>
          <h5 className=" text-gray-400 text-sm pb-1">VNĐ 1 tháng</h5>
        </div>
        <h6 className=" text-sm text-gray-600">
          {sub.time} tháng * {sub.price.toLocaleString("vi-VN")} ={" "}
          {(sub.price * sub.time).toLocaleString("vi-VN") + " VND"}
        </h6>
        <div className="border border-primary opacity-50 mx-2 my-3"></div>
        <div className=" flex flex-col space-y-3 py-3">
          {sub.description.map((des, index) => {
            if (index < 1) return;
            return (
              <div className=" flex items-end space-x-1">
                <img
                  src={pricecheck}
                  alt=""
                  className="w-7 h-7"
                />
                <p className="pb-0.5 text-sm">{des}</p>
              </div>
            );
          })}
        </div>
        <div className=" flex justify-center py-6">
          <Link
            className=" mx-auto py-3 px-8 border-2 border-primary rounded-2xl  "
            to={`/payment/${sub._id}`}
          >
            Đăng kí ngay
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`rounded-2xl bg-black1 scale-105 text-white  p-8`}>
        <h4 className=" font-bold text-2xl text-primary">{sub.title}</h4>
        <h6 className=" font-semibold">{sub.description[0]}</h6>
        <div className=" flex space-x-2 py-3 pb-2 items-end  ">
          <h2 className="  text-4xl font-bold">
            {sub.price.toLocaleString("vi-VN")}
          </h2>
          <h5 className=" text-gray-200 text-sm pb-1">VNĐ 1 tháng</h5>
        </div>
        <h6 className=" text-sm text-slate-200">
          {sub.time} tháng * {sub.price.toLocaleString("vi-VN")} =
          {" " + (sub.price * sub.time).toLocaleString("vi-VN") + " VND"}
        </h6>
        <div className="border border-primary opacity-50 mx-2 my-3"></div>
        <div className=" flex flex-col space-y-3 py-3">
          {sub.description.map((des, index) => {
            if (index < 1) return;
            return (
              <div className=" flex items-end space-x-1">
                <img
                  src={pricecheck}
                  alt=""
                  className="w-7 h-7"
                />
                <p className="pb-0.5 text-sm">{des}</p>
              </div>
            );
          })}
        </div>
        <div className=" flex justify-center py-6">
          <Link
            className=" mx-auto py-3 px-12 bg-primary rounded-2xl text-white "
            to={`/payment/${sub._id}`}
          >
            Đăng kí ngay
          </Link>
        </div>
      </div>
    );
  }
}
