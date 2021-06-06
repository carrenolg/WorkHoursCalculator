import React, { useEffect, useState } from "react";
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
// confirmation dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  holiday: {
    marginRight: theme.spacing(2),
  },
  containerHoliday: {
    marginBottom: theme.spacing(2),
  },
}));

function Holiday() {
  const classes = useStyles();
  const [inputDate, setInputDate] = useState(new Date());
  const [inputDes, setInputDes] = useState("");
  const [inputHolidays, setInputHolidays] = useState([]);
  const [open, setOpen] = useState(false); // dialog

  useEffect(() => {
    getAllHolidays();
  }, []);

  const getAllHolidays = async () => {
    const response = await axios.get(`/api/holidays`);
    const holidays = await response.data;
    const data = holidays.map((i) => {
      i.month = i.month - 1; // minus 1 python compativility
      return i;
    });
    setInputHolidays(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let holiday = {
      year: inputDate.getFullYear(),
      month: inputDate.getMonth() + 1, // add 1 by python compativility
      day: inputDate.getDate(),
      des: inputDes,
    };

    const response = await axios.post(
      `/api/holidays`,
      holiday
    );
    const holidays = await response.data;
    if (holidays !== undefined) {
      setInputDes("");
      getAllHolidays();
    }
  };

  const handleInputDes = (e) => {
    setInputDes(e.target.value);
  };

  const handleDelete = async (e, holiday) => {
    setOpen(false);
    const response = await axios.delete(
      `/api/holidays/${holiday.id}`
    );
    const result = await response.data;
    if (result !== undefined) {
      getAllHolidays();
    }
  };

  // dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <div key={holiday._id.$oid} className={classes.containerHoliday}>
                <TextField
                  className={classes.holiday}
                  id={holiday._id.$oid}
                  variant="outlined"
                  size="small"
                  value={new Date(
                    holiday.year,
                    holiday.month,
                    holiday.day
                  ).toLocaleDateString()}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  className={classes.holiday}
                  id={holiday._id.$oid}
                  variant="outlined"
                  size="small"
                  value={holiday.des}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Holidays"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Do you want to delete it?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      autoFocus
                      onClick={(date) =>
                        handleDelete(date, {
                          id: holiday._id.$oid,
                        })
                      }
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Holiday;
