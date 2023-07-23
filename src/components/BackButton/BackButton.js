import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={(e) => {
          // navigate(`${props.to}`);
          navigate(props.to == "-1" ? -1 : props.to);
        }}
        className="bg-black text-white hover:bg-gray-200 hover:text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-4"
      >
        Back
      </button>
    </>
  );
}

export default BackButton;
