import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// datepicker
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  grid: {
    marginTop: theme.spacing(1),
  },
  textfield: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    width: "100%",
  },
}));

function About() {
  const classes = useStyles();
  const [inputDate, setInputDate] = useState(new Date());
  const [inputDes, setInputDes] = useState("");
  const [inputHolidays, setInputHolidays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let input = {
      year: inputDate.getFullYear(),
      month: inputDate.getMonth(),
      day: inputDate.getDate(),
      des: inputDes,
    };

    console.log(input);
    /*axios.post(`http://localhost:8080/holidays`, input).then((res) => {
      let data = res.data;
      console.log(data);
      //setInputFields(values);
    });*/
  };

  const handleInputDes = (e) => {
    setInputDes(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={inputDate}
                  onChange={setInputDate}
                  label="Date"
                  size="small"
                />
              </MuiPickersUtilsProvider>
              <br />
              <TextField
                className={classes.textfield}
                id="des"
                label="Description"
                variant="outlined"
                size="small"
                value={inputDes}
                onChange={handleInputDes}
                InputProps={{
                  readOnly: false,
                }}
                width="100%"
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {inputHolidays.map((holiday) => (
              <div key={holiday.month}></div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
