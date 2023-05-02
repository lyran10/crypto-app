import React, { useState } from "react";

type Ham = {
  setShowSideNav: React.Dispatch<React.SetStateAction<string>>;
  showSideNav: string;
  setTranslateSideNav: React.Dispatch<React.SetStateAction<string>>;
  translateSideNav: string;
};

export const HamburgerButton = ({
  setShowSideNav,
  showSideNav,
  setTranslateSideNav,
  translateSideNav,
}: Ham) => {
  const [hamAnimationDiv1, setHamAnimationDiv1] = useState<string>("");
  const [hamAnimationDiv2, setHamAnimationDiv2] = useState<string>("");
  const [hamAnimationDiv3, setHamAnimationDiv3] = useState<string>("");
  const [buttonChangeColor, setButtonChangeColor] = useState<boolean>(false);

  const animation1 = () => {
    setTimeout(() => {
      showSideNav === "opacity-0"
        ? setShowSideNav("")
        : setShowSideNav("opacity-0");
    }, 400);
    translateSideNav === "translate-x-[1800px]" && showSideNav === "opacity-0"
      ? setTranslateSideNav("")
      : setTranslateSideNav("translate-x-[1800px]");
  };

  const animation2 = () => {
    setTimeout(() => {
      translateSideNav === "translate-x-[1800px]" && showSideNav === "opacity-0"
        ? setTranslateSideNav("")
        : setTranslateSideNav("translate-x-[1800px]");
    }, 400);
    showSideNav === "opacity-0"
      ? setShowSideNav("")
      : setShowSideNav("opacity-0");
  };

  const hamburger = () => {
    showSideNav === "opacity-0" ? animation1() : animation2();
    hamAnimationDiv1 === "rotate-45 translate-y-2"
      ? setHamAnimationDiv1("")
      : setHamAnimationDiv1("rotate-45 translate-y-2");
    hamAnimationDiv2 === "-rotate-45 -translate-y-2 "
      ? setHamAnimationDiv2("")
      : setHamAnimationDiv2("-rotate-45 -translate-y-2 ");
    hamAnimationDiv3 === "-translate-x-10 opacity-0"
      ? setHamAnimationDiv3("")
      : setHamAnimationDiv3("-translate-x-10 opacity-0");
  };

  const changeColor = () => {
    if (window.scrollY > 650) {
      setButtonChangeColor(true);
    } else {
      setButtonChangeColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div
      onClick={() => hamburger()}
      className="group flex md:hidden lg:hidden flex-col gap-1 cursor-pointer"
    >
      <div
        className={`w-7 h-1 rounded-md ${
          buttonChangeColor ? "bg-darkBlue" : "bg-offWhite "
        } transition duration-500 ${hamAnimationDiv1}`}
      ></div>

      <div
        className={`w-7 h-1 rounded-md ${
          buttonChangeColor ? "bg-darkBlue" : "bg-offWhite "
        } transition duration-500 ${hamAnimationDiv3}`}
      ></div>

      <div
        className={`w-7 h-1 rounded-md ${
          buttonChangeColor ? "bg-darkBlue" : "bg-offWhite "
        } transition duration-500 ${hamAnimationDiv2}`}
      ></div>
    </div>
  );
};
