import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchApi } from "../utils/fetchMock";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MoviesList = () => {
  const [movieList, setMovieList] = React.useState([]);
  let navigate = useNavigate();
  React.useEffect(() => {
    fetchApi("http://localhost:8080/movie", { method: "GET" })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        setMovieList(obj);
      });
  }, []);
  const editDeletHandler = () => {
    fetchApi("http://localhost:8080/movie", { method: "GET" })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        setMovieList(obj);
      });
  };
  const clickHandler = () => {
    navigate("/movies/add");
  };
  const handleEdit = (id) => {
    navigate(`/movies/edit/${id}`);
  };
  const handleDelete = (id) => {
    fetchApi(`http://localhost:8080/movie/${id}`, { method: "DELETE" });
    editDeletHandler();
  };

  return (
    <TableContainer component={Paper}>
      <Button onClick={clickHandler} variant="contained" color="primary">
        Click to Add more
      </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Movie Name</TableCell>
            <TableCell align="right">Movie Date</TableCell>
            <TableCell align="right">Number of tickets</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movieList.map((row) => (
            <TableRow
              key={"id"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell align="right">{row.movieName}</TableCell>
              <TableCell align="right">{row.movieDate}</TableCell>
              <TableCell align="right">{row.movieTickets}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleEdit(row.id)} />
                <DeleteIcon onClick={() => handleDelete(row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MoviesList;
