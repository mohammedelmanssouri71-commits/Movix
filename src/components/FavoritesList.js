import axios from "axios"
import { initializeFav, deleteFavorite } from "../slices/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function FavoriteList(){
    const dispatch = useDispatch();
    async function fetchFav() {
        try {
            const res = await axios.get("http://localhost:3001/favorites");
            dispatch(initializeFav(res.data))
        } catch (error) {
            console.log(error)
        }

    }
    async function deleteFav(fav) {
        try {
            const res = await axios.delete(`http://localhost:3001/favorites/${fav.id}`);
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
            <div key={fav.id}>
                <p>{fav.type} {fav.typeId}</p>
                <button onClick={() => deleteFav(fav)}>delete</button>
            </div>
        )
    })
    return (
        <div>
            {favoritesList}
        </div>
    )
}