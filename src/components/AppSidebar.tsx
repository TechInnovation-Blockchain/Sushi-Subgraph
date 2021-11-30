import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
}));

export default function AppSidebar({ sidebarOptions, setSidebarOptions }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setSidebarOptions({ ...sidebarOptions, [event.target.name]: event.target.checked });
  };

  const items = [
    "ethereum",
    "bsc",
    "moonriver",
    "xdai",
    "polygon",
    "harmony",
    "celo",
    "fantom",
    "arbitrum",
  ];

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={sidebarOptions[item]}
                  onChange={handleChange}
                  name={item}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
