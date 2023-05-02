import React, { useState, useEffect } from "react";
import { NavBar } from "../nav/navbar";
import { CoinInfo } from "../coin/coinInfo";
import { useParams } from "react-router-dom";
import { CoinChart } from "../coin/coinChart";
import { WatchList } from "../watchlist/watchList";
import { RootState, AppDispatch } from "../redux/store";
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux/es/exports";
import { getwatchList, findUser, singleCoin } from "../redux/actions";

type Params = {
  id: string;
};

export const CoinPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const { id } = useParams<Params>();
  const [show, setShow] = useState<boolean>(false);
  const userLogin = selector((state) => state.currencyData.login);
  const userDetails = selector((state) => state.currencyData.userDetails);
  const singlecoin = selector((state) => state.currencyData.singlecoin);

  const checkIfTokenExpired = async () => {
    if (localStorage.getItem("id") !== null) {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      dispatch(findUser({ id: id, token: token }));
    }
  };

  useEffect(() => {
    setShow(true);
    dispatch(singleCoin(id as string));
    checkIfTokenExpired();
    if (userDetails._id !== "") {
      dispatch(getwatchList(userDetails));
    }
  }, [id]);

  return (
    <div
      className={`p-2 bg-darkBlue flex justify-center min-h-[500px] ${
        show ? "opacity-1" : "opacity-0"
      } duration-500 w-[100%]`}
    >
      <NavBar />
      <div className="flex bg-darkBlue w-[100%] justify-center flex-col md:flex-row items-center lg:flex-row">
        <CoinInfo coinData={singlecoin} />
        <CoinChart id={id} />
        {userLogin ? (
          <WatchList
            height="h-[97vh]"
            sm="hidden"
            lg="lg:flex"
            width="w-[20%]"
            mt="mt-[100px]"
          />
        ) : null}
      </div>
    </div>
  );
};
