import React from "react";
import { fetchApi } from "../utils/fetchMock";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
const TheaterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theaterName, settheaterName] = React.useState("");
  const [theaterDate, settheaterDate] = React.useState();
  const [theaterLocation, settheaterLocation] = React.useState("");

  const theaterNameHandler = (event) => {
    settheaterName(event.target.value);
  };

  const theaterDatehandler = (event) => {
    settheaterDate(event.target.value);
  };

  const theaterLocationHandler = (event) => {
    settheaterLocation(event.target.value);
  };
  React.useEffect(() => {
    fetchApi(`http://localhost:8080/theaters/${id}`, { method: "GET" })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        settheaterName(obj.theaterName);
        settheaterDate(obj.theaterDate);
        settheaterLocation(obj.theaterLocation);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(theaterName, theaterDate, theaterLocation);
    const theaterObj = {
      theaterName,
      theaterDate,
      theaterLocation,
    };
    fetchApi("http://localhost:8080/theater ", {
      method: "PUT",
      body: theaterObj,
    })
      .then((resp) => resp.json())
      .then((obj) => navigate(`/theaters/list`));
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
                label="Theater Name"
                value={theaterName}
                onChange={theaterNameHandler}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                type="date"
                value={theaterDate}
                onChange={theaterDatehandler}
              />
            </div>
            <div>
              <TextField
                required
                type="text"
                id="outlined-required"
                label="Theater Location"
                value={theaterLocation}
                onChange={theaterLocationHandler}
              />
            </div>
            <div></div>
            <Button type="submit" variant="contained" color="primary">
              Edit Theater
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};
export default TheaterEdit;
