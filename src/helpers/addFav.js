function favAlreadyExist(type){
        if (favorites.find(md => md.media.id === movie.id && mv.media_type === "movie")){
            return true;
        }else{
            return false;
        }
    }

async function addFav(movie) {
    try {
        const res = await axios.post(`${JSON_API_URL}/favorites`, {userId: user.id, media_type: "movie", media: {id: movie.id, poster_path: movie.poster_path }});
        dispatch(addFavorite({userId: user.id, media_type: "movie", media: {id: movie.id, poster_path: movie.poster_path }}));
    } catch (error) {
        console.log(error);
    }

}