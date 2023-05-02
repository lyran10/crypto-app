import React from "react";
import { CurrencyDropDown } from "./currencyDropDown";
import { SignInButton } from "../auth/signInButton";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { Logout } from "../auth/logout";
import { WatchList } from "../watchlist/watchList";

type Show = {
  showSideNav: string;
  translateSideNav: string;
  ModalIn: () => void;
  navBg: boolean;
};

export const SideNav = ({
  translateSideNav,
  showSideNav,
  ModalIn,
  navBg,
}: Show) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = selector((state) => state.currencyData.login);
  const userDetails = selector((state) => state.currencyData.userDetails);

  return (
    <div
      className={`h-[80vh] flex flex-col p-3 gap-10 z-[999] rounded-md w-full bg-white absolute right-0 left-0 top-20 bottom-0 ${showSideNav} ${translateSideNav} transition duration-500`}
    >
      {userDetails._id ?
      <>
      <span className="flex gap-2 items-center text-darkBlue">
      <img
        className="inline-block h-12 w-12 rounded-full cursor-pointer ring-2 ring-white"
        src="https://www.arlis.umd.edu/sites/default/files/default_images/avatardefault_92824.png"
        alt="image"
      />
         <span className="text-darkBlue">{userDetails.email}</span>  

      </span>
      </>
      : null}
      <div className="flex flex-col gap-2">
        <h4 className="text-center font-bold">Change Currency</h4>
        <CurrencyDropDown position="static" />
      </div>
      {userLogin ? (
        <WatchList
          height="h-[500px]"
          sm="flex"
          lg="lg:hidden"
          mt=""
          width="w-[100%]"
        />
      ) : null}

      {userLogin ? (
        <Logout
          navBg={true}
          show="flex"
          trueColor="text-[#191825]"
          falseColor="text-[#191825]"
        />
      ) : (
        <SignInButton
          ModalIn={ModalIn}
          navBg={navBg}
          show="flex"
          trueColor="text-[#191825]"
          falseColor="text-[#191825]"
        />
      )}
    </div>
  );
};
