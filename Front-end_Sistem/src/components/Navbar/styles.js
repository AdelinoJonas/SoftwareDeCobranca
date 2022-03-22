import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 108;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 3,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#F0F0F5",
  },
  navbarContainer: {
    marginTop: 45,
  },
  navbarItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 80,
    textDecoration: "none",
    color: "#343447",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    "&:hover": {
      borderRight: "3px solid #DA0175",
      color: "#DA0175",
    },
  },
  navbarIcon: {
    width: "48px",
    height: "48px",
  },
  
}));
