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

export const getPostsbyPostedIn = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getpostsbypostedin`,id);
      console.log("data rec = ",res.data);
      return res.data.posts;
      
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
      if(res.status === 111)
      {
        return 111;
      }

      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const removeSavedPostbyId = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/removesavedpostbyid`,id);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const joinSubgreddit = async (object) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/joinsubgreddit`,object);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const requestSubgreddit = async (sgid) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/requestsubgreddit`,sgid);
      // if(res.status === 399)
      // {
      //   return 399;
      // }
      console.log("miscdata ",res.data);
      console.log("miscdata status ",res.data.status);
      console.log("misc status ",res.status);
      return res.status;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


export const getJoinedSubgreddits = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getjoinedsubgreddits`);
      // console.log(res.data.subgreddit);
      return res.data.subgreddit;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const rejectUser = async (object) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/rejectuser`,object);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const leaveSubgreddit = async (object) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/leavesubgreddit`,object);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const addComments = async (object) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/addcomments`,object);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const IgnoreReport = async (object) => {
  const token = localStorage.getItem('token');
  console.log("ir = ",object);
  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/ignorereport`,object);
      console.log(res.data);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getReportbyId = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getreportbyid`,id);
      // console.log(res.data.user);
      if(res.status === 111)
      {
        return 111;
      }

      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


export const blockUser = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/blockuser`,id);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const deletePost = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/deletepost`,id);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


export const mail = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/email`,id);
      // console.log(res.data.user);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


export const deleteSubGreddit = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/deletesubgreddit`,id);
      console.log(res.data);
      return res.data;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getStatbyId = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/getstatbyid`,id);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const UpdateDVVD = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/updatedvvd`,id);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const upVote = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/upvotepost`,id);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


export const downVote = async (id) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const res = await axios.post(`/downvotepost`,id);
      return res.data.post;
      
    } catch (err) {
      console.error(err);
    }
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};