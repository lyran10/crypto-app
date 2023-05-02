import React, { useState } from "react";
import { User } from "../utils/interface";
import axios from "axios";
import { AlertMsg } from "../utils/alertMsg";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux/store";
import { loginandSignInalert, msg } from "../redux/reducer";

export const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/signup`,
        user
      );
      dispatch(msg(data.msg));
      dispatch(loginandSignInalert("-translate-y-[230px]"));
      setTimeout(() => {
        dispatch(loginandSignInalert("-translate-y-[1000px]"));
      }, 5000);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-6 h-100">
      <span className="mt-10 font-black text-[40px] text-white">SIGN UP</span>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="w-[100%] flex flex-col justify-center items-center gap-5"
        action=""
      >
        <input
          onChange={handleChange}
          className="p-2 placeholder:text-offWhite bg-offWhite outline-1 outline-lightBlue rounded-md font-semibold w-[50%]"
          type="email"
          placeholder="Email"
          name="email"
        />

        <input
          onChange={handleChange}
          className="p-2 bg-offWhite outline-1 outline-lightBlue rounded-md font-semibold w-[50%]"
          type="password"
          placeholder="Password"
          name="password"
        />

        <button
          type="submit"
          className="mt-5 p-2 px-5 rounded-md bg-darkBlue border text-lightBlue font-bold transition duration-500 hover:bg-alphaBlue hover:text-lightBlue"
        >
          {isLoading ? (
            <span className="relative h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightBlue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lightBlue"></span>
            </span>
          ) : null}
          <span className={`${isLoading ? "ms-2" : ""} `}>
            {isLoading ? "PROCESSING..." : "SIGN UP"}
          </span>
        </button>
      </form>
      <AlertMsg bg="bg-lightBlue" />
    </div>
  );
};
