import React from "react";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import MoviesAdd from "./pages/movies/Movies.add";
import MoviesEdit from "./pages/movies/Movies.edit";
import MoviesList from "./pages/movies/Movies.list";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/idiot/add" element={<MoviesAdd />} />
        <Route path="idiot/edit/:id" element={<MoviesEdit />} />
        <Route path="idiot/list" element={<MoviesList />} />
        <Route path="idiot/list1" element={<MoviesList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
