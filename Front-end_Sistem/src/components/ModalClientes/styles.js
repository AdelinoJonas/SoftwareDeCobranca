import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // margin: "auto",
    heigth: "600px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    background: "white",
    borderRadius: 30,
    height: "98vh",
    position: "fixed",
    // left: "30vw",
  },
}));
