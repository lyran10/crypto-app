import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { loginandSignInalert } from "../redux/reducer";

type Props = {
  bg: string;
};

export const AlertMsg = ({ bg }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const alertMsg = selector((state) => state.currencyData.alertMsg);
  const alertMoveUp = selector((state) => state.currencyData.alertMoveUp);

  useEffect(() => {}, [alertMsg, alertMoveUp]);

  return (
    <div
      className={`transition flex justify-between gap-3 items-center px-2 duration-300 absolute h-[40px] font-bold ${alertMoveUp} ${bg} rounded-md`}
    >
      <span className="">{alertMsg}</span>
      <IoCloseSharp
        className="cursor-pointer"
        onClick={() => dispatch(loginandSignInalert("-translate-y-[1000px]"))}
        size={25}
      />
    </div>
  );
};
