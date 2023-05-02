import React, { useEffect } from "react";
import { numberWithCommas } from "../banner/carousel";
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux/es/exports";
import { AppDispatch, RootState } from "../redux/store";
import { SignInButton } from "../auth/signInButton";
import { translateEffects, opacityEffects } from "../redux/reducer";
import parse from "html-react-parser";
import { Loading } from "../utils/loading";
import { AddCoinButton } from "./addCoinButton";

type Props = {
  coinData: any;
};

export const CoinInfo = ({ coinData }: Props) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();
  const translate = selector((state) => state.currencyData.translate);
  const Opacity = selector((state) => state.currencyData.opacity);
  const symbol = selector((state) => state.currencyData.symbol);
  const currency = selector(
    (state) => state.currencyData.currency
  ).toLowerCase();
  const userLogin = selector((state) => state.currencyData.login);

  const ModalIn = () => {
    let translateObj = {
      ...translate,
      showModal: "translate-y-[300px]",
      overlay: "translate-x-[0px]",
    };
    dispatch(translateEffects(translateObj));
    setTimeout(() => {
      let opacityObj = {
        ...Opacity,
        modalOpacity: "opacity-1",
        overlayOpacity: "opacity-50",
      };
      dispatch(opacityEffects(opacityObj));
    }, 300);
  };

  useEffect(() => {}, [symbol, currency, translate, Opacity, coinData]);

  return (
    <>
      <div
        className={`text-darkBlue flex flex-col gap-2 m-auto justify-center items-center w-[90%] ${
          userLogin ? "md:w-[20%] lg:w-[20%]" : "md:w-[30%] lg:w-[30%]"
        } rounded-md bg-offWhite mb-10 shadow-custom h-[97vh] md:ms-0 md:me-0 lg:me-0 lg:ms-0`}
      >
        {Object.keys(coinData).length !== 0 ? (
          <>
            <img
              className="mt-5 mb-3"
              src={coinData?.image?.large}
              alt={coinData?.name}
              height="200"
              width="200"
            />
            <span className="text-darkBlue font-bold text-[25px] text-center">
              {" "}
              {coinData?.name}
            </span>
            <div className="flex justify-start items-start flex-col w-[100%] gap-3 p-[30px]">
              <span className="text-light w-full text-center">
                {parse(coinData?.description?.en.split(". ")[0])}.
              </span>
              <div className="flex justify-start items-start flex-col w-[100%] gap-1">
                <span className="font-bold w-full lg:text-start md:text-start text-center">
                  Rank : {coinData.market_cap_rank}
                </span>
                <span className="font-bold w-full lg:text-start md:text-start text-center">
                  Current Price : {symbol}
                  {""}
                  {numberWithCommas(
                    coinData.market_data?.current_price[currency]
                  )}
                </span>

                <span className="font-bold w-full lg:text-start md:text-start text-center">
                  Market Cap : {symbol}
                  {""}
                  {numberWithCommas(
                    coinData.market_data?.market_cap[currency]
                      ?.toString()
                      .slice(0, -4)
                  )}{" "}
                  M
                </span>
              </div>
              {userLogin ? (
                <AddCoinButton />
              ) : (
                <div className="flex flex-col mt-5 w-[100%]">
                  <span className="text-center">
                    Login to make your own watchlist
                  </span>
                  <SignInButton
                    navBg={true}
                    ModalIn={ModalIn}
                    show="flex"
                    trueColor="text-[#191825]"
                    falseColor="text-[#191825]"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
