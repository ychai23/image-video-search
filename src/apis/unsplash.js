import axios from "axios";

export default axios.create({
   baseURL: "https://api.unsplash.com",
   headers: {
      Authorization: "Client-ID ksEb1vM_BAdIT3x4DLXC277xiNbpnETyHZUGG4gXYWQ",
   },
});