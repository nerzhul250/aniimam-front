import Axios from 'axios'

const URL = 'https://api.jikan.moe/v3';

const axios = Axios.create({
    baseURL: URL
  });

export default axios