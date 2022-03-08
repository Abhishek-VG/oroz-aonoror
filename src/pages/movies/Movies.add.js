import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import { fetchApi } from "../utils/fetchMock";
const MoviesAdd = () => {
  let navigate = useNavigate();
  const [movieName, setmovieName] = React.useState("");
  const [movieDate, setmovieDate] = React.useState();
  const [movieTickets, setmovieTickets] = React.useState(0);

  const MovieNameHandler = (event) => {
    setmovieName(event.target.value);
  };

  const MovieDateHandler = (event) => {
    setmovieDate(event.target.value);
  };

  const MovieTicketsHandler = (event) => {
    setmovieTickets(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(movieName, movieDate, movieTickets);
    const movieObj = {
      movieName,
      movieDate,
      movieTickets,
    };

    fetchApi("http://localhost:8080/movie", { method: "POST", body: movieObj })
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
                id="outlined-required"
                label="Movie Name"
                onChange={MovieNameHandler}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                type="date"
                onChange={MovieDateHandler}
              />
            </div>
            <div>
              <TextField
                required
                type="number"
                id="outlined-required"
                label="Number of Tickets"
                onChange={MovieTicketsHandler}
              />
            </div>
            <div></div>
            <Button type="submit" variant="contained" color="primary">
              Add Movie
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};
export default MoviesAdd;
