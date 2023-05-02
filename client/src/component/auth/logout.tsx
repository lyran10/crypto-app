import React from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import {
  details,
  userLogin,
  clearwatchlist,
  logoutmsg,
} from "../redux/reducer";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";

type Props = {
  navBg: boolean;
  trueColor: string;
  falseColor: string;
  show: string;
};

export const Logout = ({ navBg, trueColor, falseColor, show }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;

  const logOut = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/logout`, {
        withCredentials: true,
      });
      dispatch(userLogin(data.status));
      dispatch(details({ _id: "", email: "", token: "" }));
      dispatch(logoutmsg("top-[150px]"));
      setTimeout(() => {
        dispatch(logoutmsg("top-[0px]"));
      }, 2000);
      dispatch(clearwatchlist([]));
      localStorage.removeItem("id");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={logOut}
      className={`${show} md:flex lg:flex h-[100%] font-bold justify-center cursor-pointer items-center gap-2 p-2 px-5 transition duration-500 hover:bg-alphaBlue ${
        navBg ? trueColor : falseColor
      }`}
    >
      <span>Logout</span>
      <FiLogOut size={20} />
    </button>
  );
};
