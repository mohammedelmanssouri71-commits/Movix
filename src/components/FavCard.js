import { Link } from 'react-router-dom';

export default function FavCard({ fav, deleteFav }) {
  console.log(fav)
  return (
    <div className="favorite-card">
      <Link to={`/${fav.media_type}-details/${fav.media.id}`}><img src={`https://image.tmdb.org/t/p/original${fav.media_type !== "person" ? fav.media.poster_path : fav.media.profile_path}`} alt="poster" /></Link>
      <div>
        <span>{fav.media_type.toUpperCase()}</span>
      </div>
      <button
        onClick={() => {
          const isConfirmed = window.confirm(
            `Are you sure you want to delete "${fav.media.title || fav.media.name}" from your favourites?`
          );
          if (isConfirmed) deleteFav();
        }}
      >
        Delete
      </button>
    </div>
  );
}
