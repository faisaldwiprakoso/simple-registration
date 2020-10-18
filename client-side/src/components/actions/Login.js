import axios from 'axios';

const handleRegister = async (email,password) => {
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/token/',
      data: {
        email,
        password, 
      }
    });
    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
}

export default handleRegister;
