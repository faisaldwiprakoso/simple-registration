import React, {useState,useEffect} from 'react';
import './App.scss';
import RootRouter from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/Provider/AuthContext';
import { CircularProgress, Grid } from '@material-ui/core';

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //validate user
  useEffect(() => {
    const getUserSession = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.tk.token) {
        setUserAuth(user)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        return {};
      }
    }
    if (userAuth === null) {
      getUserSession();
    }
  }, [userAuth]);

  const handleUser = user => {
    if (user === userAuth) return;
    setUserAuth(user);
  }

  const authProps = {
    isAuthenticated: !!userAuth,
    user: userAuth,
    setUser: handleUser,
  };

  return (
    <div className="App">
      {isLoading ?
        <Grid
          container
          style={{ minHeight: '100vh' }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress variant="indeterminate" />
          </Grid>
        </Grid>
        :
        <AuthContext.Provider value={{ auth: authProps }}>
          <BrowserRouter>
            <RootRouter />
          </BrowserRouter>
        </AuthContext.Provider>
      }
    </div>
  );
}

export default App;
