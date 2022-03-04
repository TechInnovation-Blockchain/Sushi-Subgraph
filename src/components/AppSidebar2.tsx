import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { grey } from "@material-ui/core/colors";
import { networkItems } from "data";
import { Radio, RadioGroup, RadioProps } from "@material-ui/core";

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

const GreyRadio = withStyles({
  root: {
    color: grey[500],
    "&$checked": {
      color: grey[700],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default function AppSidebar({ sidebarOptions, setSidebarOptions }) {
  const classes = useStyles();
  const [value, setValue] = React.useState('ethereum');

  const handleChange = (event) => {
    // console.log("sidebarOptions || AppSidebar", sidebarOptions);
    setValue(event.target.value);
    // const abc = sidebarOptions?.map(item => {
    //   if (item.name === event.target.value) {
    //     item.defaultSelected = true;
    //   } else {
    //     item.defaultSelected = false;
    //   }
    //   return item;
    // })
    // setSidebarOptions(value);
    setSidebarOptions(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>

      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {networkItems.map((item) => (
            <FormControlLabel
              key={item.name}
              value={item.name}
              control={
                <GreyRadio />
              }
              label={
                <div>
                  <span>{item.name}&nbsp;&nbsp;</span>
                  <a
                    href={item.url}
                    style={{ color: "gray" }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    ↗
                  </a>
                </div>
              }
            />
          ))}

      </RadioGroup>

          
      </FormControl>
    </div>
  );
}
