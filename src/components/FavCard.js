import poster from '../assets/game.jpg';

export default function FavCard({ fav, deleteFav }) {
  return (
    <div className="favorite-card">
      <img src={poster} alt="poster" />
      <div>
        <h3>{fav.type}</h3>
        <p>{fav.typeId}</p>
      </div>
      <button
        onClick={() => {
          const isConfirmed = window.confirm(
            `Are you sure you want to delete ${fav.type} ${fav.typeId}?`
          );
          if (isConfirmed) deleteFav();
        }}
      >
        Delete
      </button>
    </div>
  );
}
