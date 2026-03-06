import axios from "axios"
import { fetchFav, deleteFavorite } from "../slices/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import NotFoundFav from "./NotFoundFav";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

import FavCard from "./FavCard";
import Loader from "./Loader";
const API_KEY = process.env.REACT_APP_API_KEY;
const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
export default function FavoriteList(){

    const {user, setUser} = useContext(UserContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFav())
    },[]);

    const deleteFav = useCallback(async (fav) => {
        try {
            const res = await axios.delete(`${JSON_API_URL}/favorites/${fav.id}`);
            dispatch(deleteFavorite({favId: fav.id}));
        } catch (error) {
            console.log(error)
        }
    },[])   
    const favorites = useSelector((state) => state.favorites.value);
    console.log(favorites);
    if(!user) return <Loader/>;
    const favoritesList = favorites.filter(f => f.userId === user.id).map(fav => {
        return (
            <FavCard fav={fav} deleteFav={() => deleteFav(fav)} key={fav.id}/>
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