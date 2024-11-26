/** @format */
import success from "../assets/img/success.webp";
import { Circles } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import copy from "../assets/img/copy.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pro from "../assets/img/pro.png";
import { useNavigate } from "react-router-dom";
interface Subscription {
  title: string;
  time: number;
}

interface Order {
  _id: string;
  total: number;
}

interface OrderData {
  name: string;
  email: string;
  password: string;
  order: Order;
  subscription: Subscription;
}
export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Copy failed", err));
  };
  const [data, changeData] = useState<OrderData | null>(null);
  useEffect(() => {
    const orderCode = searchParams.get("orderCode");
    const id = searchParams.get("id");
    const getData = async () => {
      const reponse = await fetch(
        `${
          import.meta.env.VITE_BACKEND_SERVERR
        }/api/payment/getorder?id=${id}&orderCode=${orderCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (reponse.ok) {
        const data = await reponse.json();
        changeData(data);
      } else {
        navigate("/failed");
      }
    };
    getData();
  }, [searchParams]);
  console.log(data);
  const notify = () => toast("Copy thành công");

  return (
    <div className=" bg-slate-50 h-screen flex flex-col py-12 space-y-6 items-center">
      <ToastContainer />
      {data ? (
        <section className=" bg-white py-6 font-poppins px-12 rounded-lg shadow-lg ">
          <p className=" text-center font-poppins  text-3xl ">HOÁ ĐƠN</p>
          <h4 className=" text-lg py-4 pt-6">Thông tin cá nhân</h4>
          <div className="flex space-x-2 items-end ">
            <p className=" text-sm  text-gray-700 w-40">Tên khách hàng:</p>
            <p className=" ">{data.name}</p>
          </div>
          <div className="flex space-x-2 items-end ">
            <p className=" text-sm  text-gray-700 w-40">Email khách hàng:</p>
            <p className=" ">{data.email}</p>
          </div>
          <div className="flex space-x-2 items-end ">
            <p className=" text-sm text-gray-700 w-40">Số hoá đơn:</p>
            <p className=" ">#{data.order._id}</p>
          </div>
          <h4 className=" text-lg py-4 pt-6">Sản phẩm</h4>
          <div className=" flex justify-between items-center space-x-32">
            <div className=" flex items-center space-x-4">
              <img
                src={pro}
                alt=""
                className=" w-14 h-14"
              />
              <div className=" flex-col font-poppins space-y-2">
                <h5 className=" font-semibold text-lg ">
                  Gói đăng kí {data?.subscription.title}
                  {" " + data?.subscription.time + " "} tháng
                </h5>
                <div className=" flex space-x-2 ">
                  <p className=" text-gray-600">Email: </p>
                  <h6 className="">{data.email}</h6>
                  <button
                    onClick={() => {
                      notify();
                      handleCopy(data.email);
                    }}
                  >
                    <img
                      src={copy}
                      alt=""
                      className=" w-4 h-4"
                    />
                  </button>
                </div>
                <div className=" flex space-x-2 ">
                  <p className=" text-gray-600">Mật khẩu: </p>
                  <h6 className="">{data.password}</h6>
                  <button
                    onClick={() => {
                      notify();
                      handleCopy(data.password);
                    }}
                  >
                    <img
                      src={copy}
                      alt=""
                      className=" w-4 h-4"
                    />
                  </button>
                </div>
                <div className=" flex space-x-2 ">
                  <p className=" text-gray-600">Webiste truy cập: </p>
                  <button
                    onClick={() => {
                      window.open("https://flenvn.netlify.app/login", "_blank");
                    }}
                    className=" hover:text-primary hover:underline"
                  >
                    https://flenvn.netlify.app
                  </button>
                </div>
              </div>
            </div>
            <p className=" font-semibold text-xl ">
              {data.order.total.toLocaleString("vi-VN")} VNĐ
            </p>
          </div>
          <div className=" w-full flex flex-col items-end pt-12   ">
            <div className=" w-1/3 border "></div>
            <div className=" flex items-end space-x-2 pt-8">
              <p className=" text-gray-600 text-sm pb-1">Tổng tiền</p>
              <h4 className=" text-2xl font-poppins font-semibold">
                {data.order.total.toLocaleString("vi-VN")} VNĐ
              </h4>
            </div>
            <h4 className=" text-green-500 font-poppint font-semibold">
              ĐÃ THANH TOÁN
            </h4>
          </div>
        </section>
      ) : (
        <>
          <img
            src={success}
            alt=""
            className=" w-24 h-24 animate-bounce"
          />
          <p className=" font-poppins text-3xl ">
            Đơn hàng thanh toán thành công !{" "}
          </p>
          <div>
            <div className=" flex flex-col items-center  py-8">
              <Circles width={64}></Circles>
              <div className=" animate-pulse font-poppins text-lg py-3 px-8 rounded-lg ">
                Đợi chúng tôi trong giây lát .....
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
