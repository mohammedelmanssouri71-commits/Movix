import axios from "axios"
import { initializeFav, deleteFavorite } from "../slices/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFoundFav from "./NotFoundFav";

import FavCard from "./FavCard";
const API_KEY = process.env.REACT_APP_API_KEY;
const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
export default function FavoriteList(){
    const dispatch = useDispatch();
    async function fetchFav() {
        try {
            const res = await axios.get(`${JSON_API_URL}/favorites`);
            dispatch(initializeFav(res.data))
        } catch (error) {
            console.log(error)
        }

    }


    async function deleteFav(fav) {
        try {
            const res = await axios.delete(`${JSON_API_URL}/favorites/${fav.id}`);
            dispatch(deleteFavorite({favId: fav.typeId}));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchFav();
    }, [])
    const favorites = useSelector((state) => state.favorites.value);
    const favoritesList = favorites.map(fav => {
        return (
            <FavCard fav={fav} deleteFav={() => deleteFav(fav)}/>
        )
    })
    return (
        <div className="favorite-list">
            {favoritesList.length === 0 ? 
                <div className="not-found-fav">
                    <NotFoundFav/>
                </div>
            : favoritesList}

        </div>
    )
}