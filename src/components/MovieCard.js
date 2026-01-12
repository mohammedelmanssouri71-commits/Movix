import moviePicture from '../assets/game.jpg';
import { Link } from 'react-router-dom';
import { addFavorite } from '../slices/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

export default function MovieCard({movie}){
    const dispatch = useDispatch();
    let review = Number((movie.vote_average / 2).toFixed(2));
    let stars = [];
    let i = 1;
    let j = 1;
    while (i < review){
        stars.push(<i class="fa-solid fa-star" key={i}></i>);
        i++;
    }
    if (review % 2 !== 0){
        stars.push(<i class="fa-solid fa-star-half-stroke" key={i}></i>);
    }
    async function addFav(movie) {
        try {
            const res = await axios.post("http://localhost:3001/favorites", {userId: 1, type: "movie", typeId: movie.id});
            dispatch(addFavorite({userId: 1, type: "movie", typeId: movie.id}));
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='movie-card' key={movie.id}>
            <Link to={`/movies-details/${movie.id}`}><img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}.` : `https://image.tmdb.org/t/p/w500${movie.poster_path}.`} alt="cover" loading='lazy'/></Link>
            <div className='movie-details'>
                <h3>{movie.title}</h3>
                <p className='senarist'>{movie.release_date}</p>
                <p className='time'>{movie.vote_average.toFixed(2)}/10</p>
                <div>
                    {stars}
                </div>
                <div className='labels'>
                    {/* {labels} */}
                </div>
            </div>
            <button onClick={() => addFav(movie)}><i class="fa-regular fa-heart"></i></button>
        </div>
    )
}