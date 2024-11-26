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
    <div className=" md:container font-inter mx-auto px-4 md:px-0 md:py-24 py-12">
      <div>
        <div className=" md:text-4xl leading-normal md:leading-none  text-3xl font-semibold text-center">
          Chọn gói phù hợp,<br className=" md:hidden"></br> học tiếng Anh hiệu
          quả!
        </div>
        <div className=" text-gray-800 font-inter py-4 text-center text-xl">
          Phù hợp với mọi túi tiền
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center  space-x-6">
        <div className=" md:w-1/6 flex pb-6 md:pb-0  items-center space-x-4 md:block">
          <h5 className=" font-bold md:text-xl ">Chọn gói đăng kí </h5>
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

          <div className="flex items-center space-x-2 mb-2 mt-4 md:mb-2 md:mt-4">
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
        <div className="grid md:grid-cols-3 md:grid-flow-col gap-y-5 ">
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
