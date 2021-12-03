import {CLIENT_ID,CLIENT_SECRET} from '../utils/constants'

const getToken=async()=>{

    
    let urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");
      urlencoded.append("client_id", CLIENT_ID);
      urlencoded.append("client_secret", CLIENT_SECRET);

      try{
        const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded,
        redirect: "follow",
      })

      const token= await response.json();

      return token;
      }
      catch(e){
        console.log(e)
      }

    
}

export {getToken}  