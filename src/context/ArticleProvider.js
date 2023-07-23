import { createContext, useState } from "react";

const ArticleContext = createContext({});

export const ArticleProvider = ({ children }) => {
  const [article, setArticle] = useState({});
  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
