import React from "react";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import MoviesAdd from "./pages/movies/Movies.add";
import MoviesEdit from "./pages/movies/Movies.edit";
import MoviesList from "./pages/movies/Movies.list";
import TheaterAdd from "./pages/theaters/TheaterAdd";
import TheaterEdit from "./pages/theaters/TheaterEdit";
import TheaterList from "./pages/theaters/TheaterList";
import { Register } from "./pages/register/register";
import { Login } from "./pages/login/Login";

import Main from "./main";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/movies">
            <Route path="add" element={<MoviesAdd />} />
            <Route path="edit/:id" element={<MoviesEdit />} />
            <Route path="list" element={<MoviesList />} />
          </Route>
          <Route path="/theaters">
            <Route path="add" element={<TheaterAdd />} />
            <Route path="edit/:id" element={<TheaterEdit />} />
            <Route path="list" element={<TheaterList />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
// /movie/list
