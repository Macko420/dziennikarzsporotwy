import { Link } from "react-router-dom";
import { useState } from "react";

function Smaller(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const zoomStyles = {
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  function skrocTekst(tekst) {
    if (tekst.length <= 90) {
      return tekst;
    } else {
      return tekst.slice(0, 88) + "...";
    }
  }
  return (
    <Link to={`/articles/${props.link}`} className="no-underline text-black">
      <div
        className="my-2 flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-[170px] h-[114px] md:h-[110px] sm:h-[150px] sm:w-[200px] overflow-hidden">
          <img
            src={props.img}
            style={zoomStyles}
            className="w-full h-full object-cover object-center"
            alt="smaller"
          />
        </div>
        <div className="ml-2 w-[55%] md:w-[30%] text-[1rem]">
          {skrocTekst(props.title)}
        </div>
      </div>
    </Link>
  );
}

export default Smaller;
