/** @format */

import { useEffect, useState } from "react";
import EachPrice from "./EachPrice";
interface Price {
  _id: string;
  title: string;
  price: number;
  time: number;
  description: [string];
}

export default function Price() {
  const [listSubscription, changeListSubscription] = useState<Price[]>([]);
  const [filterSubscription, changefilterSubscription] = useState<Price[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("month");
  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === "month") {
        changefilterSubscription(
          listSubscription.filter((sub) => sub.time === 6)
        );
      } else {
        changefilterSubscription(
          listSubscription.filter((sub) => sub.time === 12)
        );
      }
    }
  }, [selectedOption, listSubscription]);
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
  return (
    <div className=" md:container font-inter mx-auto py-24">
      <div>
        <div className=" text-4xl font-semibold text-center">
          Chọn gói phù hợp, học tiếng Anh hiệu quả!
        </div>
        <div className=" text-gray-800 font-inter py-4 text-center text-xl">
          Phù hợp với mọi túi tiền
        </div>
      </div>
      <div className="flex items-center  space-x-6">
        <div className=" w-1/6">
          <h5 className=" font-bold text-xl ">Chọn gói đăng kí </h5>
          <div className="flex items-center space-x-2 mb-2 mt-4">
            <input
              type="radio"
              id="month"
              name="timeOption"
              value="month"
              checked={selectedOption === "month"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="month"
              className="text-sm font-medium"
            >
              Gói 6 tháng
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="year"
              name="timeOption"
              value="year"
              checked={selectedOption === "year"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="year"
              className="text-sm font-medium"
            >
              Gói 12 tháng
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-flow-col ">
          {filterSubscription.length === 3 && (
            <>
              <EachPrice
                sub={filterSubscription[0]}
                rounded={true}
                click={true}
              ></EachPrice>

              <EachPrice
                sub={filterSubscription[1]}
                click={true}
                rounded={false}
              ></EachPrice>
              <EachPrice
                sub={filterSubscription[2]}
                click={false}
                rounded={true}
              ></EachPrice>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
