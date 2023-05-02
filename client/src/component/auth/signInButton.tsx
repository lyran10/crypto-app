import React from "react";
import { FiLogIn } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type Props = {
  navBg: boolean;
  ModalIn: () => void;
  show: string;
  trueColor: string;
  falseColor: string;
};

export const SignInButton = ({
  navBg,
  ModalIn,
  show,
  trueColor,
  falseColor,
}: Props) => {
  return (
    <Tippy content="Login and Signup Tabs" placement="bottom">
      <div
        onClick={() => ModalIn()}
        className={`${show} md:flex lg:flex font-bold justify-center cursor-pointer items-center gap-2 p-2 px-5 transition duration-500 hover:bg-alphaBlue ${
          navBg ? trueColor : falseColor
        }`}
      >
        <span>Sign in</span>
        <FiLogIn size={20} />
      </div>
    </Tippy>
  );
};
