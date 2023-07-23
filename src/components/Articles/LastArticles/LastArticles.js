import { useEffect, useState } from "react";
import Smaller from "../Smaller/Smaller";
import removeFirstElement from "../../../functions/deleteFirstElement";

function LastArticle(props) {
  const propsData = [...props.data];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setData(propsData.length > 6 ? removeFirstElement(propsData) : propsData);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading
        ? "Loading..."
        : data?.err?.message ||
          data?.map((item) => (
            <Smaller
              key={item.id}
              title={item.title}
              img={item.img}
              link={item.article_id}
              date={item.updatedAt}
            />
          ))}
    </>
  );
}

export default LastArticle;
