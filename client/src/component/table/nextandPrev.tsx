import React, { useState } from "react";

type Props = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  array: any[];
  currentPage: number;
  pagination: boolean;
};

export const NextandPrev = ({
  setCurrentPage,
  array,
  currentPage,
  pagination,
}: Props) => {
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

  const handleClick = (num: string) => {
    setCurrentPage(parseInt(num));
    setNextDisabled(false);
    setPrevDisabled(false);
  };

  const nextPage = () => {
    if (currentPage === 20) {
      setNextDisabled(true);
      return;
    }
    setPrevDisabled(false);
    setNextDisabled(false);
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      setPrevDisabled(true);
      return;
    }
    setNextDisabled(false);
    setPrevDisabled(false);
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {pagination ? (
        <div className="mt-[20px] p-5 flex gap-3 items-center justify-center">
          <button
            className={`${
              prevDisabled ? "bg-alphaBlue" : "bg-darkBlue"
            } p-2 px-5 text-white rounded-md`}
            disabled={prevDisabled}
            onClick={() => prevPage()}
          >
            prev
          </button>
          {array
            ? array.map((num: string, index: number) => {
                return (
                  <span
                    key={index}
                    id={(index + 1).toString()}
                    className={`cursor-pointer hidden md:block lg:block ${
                      currentPage === index + 1
                        ? "bg-darkBlue text-white"
                        : "bg-white"
                    } font-bold hover:bg-darkBlue hover:text-white transition duration-150 px-2 p-1`}
                    onClick={() => handleClick(num)}
                  >
                    {num}
                  </span>
                );
              })
            : null}
          <button
            className={`${
              nextDisabled ? "bg-alphaBlue" : "bg-darkBlue"
            } p-2 px-5 text-white rounded-md`}
            onClick={() => nextPage()}
            disabled={nextDisabled}
          >
            next
          </button>
        </div>
      ) : null}
    </>
  );
};
