import axios from 'axios';
const KEY = 'AIzaSyA1YAAJWYr-OO5FtrauV71WtxAtkzcQ-Xw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 2,
        key: KEY
    }
})