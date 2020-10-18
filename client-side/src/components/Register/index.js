import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import handleRegister from '../actions/Register';
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

const Register = ({  
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  disabledButton,
  status,
  context: { auth }
}) => {
  const classes = useStyles();
  const dates = ['01', '02', '03', '04', '05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25','26','27','28','29','30','31'];
  const currentDate = new Date();
  const years = new Array((currentDate.getFullYear() + 1) - 1940).fill(null).map((_, i) => currentDate.getFullYear() - i);

  const handleLoginButton = () => {
    window.location = '/login'
  }

  if (auth.isAuthenticated) {
    return window.location = '/dashboard'
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {errors.mobileNumber && touched.mobileNumber && (
          <div className="error-text">{errors.mobileNumber}</div>
        )}
        {errors.firstName && touched.firstName && (
          <div className="error-text">{errors.firstName}</div>
        )}
        {errors.lastName && touched.lastName && (
          <div className="error-text">{errors.lastName}</div>
        )}
        {errors.email && touched.email && (
          <div className="error-text">{errors.email}</div>
        )}
        {errors.year && (
          <div className="error-text">{errors.year}</div>
        )}    
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            placeholder="Mobile number"
            value={values.mobileNumber ||""}
            component={InputText}
            disabled={status}
          />
          <Field
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            value={values.firstName ||""}
            component={InputText}
            disabled={status}
          />
          <Field
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
            value={values.lastName ||""}
            component={InputText}
            disabled={status}
          />
          <p className="text-date">Date of birth</p>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <Field name="month" as="select" className="react-select-month" disabled={status}>
                <option value=''>Month</option>
                <option value='01'>January</option>
                <option value='02'>February</option>
                <option value='03'>March</option>
                <option value='04'>April</option>
                <option value='05'>May</option>
                <option value='06'>June</option>
                <option value='07'>July</option>
                <option value='08'>August</option>
                <option value='09'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
              </Field>
            </Grid>
            <Grid item xs={3}>
              <Field name="date" as="select" className="react-select-month" disabled={status}>
                <option value=''>Date</option>
                {dates.map((date,id) =>
                <option value={date} key={id}>{date}</option>
                )}
              </Field>
            </Grid>
            <Grid item xs={3}>
              <Field name="year" as="select" className="react-select-month" disabled={status}>
                <option value=''>Year</option>
                {years.map((year,id) =>
                <option value={year} key={id}>{year}</option>
                )}
              </Field>
            </Grid>
          </Grid>
          <div role="group" aria-labelledby="my-radio-group" className="container-radio-button">
            <label>
              <Field type="radio" name="picked" value="male" className="radio-btn-male" disabled={status}/>
              Male
            </label>
            <label>
              <Field type="radio" name="picked" value="female" className="radio-btn-female" disabled={status}/>
              Female
            </label>
          </div>
          <Field
            type="email"
            name="email"
            id="email"
            value={values.email ||""}
            placeholder='Email address'
            component={InputText}
            disabled = {status}
          />       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={status}
          >
            Register
          </Button>
        </form>
        {status && (
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {handleLoginButton}
          >
            Login
          </Button>
        )} 
      </div>
    </Container>
  );
}

const registerSchemaValidation = Yup.object().shape({
  mobileNumber: Yup.string()
    .trim()
    .required('Mobile Number is required')
    .matches(/(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/, 'Mobile number invalid'),
  firstName: Yup.string()
    .trim()
    .required('First Name is required'),
  lastName: Yup.string()
    .trim()
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email Name is required'),
});

const formikRegisterCheck = withFormik({
  validationSchema: registerSchemaValidation,
  handleSubmit: async (
    values,
    {
      setErrors,
      setSubmitting,
      setStatus,
      resetForm
    }
  ) => {
    setSubmitting(true)
    let {email,mobileNumber, firstName, lastName, year, month, date, picked } = values;
    const password = 'test123';
    let birthdate = year + '-' + month + '-' + date
    if (year === undefined && month === undefined && date === undefined){
      birthdate = null
    }
    if (picked === undefined){
      picked = null
    }
    const register = await handleRegister(email,mobileNumber, password, firstName,lastName, picked, birthdate)

    if (register.email){
      resetForm({})
      setStatus(true)
    }

    if (register.data.mobile_number){
      setStatus(false)
      return setErrors({ mobileNumber: register.data.mobile_number[0] });
    }
    if (register.data.email){
      setStatus(false)
      return setErrors({ email: register.data.email[0] });
    }
    if (register.data.birthdate){
      setStatus(false)
      return setErrors({ year: 'Invalid Birthdate' });
    }
    
  },
});

export default withAppContext(formikRegisterCheck(Register));