import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import userLogin from '../actions/Login';
import withAppContext from '../../context/Consumer/withAppContext';

import { Field, withFormik } from 'formik';
import * as Yup from 'yup';

import InputText from '../../containers/InputText';


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

const Login = ({  
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  context: { auth }
}) => {
  const classes = useStyles();

  if (auth.isAuthenticated) {
    return window.location = '/dashboard'
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome to login page
        </Typography>
        <p>you can login with registered email and password is 'test123'</p>
        {errors.email && touched.email && (
          <div className="error-text">{errors.email}</div>
        )}
        {errors.password && touched.password && (
          <div className="error-text">{errors.password}</div>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={values.email ||""}
            component={InputText}
          />
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password ||""}
            component={InputText}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

const loginSchemaValidation = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required('Password is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email Name is required'),
});

const formikLoginCheck = withFormik({
  validationSchema: loginSchemaValidation,
  handleSubmit: async (
    values,
    {
      setErrors,
      setSubmitting,
    }
  ) => {
    let {email, password} = values;
    setSubmitting(true);
    const login = await userLogin(email,password);
    if (login.token){
      const tk = {}
      tk['token'] = login.token
      const user = login.user.data
      const data = {tk,user} 
      const usr = JSON.stringify(data)
      console.log(usr)
      localStorage.setItem("user", usr);
      window.location = '/dashboard'
    }
    else{
      return setErrors({ email: "Unable to log in with provided credentials."});
    };
  },
});

export default withAppContext(formikLoginCheck(Login));