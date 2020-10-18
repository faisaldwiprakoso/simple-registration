import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));
const Dashboard = lazy(() => import('../Dashboard'));

const RootRouter = props => {
  const classes = useStyles();
  return (
    <Suspense fallback={<CircularProgress className={classes.root}/>}>
      <Switch>
        <Route exact path="/" component={props => <Register {...props} />} />
        <Route exact path="/login" component={props => <Login {...props} />} />
        <Route exact path="/dashboard" component={props => <Dashboard {...props} />} />
      </Switch>
    </Suspense>
  );
}

export default RootRouter;
