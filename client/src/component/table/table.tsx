import React, { useEffect, useState } from "react";
import { Input } from "./input";
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux/es/exports";
import { AppDispatch, RootState } from "../redux/store";
import { Pagination } from "./pagination";
import { coinssList } from "../redux/actions";

export const Table = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);

  const getCointsList = async () => {
    dispatch(coinssList(currency));
  };

  useEffect(() => {
    getCointsList();
  }, [currency]);

  useEffect(() => {
    window.onscroll = () => {
      setShow(window.pageYOffset < 200 ? false : true);
    };
  });

  return (
    <div className="min-h-[500px] w-[100%]">
      <div
        className={`transtion duration-500 ${
          show ? "opacity-1" : "opacity-0"
        } flex justify-center items-center flex-col gap-5 w-[100%]`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="lg:text-[30px] md:text-[30px] text-center text-[25px] mt-[40px]">
            Crypto Currency Price By Market Capital
          </span>
          <span className="text-center">
            Click on the Coins From The Table For More Information
          </span>
        </div>
        <Input />
        <Pagination />
      </div>
    </div>
  );
};
