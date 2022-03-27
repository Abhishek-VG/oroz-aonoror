import React from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchMock";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";

// import { fetchApi } from "../utils/fetchMock";
const MoviesEdit = () => {
  const navigate = useNavigate();
  // id is the identifier of movie
  const { id } = useParams();
  const [movieName, setmovieName] = React.useState("");
  const [movieDate, setmovieDate] = React.useState();
  const [movieTickets, setmovieTickets] = React.useState(0);

  React.useEffect(() => {
    const headers = new Headers()
    headers.append("X-Auth-token", localStorage.getItem("access-token"))

    fetchApi(`http://localhost:8080/movie/${id}`, { method: "GET", headers })
      .then((resp) => resp.json()) 
      .then((obj) => {
        console.log(obj);
        setmovieName(obj.movieName);
        setmovieDate(obj.movieDate);
        setmovieTickets(obj.movieTickets);
      });
  }, []);

  const MovieNameHandler = (event) => {
    setmovieName(event.target.value);
  };

  const MovieDateHandler = (event) => {
    setmovieDate(event.target.value);
  };

  const MovieTicketsHandler = (event) => {
    setmovieTickets(event.target.value);
  };

  console.log("params:", id);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(movieName, movieDate, movieTickets);
    const movieObj = {
      movieName,
      movieDate,
      movieTickets,
    };
    const headers = new Headers()
    headers.append("X-Auth-token", localStorage.getItem("access-token"))

    fetchApi(`http://localhost:8080/movie/${id}`, {
      method: "PUT",
      body: movieObj,
      headers
    })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        navigate(`/movies/list`);
      });
  };

  return (
    <div>
      <div>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form id="ourform" onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                value={movieName}
                id="outlined-required"
                label="Movie Name"
                onChange={MovieNameHandler}
              />
            </div>
            <div>
              <TextField
                required
                value={movieDate}
                id="outlined-required"
                type="date"
                onChange={MovieDateHandler}
              />
            </div>
            <div>
              <TextField
                required
                type="number"
                value={movieTickets}
                id="outlined-required"
                label="Number of Tickets"
                onChange={MovieTicketsHandler}
              />
            </div>
            <div></div>
            <Button type="submit" variant="contained" color="primary">
              Update Movie
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};
export default MoviesEdit;
