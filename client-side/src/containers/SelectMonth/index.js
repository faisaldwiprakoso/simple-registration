import Select from '@material-ui/core/Select';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const SelectMonth = ({ form, field, id,placeholder, type,value, ...props }) => {
  return (
    <Select
      {...field} {...props} 
      id={id} 
      type={type} 
      value={value}
      labelId="demo-simple-select-outlined-label"
      onChange={handleChange}
      label={placeholder} 
    >
    <MenuItem value={null}>
      <em>Month</em>
    </MenuItem>
    <MenuItem value='01'>January</MenuItem>
    <MenuItem value='02'>February</MenuItem>
    <MenuItem value='03'>March</MenuItem>
    <MenuItem value='04'>April</MenuItem>
    <MenuItem value='05'>May</MenuItem>
    <MenuItem value='06'>June</MenuItem>
    <MenuItem value='07'>July</MenuItem>
    <MenuItem value='08'>August</MenuItem>
    <MenuItem value='09'>September</MenuItem>
    <MenuItem value='10'>October</MenuItem>
    <MenuItem value='11'>November</MenuItem>
    <MenuItem value='11'>December</MenuItem>
  </Select>
  )
}

export default SelectMonth;