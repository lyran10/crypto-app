import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { currencyChange, symbolChange } from "../redux/reducer";
import { coinssList } from "../redux/actions";
import { TiTick } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

type Props = {
  position: string;
};

export const CurrencyDropDown = ({ position }: Props) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const currency = selector((state) => state.currencyData.currency);
  const dispatch = useDispatch<AppDispatch>();
  const curRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {}, []);

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === "USD") {
      dispatch(symbolChange("$"));
    } else if (event.currentTarget.id === "ILS") {
      dispatch(symbolChange("₪"));
    } else {
      dispatch(symbolChange("₹"));
    }
    dispatch(coinssList(event.currentTarget.id));
    dispatch(currencyChange(event.currentTarget.id));
  };

  const items = (cur: string) => {
    return (
      <button
        onClick={handleChange}
        ref={curRef}
        id={cur}
        className={`${
          currency === cur ? "bg-alphaBlue" : ""
        } w-[100%] flex items-center gap-1 justify-end p-1 text-center cursor-pointer border-[1p x] border-darkBlue font-bold hover:bg-alphaBlue transition duration-500`}
      >
        <div className="w-[51%] me-3 md:me-0 lg:me-0 flex justify-start items-center">
          <Tippy
            theme="light"
            content={`${
              cur === "USD"
                ? "US Dollars"
                : cur === "ILS"
                ? "Israeli Shekel"
                : "Indian Rupee"
            }`}
            placement="left"
          >
            <span>{cur}</span>
          </Tippy>
          {currency === cur ? (
            <TiTick style={{ color: "#34c38f", marginLeft: "5px" }} />
          ) : null}
        </div>
      </button>
    );
  };

  return (
    <div
      className={`flex flex-col ${position} w-[100%] left-0 rounded-md top-[100%] bg-darkBlue text-offWhite transition duration-500`}
    >
      {items("USD")}
      {items("ILS")}
      {items("INR")}
    </div>
  );
};
