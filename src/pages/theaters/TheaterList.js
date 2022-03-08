import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { fetchApi } from "../utils/fetchMock";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
const TheaterList = () => {
  const [theaterList, settheaterList] = React.useState([]);
  let navigate = useNavigate();
  React.useEffect(() => {
    fetchApi("http://localhost:8080/theater", { method: "GET" })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        settheaterList(obj);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {theaterList.map((row) => (
            <TableRow
              key={row.theaterName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.theaterName}
              </TableCell>
              <TableCell align="right">{row.theaterDate}</TableCell>
              <TableCell align="right">{row.theaterLocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TheaterList;
