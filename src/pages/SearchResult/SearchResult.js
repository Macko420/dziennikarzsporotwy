import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "../../api/axios";

import SearchedComponent from "../../components/SearchedComponent/SearchedComponent";

const SearchResults = () => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramValue = searchParams.get("n");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await axios.get(`/search?n=${paramValue}`);
      if (response.data.length === 0) {
        setSearchResponse({ err: { message: "No results found" } });
      } else {
        setSearchResponse(response.data);
      }

      console.log("set");
      setLoading(false);
    };
    if (
      paramValue === null ||
      paramValue === "" ||
      paramValue === undefined ||
      paramValue === "null" ||
      paramValue === "undefined" ||
      paramValue === " " ||
      paramValue.length <= 1
    ) {
      setSearchResponse({ err: { message: "Invalid data" } });
    } else {
      getData();
    }
  }, [paramValue]);

  return (
    <>
      <Header />
      <div className="container">
        <h1>Search Results</h1>
        {loading
          ? "Loading..."
          : searchResponse?.err?.message ||
            searchResponse?.map((item) => (
              <SearchedComponent
                key={item.id}
                title={item.title}
                img={item.img}
                link={item.article_id}
                date={item.updatedAt}
              />
            ))}
      </div>
    </>
  );
};

export default SearchResults;
