import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// import LastArticle from "./LastArticle/LastArticle";
import LastArticles from "./LastArticles/LastArticles";
// import PopularArticle from "./PopularArticle/PopularArticle";
import LeftArticle from "./LeftArticle/LeftArticle";
import Title from "../Title/Title";
import useArticle from "../../hooks/useArticle";

import axios from "../../api/axios";
import { Container } from "react-bootstrap";

function NewArticles() {
  const { article, setArticle } = useArticle();
  const [loading, setLoading] = useState(true);

  function getPopular(arr) {
    if (arr.length === 0) {
      return null;
    }
    const mostPopular = arr.reduce((max, obj) => {
      return obj.likes > max.likes ? obj : max;
    });

    return mostPopular;
  }
  useEffect(() => {
    setLoading(false);
    const getData = async () => {
      setLoading(true);
      const result = await axios
        .get("/article/lastArticle?n=7&o=0")
        .catch((err) => {
          setLoading(false);
          return { data: { err: { message: "Error no server response" } } };
        });
      setArticle(result?.data);
      setLoading(false);
    };
    if (!article?.length) {
      getData();
    }
  }, []);

  return (
    <>
      {loading
        ? "Loading..."
        : article?.err?.message || (
            <div className="container mt-[30px]">
              <div className="lg:container mx-auto px-4 mt-4">
                <div className="row">
                  <div className="col-xl-8">
                    <Title title="Ostatni Artykuł" />
                    <div className="my-2 flex justify-content-between align-items-center">
                      <LeftArticle data={article[0]} />
                    </div>
                    <div className="my-3">
                      <Title title="Popularny artykuł" />
                      <div className="my-2 d-flex justify-content-between align-items-center">
                        <LeftArticle data={getPopular(article)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <Title title="Pozostałe Artykuły" />
                    <div className="my-2 flex justify-center align-middle flex-col">
                      <LastArticles data={article} />
                    </div>
                  </div>
                  {/* link without decoration */}
                  <Link
                    className="mb-4 decoration-black no-underline text-black w-full text-lg"
                    to="/articles/all"
                  >
                    Zobacz więcej <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            </div>
          )}
    </>
  );
}

export default NewArticles;
