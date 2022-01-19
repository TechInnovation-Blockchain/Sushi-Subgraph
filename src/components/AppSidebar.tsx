import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { grey } from "@material-ui/core/colors";
// import { ArrowUpward } from "@material-ui/icons";
// import { IconButton } from "@material-ui/core";
import { networkItems } from "data";

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

const GreyCheckbox = withStyles({
  root: {
    color: grey[500],
    "&$checked": {
      color: grey[700],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function AppSidebar({ sidebarOptions, setSidebarOptions }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setSidebarOptions({
      ...sidebarOptions,
      [event.target.name]: event.target.checked,
    });
  };

  // TODO: urls for networks
  // const items = [
  //   { name: "ethereum", url: "https://analytics.sushi.com" },
  //   { name: "bsc", url: "https://analytics-bsc.sushi.com" },
  //   { name: "moonriver", url: "https://analytics-moonriver.sushi.com" },
  //   { name: "xdai", url: "https://analytics-xdai.sushi.com" },
  //   { name: "polygon", url: "https://analytics-polygon.sushi.com" },
  //   { name: "harmony", url: "https://analytics-harmony.sushi.com" },
  //   { name: "celo", url: "https://analytics-celo.sushi.com" },
  //   { name: "fantom", url: "https://analytics-fantom.sushi.com" },
  //   { name: "arbitrum", url: "https://analytics-arbitrum.sushi.com" },
  //   { name: "avalanche", url: "https://analytics-avalanche.sushi.com" },
  // ];

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {networkItems.map((item) => (
            <FormControlLabel
              key={item.name}
              control={
                <GreyCheckbox
                  checked={sidebarOptions[item.name]}
                  onChange={handleChange}
                  name={item.name}
                />
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
        </FormGroup>
      </FormControl>
    </div>
  );
}
