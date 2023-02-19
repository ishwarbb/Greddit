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

export const getOtherUserInfo = async (targetemail) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/otheruserinfo`,targetemail);
      // console.log(res.data.user);
      return res.data.user;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getUserGredditInfo = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.get(`/getusersubgreddit`);
      // console.log(res.data.user);
      return res.data.subgreddit;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getAllGredditInfo = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.get(`/getallsubgreddit`);
      // console.log(res.data.user);
      return res.data.subgreddit;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getSubGredditInfobyID = async (id) => {
  const token = localStorage.getItem('token');
  console.log(id);

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getsubgredditbyid`,id );
      // console.log(res.data.user);
      return res.data.subgreddit;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getPosts = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getposts`);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getPostsbyId = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getpostsbyid`,id);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

