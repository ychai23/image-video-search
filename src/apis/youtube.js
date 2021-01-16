import axios from 'axios';
const KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(KEY);
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 2,
        key: KEY
    }
})