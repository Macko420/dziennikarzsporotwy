import { useContext } from "react";
import ArticleContext from "../context/ArticleProvider";

const useArticle = () => {
  // useContext(ArticleContext);
  // console.log("context article: ", article);
  return useContext(ArticleContext);
};

export default useArticle;
