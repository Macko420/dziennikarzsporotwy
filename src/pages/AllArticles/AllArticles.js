import { useEffect, useState, useCallback, useRef } from "react";
import axios from "../../api/axios";
import clsx from "clsx";
import debounce from "lodash/debounce";

import Header from "../../components/Header/Header";
import Card from "../../components/AllArticles/Card/Card";

const AllArticles = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const triggerRef = useRef(null);
  const limit = 10;

  const getData = async () => {
    setLoading(true);
    const result = await axios
      .get("/article/all?page=" + page + "&limit=" + limit)
      .catch((err) => {
        setArticle({ data: { err: { message: "Error no server response" } } });
      });
    setArticle((prevArticles) => prevArticles.concat(result.data));
    setLoading(false);
  };

  const handleScroll = (event) => {
    // Oblicz wysokość przewinięcia strony i porównaj z wysokością całej strony
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      // console.log("end of page");
      // Jeśli strona została przewinięta do końca, zwiększ numer strony i pobierz kolejne artykuły
      event.preventDefault();
      debouncedChangeHandler();
    }
  };

  const debouncedChangeHandler = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 300),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {}, [triggerRef]);

  return (
    <>
      <Header />

      <div className="container-md mt-3">
        <h1>Search Results</h1>
        {(!loading && article?.err?.message) ||
          article.map((item) => <Card key={item.id} data={item} />)}
      </div>
      <div
        ref={triggerRef}
        className={clsx("trigger", { visible: loading })}
      ></div>
    </>
  );
};

export default AllArticles;
