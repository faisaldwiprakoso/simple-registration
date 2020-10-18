import axios from 'axios';

const handleRegister = async (email,mobile_number, password, first_name,last_name, gender, birthdate) => {
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/register/',
      data: {
        email,
        mobile_number, 
        password, 
        first_name,
        last_name, 
        gender, 
        birthdate
      }
    });
    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
}

export default handleRegister;
