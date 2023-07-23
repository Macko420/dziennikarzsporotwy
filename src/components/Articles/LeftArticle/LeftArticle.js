import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function LastArticle(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setData(props.data);
      setLoading(false);
    };
    getData();
  }, []);

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

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {loading
        ? "Loading..."
        : data?.err?.message || (
            <Link
              to={`/articles/${data?.article_id}`}
              className={`relative ${
                isMobile ? "h-auto mb-3" : "h-[360px]"
              } w-full no-underline `}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`w-full max-h-full overflow-hidden flex justify-center items-center ${
                  isMobile ? "" : "absolute"
                }`}
              >
                <img
                  src={data?.img}
                  style={zoomStyles}
                  className="block my-0 mx-auto max-w-full max-h-full object-contain"
                  alt="smaller"
                />
              </div>
              <div
                className={` h-[auto] mt-1 p-1 flex justify-between items-center bg-black bg-opacity-80 font-semibold text-white text-lg pl-[20px] rounded-tr-[5px] rounded-br-[5px] max-[1100px]:h-[12%] ${
                  isMobile
                    ? "flex-col w-full"
                    : "absolute left-0 top-[70%] w-[70%]"
                }`}
              >
                <div className="overflow-hidden text-ellipsis">
                  {data?.title}
                </div>
              </div>
            </Link>
          )}
    </>
  );
}

export default LastArticle;
