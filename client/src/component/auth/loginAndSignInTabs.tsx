import React, { useState } from "react";
import { Signup } from "./signup";
import { Login } from "./login";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  showModal: string;
  modalOpacity: string;
  modalOut: () => void;
};

export const LoginAndSignInTabs = ({
  showModal,
  modalOpacity,
  modalOut,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <section
      className={`${showModal} ${modalOpacity} m-auto shadow-custom rounded-md z-[1000] absolute top-0 bottom-0 left-0 right-0 transition duration-500 w-[100%] md:w-[60%] lg:w-[60%] h-[500px] bg-crypto bg-cover bg-center bg-fixed`}
    >
      <ul className="flex justify-center items-center relative">
        <li
          onClick={() => setShow(false)}
          className="w-[50%] flex justify-center items-center"
        >
          <button
            className={`text-center p-2 w-[100%] rounded-l-md ${
              !show ? "bg-darkBlue text-offWhite" : "text-offWhite"
            } cursor-pointer font-black hover:bg-alphaBlue transition duration-500`}
          >
            LOGIN
          </button>
        </li>
        <li
          onClick={() => setShow(true)}
          className="w-[50%] flex  justify-center items-center"
        >
          <button
            className={`text-center p-2 w-[100%] rounded-r-md ${
              show ? "bg-darkBlue text-offWhite" : "text-offWhite"
            } cursor-pointer font-black hover:bg-alphaBlue transition duration-500`}
          >
            SIGNUP
          </button>
        </li>
        <li>
          <IoCloseSharp
            className="absolute right-0 hover:bg-offWhite hover:text-darkBlue transition duration-500 text-white rounded-md top-0 cursor-pointer"
            onClick={modalOut}
            size={25}
          />
        </li>
      </ul>
      {!show ? <Login/> : <Signup/>}
    </section>
  );
};
