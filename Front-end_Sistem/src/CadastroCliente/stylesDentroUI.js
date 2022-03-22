import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      display: "flex",
      flexDirection: "column",
    },
    height: "86vh",
    "& .MuiOutlinedInput-multiline": {
      padding: "8px 14px",
      borderRadius: "8px",
    },
  },
  right: {
    marginRight: "20px",
  },
  buttonstyle: {
    height: "30px",
    marginTop: "10px",
  },

  spaces: {
    width: "190px",
  },
}));

export default useStyles;
