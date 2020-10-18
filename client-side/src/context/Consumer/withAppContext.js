import React from 'react';
import AuthContext from '../Provider/AuthContext';

export default function (WrappedComponent) {
  return (props) => (
    <AuthContext.Consumer>
      {state => <WrappedComponent {...props} context={state} />}
    </AuthContext.Consumer>
  )
}
