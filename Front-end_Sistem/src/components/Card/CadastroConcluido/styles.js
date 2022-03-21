import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: ' #D0D5DD ',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#D0D5DD',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'none',
        border: '1px solid #D0D5DD',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        width: '368px',
        height: '44px',
        marginLeft: '0px',
        marginTop: '6px',
      },
      '&:hover fieldset': {
        borderColor: ' #D0D5DD ',
      },
      '&.Mui-focused fieldset': {
        borderColor: ' #D0D5DD ',
      },
    },
    '& .MuiOutlinedInput-input': {
      fontFamily: 'Nunito, sans-serif',
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: '16px',
    },

    height: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Montserrat, sans-serif',
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#DA0175',
    textAlign: 'center',
    width: '160px',
    height: '33px',
    borderRadius: '10px',
    color: '#F8F8F9',
    '&:hover': {
      backgroundColor: '#0E8750',
    },
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25px',
    fontFamily: 'Nunito, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '25px',
  },
  
  cardLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '940px',
    height: '50%',
  },
  containerConcluido:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: '70px',
  },
  status: {
    height: '100%',
    background: '#F0F0F5',
    margin: '0',
    fontSize: '1.5rem',
    display: 'flex',
  },
  Paper: {
    height: '100%',
  },
  h1: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#343447',
    textAlign:'center',
  },
  titulo: {
    display: 'flex',
  },
  iconesStatus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    marginTop: '180px',
    marginLeft: '50px',
    marginBottom: '14px',
  },
  traco: {
    width: '5px',
    border: '3px',
  },
  caracterStatus: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '80px',
    marginLeft: '25px',
  },
  tituloVerde: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '130%',
    color: '#0E8750',
    marginBottom: '8px',
  },
  tituloCinza: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '130%',
    color: '#3F3F55',
    marginBottom: '35px',
  },
  barraStatus: {
    with: '82px',
    height: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '60px',
  },
  layoutPrincipal: {
    display: 'flex',
  },
  concluido: {
    background: '#F0F0F5',
    width: '35vw',
    height: '55vh',
    borderRadius: '31px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  checked: {
    width:'20%',
    marginBottom:'24px',
  },
  buttonLink: {
    textDecoration: 'none',
  },
}));
