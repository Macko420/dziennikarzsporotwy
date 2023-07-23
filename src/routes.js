import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Article from "./pages/ArticlePage/Article";
import StoreAuthState from "./components/StoreAuthState";
import RequireAuth from "./components/RequireAuth";
import UserPanel from "./pages/UserPanel/UserPanel";
import SearchResults from "./pages/SearchResult/SearchResult";
import AllArticles from "./pages/AllArticles/AllArticles";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<StoreAuthState />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          <Route exact path="/articles/all" element={<AllArticles />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route element={<RequireAuth />}>
            <Route path="/userpanel" element={<UserPanel />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
