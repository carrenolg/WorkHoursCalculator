import React, { useState } from "react";
//import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import TextField from "@material-ui/core/TextField";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import IcoButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function Shift() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), startDateTime: new Date(), lastDateTime: new Date() },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), startDateTime: new Date(), lastDateTime: new Date() },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const handleChangeInput = (date, obj) => {
    //console.log(date);
    const values = inputFields.map((element) => {
      if (obj.id === element.id) {
        element[obj.name] = date;
      }
      return element;
    });
    setInputFields(values);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.root} onSubmit={handleSubmit}>
              {inputFields.map((inputField) => (
                <div key={inputField.id}>
                  <IcoButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IcoButton>
                  <IcoButton onClick={handleAddFields}>
                    <AddIcon />
                  </IcoButton>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      value={inputField.startDateTime}
                      onChange={(date) =>
                        handleChangeInput(date, {
                          id: inputField.id,
                          name: "startDateTime",
                        })
                      }
                    />
                    <DateTimePicker
                      value={inputField.lastDateTime}
                      onChange={(date) =>
                        handleChangeInput(date, {
                          id: inputField.id,
                          name: "lastDateTime",
                        })
                      }
                    />
                  </MuiPickersUtilsProvider>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Shift;
