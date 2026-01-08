import moviePicture from '../assets/game.jpg';
import { Link } from 'react-router-dom';

export default function MovieCard({movie}){
    // let labels = movie.genres.map(g => <p className='label'>{g.name}</p>);
    let review = Number((movie.vote_average / 2).toFixed(2));
    let stars = [];
    let i = 1;
    let j = 1;
    while (i < review){
        stars.push(<i class="fa-solid fa-star"></i>);
        i++;
    }
    if (review % 2 !== 0){
        stars.push(<i class="fa-solid fa-star-half-stroke"></i>);
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
            <button><i class="fa-regular fa-heart"></i></button>
        </div>
    )
}