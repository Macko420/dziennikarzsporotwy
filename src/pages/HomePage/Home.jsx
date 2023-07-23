import React from "react";

import Articles from "../../components/Articles/Articles";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
  const title = "!eLearning React Helmet!";
  const description =
    "Article Beginner friendly page for learning React Helmet.";
  const name = "Company nameee.";
  const type = "article";
  return (
    <div>
      <Header />

      <Articles />

      <Footer />
    </div>
  );
}

export default Home;
