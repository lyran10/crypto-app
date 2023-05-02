import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[100%] w-[100%]">
      <img
        className="animate-spin h-[50px]"
        src="https://img.icons8.com/external-flat-icons-inmotus-design/67/null/external-Loading-ui-flat-icons-inmotus-design-11.png"
      />
    </div>
  );
};
