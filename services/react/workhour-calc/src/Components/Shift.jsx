import React, { useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

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

// accordion
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
  },
  textfield: {
    marginLeft: theme.spacing(1),
    width: 60,
  },
  ordinary: {
    marginRight: theme.spacing(3),
  },
  shift: {
    marginBottom: theme.spacing(2),
  },
  report: {
    "& div": {},
  },
}));

function Shift() {
  const classes = useStyles();
  // DatePickers
  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      startDateTime: new Date(),
      lastDateTime: new Date(),
      ord: [0, 0, 0, 0],
      ext: [0, 0, 0, 0],
      total: 0,
    },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        startDateTime: new Date(),
        lastDateTime: new Date(),
        ord: [0, 0, 0, 0],
        ext: [0, 0, 0, 0],
        total: 0,
      },
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

    const inputs = inputFields.map((i) => {
      let workDay = {
        id: i.id,
        start: {
          year: i.startDateTime.getFullYear(),
          month: i.startDateTime.getMonth() + 1, // add 1 by python compativility
          date: i.startDateTime.getDate(),
          hour: i.startDateTime.getHours(), // ignore minutes
        },
        end: {
          year: i.lastDateTime.getFullYear(),
          month: i.lastDateTime.getMonth() + 1, // add 1 by python compativility,
          date: i.lastDateTime.getDate(),
          hour: i.lastDateTime.getHours(), // ignore minutes
        },
      };
      return workDay;
    });

    console.log(inputs);

    axios.post(`http://localhost:8080/api/calculate`, inputs).then((res) => {
      let data = res.data;

      const values = inputFields.map((element) => {
        data.forEach((item) => {
          if (element.id === item.id) {
            element.ord = item.ord;
            element.ext = item.ext;
            element.total = item.total;
          }
        });
        return element;
      });
      setInputFields(values);
    });
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
            <form className={classes.root}>
              {inputFields.map((inputField) => (
                <div key={inputField.id} className={classes.shift}>
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
                  <TextField
                    className={classes.textfield}
                    id="index"
                    label="HD"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ord[0]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="HN"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ord[1]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="HDF"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ord[2]}
                  />
                  <TextField
                    className={`${classes.textfield} ${classes.ordinary}`}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="HNF"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ord[3]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="EXD"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ext[0]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="EXN"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ext[1]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="EDF"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ext[2]}
                  />
                  <TextField
                    className={`${classes.textfield} ${classes.ordinary}`}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    label="ENF"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.ext[3]}
                  />
                  <TextField
                    className={classes.textfield}
                    id="work-hours"
                    variant="outlined"
                    size="small"
                    label=""
                    InputProps={{
                      readOnly: true,
                    }}
                    value={inputField.total}
                  />
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
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Report</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ flex: 1 }}>
                  <p>Total Hrs.</p>
                  <TextField
                    className={classes.textfield}
                    id="total-hours"
                    variant="outlined"
                    size="small"
                    label=""
                    InputProps={{
                      readOnly: true,
                    }}
                    value={0}
                  />
                </div>
                <Typography style={{ flex: 1 }}>
                  <div className="report">
                    <div>
                      <p>Ordinary</p>
                    </div>
                    <div>
                      <p>Daytime Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                    <div>
                      <p>Nocturnal Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                    <div>
                      <p>Holiday Daytime Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                    <div>
                      <p>Holiday Nocturnal Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                  </div>
                </Typography>
                <Typography style={{ flex: 1 }}>
                  <div className="report">
                    <div>
                      <p>Extra</p>
                    </div>
                    <div>
                      <p>Daytime Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>

                    <div>
                      <p>Nocturnal Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                    <div>
                      <p>Holiday Daytime Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                    <div>
                      <p>Holiday Nocturnal Hrs.</p>
                      <TextField
                        className={classes.textfield}
                        id="daytime-hours"
                        variant="outlined"
                        size="small"
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        value={0}
                      />
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Shift;
