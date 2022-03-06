import React from "react";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import MoviesAdd from "./pages/movies/Movies.add";
import MoviesEdit from "./pages/movies/Movies.edit";
import MoviesList from "./pages/movies/Movies.list";
import Main from "./main";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/movie">
            <Route path="add" element={<MoviesAdd />} />
            <Route path="edit/:id" element={<MoviesEdit />} />
            <Route path="list" element={<MoviesList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
// /movie/list
