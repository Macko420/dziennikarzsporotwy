import { Link } from "react-router-dom";
import { useState } from "react";

function SearchedComponent(props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const zoomStyles = {
    transform: isHovered ? "scale(1.1) " : "scale(1)",
    transition: "transform 0.3s ease",
  };

  return (
    <Link to={`/articles/${props.link}`} className="no-underline  text-black ">
      <div
        className="mt-5 flex items-center border-b-2 border-black p-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-[170px] h-[120px] overflow-hidden">
          <img
            src={props.img}
            style={zoomStyles}
            className="h-full w-full object-cover object-center rounded-[10px]"
            alt="smaller"
          />
        </div>
        <div className="ml-2 w-[55%] text-[1rem]">{props.title}</div>
      </div>
    </Link>
  );
}

export default SearchedComponent;
