import { Container, Drawer, Hidden, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "./AppBar";
import AppSidebar from "./AppSidebar";
import AppSidebar2 from "./AppSidebar2";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  // hide: {
  //   display: "none",
  // },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaperMobile: {
    width: drawerWidth,
    border: 0,
  },

  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    // marginLeft: -drawerWidth,

    padding: theme.spacing(3, 0),
    flexGrow: 1,

    width: "100%",
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: -drawerWidth,
  },
  contentShift: {
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

function AppShell(props) {
  const { window, children, sidebarOptions, setSidebarOptions } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const onToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar
        onToggleSidebar={onToggleSidebar}
        open={open}
        mobileOpen={mobileOpen}
      />
      <nav className={classes.drawer} aria-label="navigation">
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          transitionDuration={0}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {props.sidebar === "1" ? (
            <AppSidebar
              sidebarOptions={sidebarOptions}
              setSidebarOptions={setSidebarOptions}
            />
          ) : (
            <AppSidebar2
              sidebarOptions={sidebarOptions}
              setSidebarOptions={setSidebarOptions}
            />
          )}
        </Drawer>
      </nav>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open || !matches,
        })}
      >
        <div className={classes.toolbar} />
        <Container maxWidth="xl">{children}</Container>
      </main>
    </div>
  );
}

export default AppShell;
