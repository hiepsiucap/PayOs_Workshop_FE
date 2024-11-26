/** @format */

import { useEffect, useState } from "react";
import trial from "../assets/img/trial.png";
import unlimited from "../assets/img/unlimited.png";
import { useParams } from "react-router-dom";
import pro from "../assets/img/pro.png";
import { GetPostRequest } from "../utilz/Request";
import pricecheck from "../assets/img/checkblue.png";
import checkout from "../assets/img/image1.png";
import Swal from "sweetalert2";
import { Loading } from "../component";
import emailip from "../assets/img/icons8-email-48.png";
import nameip from "../assets/img/icons8-name-48.png";
interface Price {
  _id: string;
  title: string;
  price: number;
  time: number;
  description: [string];
}
interface Data {
  name: string;
  email: string;
}
export default function Payment() {
  const [listSubscription, changeListSubscription] = useState<Price[]>([]);
  const [filterSubscription, changefilterSubscription] = useState<Price[]>([]);

  const [, setSelectedOption] = useState<string>("month");
  const [onChoose, setChoose] = useState<Price | null>(null);
  const [data, changeData] = useState<Data>({ name: "", email: "" });
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const sub = listSubscription.find((sub) => sub._id === id);
      if (sub) setChoose(sub);
      setSelectedOption(sub?.time === 12 ? "year" : "month");
    }
  }, [id, listSubscription]);
  useEffect(() => {}, [onChoose]);
  useEffect(() => {
    if (onChoose) {
      if (onChoose.time === 6) {
        changefilterSubscription(
          listSubscription.filter((sub) => sub.time === 6)
        );
      } else {
        changefilterSubscription(
          listSubscription.filter((sub) => sub.time === 12)
        );
      }
    }
  }, [onChoose, listSubscription]);
  console.log(filterSubscription);
  useEffect(() => {
    const getData = async () => {
      const reponse = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/subscription/getall`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await reponse.json();

      changeListSubscription(data.sub);
    };
    getData();
  }, []);
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!data.email || !data.name || !onChoose?._id) {
      return Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    const body = {
      email: data.email,
      name: data.name,
      subscriptionId: onChoose?._id,
    };
    setIsOpen(true);
    const response = await GetPostRequest({
      route: `${import.meta.env.VITE_BACKEND_SERVERR}/api/payment/checkout`,
      body,
    });
    if (response.success) {
      if (response.data.data.checkoutUrl) {
        console.log(response.data.data.checkoutUrl);
        window.location.href = response.data.data.checkoutUrl;
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: response.msg,
        icon: "error",
        confirmButtonText: "Cool",
      });
      setIsOpen(false);
    }
  };
  return (
    <div className=" md:container flex py-8 items-center space-x-8 w-full mx-auto  px-24">
      <div className="flex flex-col space-y-4  h-5/6 w-5/12">
        <Loading modalIsOpen={modalIsOpen}></Loading>
        {filterSubscription.length >= 3 && (
          <>
            <button
              type="button"
              className={
                onChoose?._id !== filterSubscription[0]._id
                  ? "bg-white p-4 text-center flex flex-col items-center justify-center rounded-2xl shadow-sm"
                  : "bg-white p-4 border-2 border-primary1 scale-105 shadow-lg text-center flex flex-col items-center justify-center  rounded-2xl "
              }
              onClick={() => setChoose(filterSubscription[0])}
            >
              {" "}
              <h4 className=" font-bold text-primary text-2xl">
                {filterSubscription[0].title}
              </h4>
              <h6 className=" font-semibold">
                {filterSubscription[0].description[0]}
              </h6>
              <div className=" py-2">
                <img
                  src={trial}
                  className=" w-20"
                  alt=""
                />
              </div>
              <div className="  justify-center flex space-x-2  pb-2 items-end  ">
                <h2 className="  text-3xl font-bold">
                  {filterSubscription[0].price.toLocaleString("vi-VN")}{" "}
                </h2>
                <h5 className=" text-gray-400 text-sm pb-1">VNĐ 1 tháng</h5>
              </div>
            </button>
            <button
              type="button"
              className={
                onChoose?._id !== filterSubscription[1]._id
                  ? "bg-white p-4 text-center flex flex-col items-center justify-center  rounded-2xl shadow-sm"
                  : "bg-white p-4 border-2 border-primary1 scale-105 shadow-lg text-center flex flex-col items-center justify-center rounded-2xl "
              }
              onClick={() => setChoose(filterSubscription[1])}
            >
              {" "}
              <h4 className=" font-bold text-2xl text-primary">
                {filterSubscription[1].title}
              </h4>
              <h6 className=" font-semibold">
                {filterSubscription[1].description[0]}
              </h6>
              <div className=" py-2">
                <img
                  src={pro}
                  className=" w-20"
                  alt=""
                />
              </div>
              <div className="justify-center flex space-x-2  pb-2 items-end ">
                <h2 className="  text-3xl font-bold">
                  {filterSubscription[1].price.toLocaleString("vi-VN")}{" "}
                </h2>
                <h5 className=" text-gray-400 text-sm pb-1">VNĐ 1 tháng</h5>
              </div>
            </button>
            <button
              type="button"
              className={
                onChoose?._id !== filterSubscription[2]._id
                  ? "bg-white p-4 text-center flex flex-col items-center justify-center  rounded-2xl shadow-sm"
                  : "bg-white p-4 border-2 border-primary1 scale-105 shadow-lg text-center flex flex-col items-center justify-center  rounded-2xl "
              }
              onClick={() => setChoose(filterSubscription[2])}
            >
              {" "}
              <h4 className=" font-bold text-2xl text-primary">
                {filterSubscription[2].title}
              </h4>
              <h6 className=" font-semibold">
                {filterSubscription[2].description[0]}
              </h6>
              <div className=" py-2">
                <img
                  src={unlimited}
                  className=" w-20"
                  alt=""
                />
              </div>
              <div className="  justify-center flex space-x-2  pb-2 items-end  ">
                <h2 className="  text-3xl font-bold">
                  {filterSubscription[2].price.toLocaleString("vi-VN")}{" "}
                </h2>
                <h5 className=" text-gray-400 text-sm pb-1">VNĐ 1 tháng</h5>
              </div>
            </button>
          </>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className=" bg-white w-7/12  rounded-2xl p-6 shadow-sm"
      >
        <img
          src={checkout}
          alt=""
          className=" h-44 rounded-2xl w-full"
        />
        <div className=" flex space-x-4 py-12 font-inter">
          <button
            type="button"
            onClick={() => {
              setChoose(
                listSubscription.find(
                  (sub) => sub.title === onChoose?.title && sub.time === 6
                ) || null
              );
            }}
            className={
              onChoose?.time == 6
                ? " relative w-1/2 rounded-xl text-sm font-semibold border-2 flex flex-col items-start px-6 py-3 pt-5 space-y-0.5 border-primary "
                : "w-1/2 relative rounded-xl text-sm font-semibold border flex flex-col items-start px-6 py-3 pt-5 space-y-0.5 bg-slate-200"
            }
          >
            <p className=" text-gray-700 text-sm font-medium">Gói 6 tháng:</p>
            <p className=" font-semibold text-start text-md">
              {(
                (listSubscription.find(
                  (sub) => sub.title === onChoose?.title && sub.time === 6
                )?.price || 0) * 6
              ).toLocaleString("vi-VN")}{" "}
              <span className=" text-gray-900 text-sm ">VNĐ</span>
            </p>
            <img
              src={pricecheck}
              alt=""
              className={
                onChoose?.time == 6
                  ? " absolute right-2 top-1 w-7 h-7"
                  : " hidden"
              }
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setChoose(
                listSubscription.find(
                  (sub) => sub.title === onChoose?.title && sub.time === 12
                ) || null
              );
            }}
            className={
              onChoose?.time == 12
                ? " relative w-1/2 rounded-xl text-sm font-semibold border-2 flex flex-col items-start px-6 py-3 pt-5 space-y-0.5 border-primary "
                : "w-1/2 relative rounded-xl text-sm font-semibold border flex flex-col items-start px-6 py-3 pt-5 space-y-0.5 bg-slate-200"
            }
          >
            <p className=" text-gray-700 text-sm font-medium">Gói 12 tháng:</p>
            <img
              src={pricecheck}
              alt=""
              className={
                onChoose?.time == 12
                  ? " absolute right-2 top-1 w-7 h-7"
                  : " hidden"
              }
            />
            <p className=" font-semibold  text-md text-start">
              {(
                (listSubscription.find(
                  (sub) => sub.title === onChoose?.title && sub.time === 12
                )?.price || 0) * 12
              ).toLocaleString("vi-VN")}{" "}
              <span className=" text-gray-900 text-sm ">VNĐ</span>
            </p>
            <div className=" absolute border  rounded-md text-green-600  right-1 bottom-2 text-xs py-1 px-2 bg-green-400 bg-opacity-20">
              save 5%
            </div>
          </button>
        </div>
        <div className=" flex flex-col space-y-4 border-2 border-gray-200 rounded-md px-6 py-4">
          <div className=" flex flex-col space-y-3 border-b-2 border-gray-300 pb-4">
            <label
              htmlFor="name"
              className=" text-gray-500 text-sm"
            >
              Tên của bạn:
            </label>
            <div className=" flex space-x-1 items-center  ">
              <img
                src={nameip}
                alt=""
                className=" w-6 h-6"
              />
              <input
                type="text"
                required
                className="w-full py-1 px-2 focus:outline-none"
                placeholder="Vui lòng điền tên của bạn"
                value={data?.name || ""}
                onChange={(e) => {
                  changeData((prev) => {
                    return { ...prev, name: e.target?.value || "" };
                  });
                }}
              />
            </div>
          </div>
          <div className=" flex flex-col space-y-3">
            <label
              htmlFor="name"
              className=" text-gray-500 text-sm"
            >
              Email:
            </label>
            <div className=" flex space-x-1 items-center">
              <img
                src={emailip}
                alt=""
                className=" w-6 h-6"
              />
              <input
                type="text"
                required
                className="w-full py-1 px-2 focus:outline-none"
                placeholder="Vui lòng điền email của bạn"
                value={data?.email || ""}
                onChange={(e) => {
                  changeData((prev) => {
                    return { ...prev, email: e.target?.value || "" };
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className=" flex items-end space-x-2 pt-10 justify-end">
          <div className=" text-gray-600 text-sm pb-1">Thanh toán ngay: </div>
          <div className=" text-2xl font-semibold">
            {" "}
            {(
              (onChoose?.price || 0 * (onChoose?.time || 0)) *
              (onChoose?.time || 0)
            ).toLocaleString("vi-VN")}{" "}
            VNĐ
          </div>
        </div>
        <div className="flex justify-end w-full text-xs text-blue-600 ">
          Áp dụng mã giảm giá
        </div>
        <div className="flex justify-end w-full py-10 ">
          <button
            type="submit"
            className="py-3 px-8 bg-primary text-lg text-white rounded-xl font-semibold"
          >
            Thanh toán ngay
          </button>
        </div>
      </form>
    </div>
  );
}
