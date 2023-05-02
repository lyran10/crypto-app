import React, { useEffect, useState } from "react";
import axios from "axios";
import { trendingCoins } from "../utils/coinapi";
import { TrendingCoins } from "../utils/interface";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const Carousel = () => {
  const [coins, setCoins] = useState<TrendingCoins[]>([]);
  const [index, setIndex] = useState<number>(0);
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);

  const getData = async () => {
    const { data } = await axios.get(trendingCoins(currency));
    setCoins(data);
  };

  const next = () => {
    if (index === coins.length - 1) {
      return;
    }
    setIndex((index) => index + 1);
  };

  const prev = () => {
    if (index === 0) {
      return;
    }
    setIndex((index) => index - 1);
  };
  useEffect(() => {
    getData();
  }, [currency]);

  return (
    <div className="flex gap-[200px] mt-11 transition duration-300">
      {coins.length ? (
        <div className="flex justify-between items-center w-[95vw]">
          <IoIosArrowBack
            onClick={prev}
            className="cursor-pointer p-2 bg-lightBlue rounded-full transition duration-500 hover:scale-90 hover:-translate-x-1"
            size={40}
          />
          <div className={`flex flex-col gap-[20px] w-[100px] duration-500`}>
            <img
              src={coins[index]?.image}
              alt={coins[index]?.name}
              className="h-[100px]"
            />
            <div className={`flex flex-col justify-center items-center `}>
              <span className="text-white text-[30px] font-bold">
                {coins[index]?.symbol}
              </span>
              <span
                className={`text-white text=[20px] font-bold ${
                  coins[index]?.price_change_percentage_24h >= 0
                    ? "text-[rgb(14,203,129)]"
                    : "text-[#D2042D]"
                }`}
              >
                {" "}
                {coins[index]?.price_change_percentage_24h >= 0 && "+"}{" "}
                {coins[index]?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
          <IoIosArrowForward
            onClick={next}
            className="cursor-pointer p-2 bg-lightBlue rounded-full hover:scale-90 hover:translate-x-1 transition duration-500"
            size={40}
          />
        </div>
      ) : null}
    </div>
  );
};
