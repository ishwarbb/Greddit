import axios from 'axios';


export const getUserInfo = async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const res = await axios.get(`/userinfo`);
        // console.log(res.data.user);
        return res.data.user;
        
      } catch (err) {
        console.error(err);
      }
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
};