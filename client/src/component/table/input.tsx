import React from "react";
import { inputChange } from "../redux/reducer";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";

export const Input = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputChange(event.target.value));
    console.log(event.target.value);
  };

  return (
    <input
      onChange={handleChange}
      className="p-3 mt-[20px] mb-[10px] w-[50%] bg-darkBlue text-white outline-none rounded-md"
      type="text"
      placeholder="Search Coin"
    />
  );
};
