import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputEmail = ({ form, field, id,placeholder, type,value, ...props }) => {
  return <TextField {...field} {...props} fullWidth id={id} label={placeholder} type={type} value={value} variant="outlined" margin="normal"/>
};

export default InputEmail;