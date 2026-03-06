import { useState } from "react";


export function checkFavIfExist(userId, media){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const [favs, setFavs] = useState([]);
    fetch(`${JSON_API_URL}/favorites`)
    .then(res => res.json())
    .then(data => setFavs(data));

    if(favs.find(f => f.userId === userId && f.media_type === media.type && f.media.id === media.id)){
        return true;
    }else {
        return false;
    }
}