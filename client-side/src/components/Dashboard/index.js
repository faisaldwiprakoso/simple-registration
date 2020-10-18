import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withAppContext from '../../context/Consumer/withAppContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Dashboard = ({ context: { auth } }) => {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location = '/login'
  }

  if (!auth.isAuthenticated){
    window.location='/login'
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome to dashboard page
        </Typography>
        <p>Mobile number: {auth.user.user.mobile_number} </p>
        <p>Email: {auth.user.user.email} </p>
        <p>First name: {auth.user.user.first_name} </p>
        <p>Last name: {auth.user.user.last_name} </p>
        <p>Date of birth: {auth.user.user.birthdate} </p>
        <p>gender: {auth.user.user.gender} </p>
        <p>Access token: {auth.user.tk.token} </p>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Container>
  );
}

export default withAppContext(Dashboard);