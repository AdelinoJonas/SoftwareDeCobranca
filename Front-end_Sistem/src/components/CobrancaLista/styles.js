import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  pesquisarCobranca: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  pesquisarCobranca_input: {
    "& label.MuiInputLabel-root": {
      marginLeft: "16px",
      marginTop: "-5px",
      fontFamily: "Nunito",
    },
    "& label.Mui-focused": {
      color: "#DA0175",
    },
    "& label.Mui-shrink": {
      transform: "translate(14px, -4px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginLeft: "16px",
      minWidth: "250px",
      maxWidth: "360px",
      height: "45px",
      backgroundColor: "#ffffff",
      boxShadow: "5px 5px 5px rgba(218, 1, 117, 0.05);",
      "& input": {
        fontFamily: "Nunito",
        lineHeight: "25px",
        fontWeight: 400,
        fontSize: "18px",
        color: "#00000f",
      },
      "& fieldset": {
        borderColor: "#ffffff",
      },
      "&:hover fieldset": {
        borderColor: "#DA0175",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#DA0175",
      },
    },
  },
  pesquisarCobranca_icon: {
    position: "absolute",
    right: "15px",

    cursor: "pointer",
  },
  tableContainer: {
    borderRadius: "30px",
    width: "81vw",
  },
  table_cobrancaIcone: {
    cursor: "pointer",
  },
  table_ordenar: {
    position: "relative",
  },
  table_ordenarIcone: {
    cursor: "pointer",
    position: "relative",
    top: "5px",
  },
}));
