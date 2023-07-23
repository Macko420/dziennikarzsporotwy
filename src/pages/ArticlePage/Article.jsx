import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SeoProvider } from "../../context/SeoProvider";

import Header from "../../components/Header/Header";
import useAuth from "../../hooks/useAuth";
import { useParams, useLocation } from "react-router";
import axios from "../../api/axios";
import CommentsForm from "../../components/Comments/CommentsForm/CommentsForm";
import BluredCommentsForm from "../../components/Comments/CommentsForm/BluerdCommentsForm";
import DisplayComments from "../../components/Comments/DisplayComments/DisplayComments";
import useArticle from "../../hooks/useArticle";
import formatujDate from "../../functions/dateFormat";

const Article = () => {
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const { article, setArticle } = useArticle();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const location = useLocation();

  const params = useParams();
  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      if (article.length) {
        setData(article.find((object) => object.article_id == params.id));
      } else {
        const response = await axios
          .get(`/article/id/${params.id}`)
          .catch((err) => {
            console.log(err);
          });
        setData(response.data);
      }
      setLoading(false);
    };
    getArticle().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <>
    <SeoProvider
      title="!eLearning React Helmet!"
      description="Article Beginner friendly page for learning React Helmet."
      name="Company nameee."
      type="article"
    />
      {loading
        ? "Loading..."
        : article?.err?.message || (
            <div className="app">
              <Header />
              <br></br>
              <div className="container-md">
                <div className="mx-auto">
                  <div className="relative py-8">
                    <h1 className="relative text-4xl font-bold text-center ">
                      {data.title}
                    </h1>
                    <span className="absolute bottom-0 right-0 text-sm text-gray-500 p-3">
                      {formatujDate(data.updatedAt)}
                    </span>
                  </div>

                  <div
                    className="p-3 text-lg my-4 flex justify-center flex-col text-justify"
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   justifyContent: "center",
                    // }}
                    dangerouslySetInnerHTML={{ __html: data.text }}
                  />
                </div>
              </div>
              {auth?.accessToken ? (
                <div className="container">
                  <CommentsForm
                    key={params.id}
                    comments={comments}
                    setComments={setComments}
                  />
                  <DisplayComments
                    comments={comments}
                    setComments={setComments}
                  />
                </div>
              ) : (
                <>
                  <div className="relative container">
                    <div className="absolute right-0 left-0 top-0 bottom-0 m-auto blur-sm">
                      <BluredCommentsForm />
                    </div>
                    <p className="right-0 left-0 top-0 bottom-0 m-auto w-[100%] h-[200px] flex justify-center items-center z-20">
                      <Link
                        to="/login"
                        state={{ prevUrl: location.pathname }}
                        className="absolute text-black"
                      >
                        Aby dodać komentarz musisz być zalogowany "Zaloguj się"
                      </Link>
                    </p>
                    <div className="relative mt-10">
                      <DisplayComments
                        comments={comments}
                        setComments={setComments}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
    </>
  );
};

export default Article;
