import axios from "axios";
 

const instance = axios.create({
    // baseURL:'https://url-9uyl.onrender.com/',
    baseURL:'http://localhost:4000/',

  });

  export default instance;