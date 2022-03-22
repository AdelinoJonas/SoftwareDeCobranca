import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal02: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '30px ',
    width: '600px',
    height: '754px',
    boxShadow: theme.shadows[9],
    padding: theme.spacing(2, 4, 3),
  },
  headerModal: {
    display: 'flex',
  },
}));
