import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchCard from "./SearchCard";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

export default function SearchResults(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const {query} = useParams();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('movie');
    useEffect(() => {
        fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`)
        .then(res => res.json())
        .then(data => {
            setResults(data.results);
            console.log(data.results);
        })
        .finally(() => setLoading(false));
    },[query]);

    if(loading) return <Loader/>
    if (results.length == 0) return <p>No matched results</p>
    const resultsList = results.filter(m => m.media_type === mediaType).map(r => <SearchCard media={r} key={r.id}/>)
    return (
        <div className="search-results">
            <SearchBar/>
            <div>
                <div className="search-stats">
                    <p>Search results for "{query}"</p>
                    <div>
                        <div className={mediaType === "movie" ? "active" : ""} onClick={() => setMediaType('movie')}>
                            <p>Movies</p>
                            <span>{results.reduce((a,c) => c.media_type === "movie"?a + 1:a,0)}</span>
                        </div>
                        <div className={mediaType === "tv" ? "active" : ""} onClick={() => setMediaType('tv')}>
                            <p>TV Shows</p>
                            <span>{results.reduce((a,c) => c.media_type === "tv"?a + 1:a,0)}</span>
                        </div>
                        <div className={mediaType === "person" ? "active" : ""} onClick={() => setMediaType('person')}>
                            <p>Actors</p>
                            <span>{results.reduce((a,c) => c.media_type === "person"?a + 1:a,0)}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {resultsList.length !== 0 ? resultsList.slice(0,10) : <p>No {mediaType} match your search</p>}
                </div>
            </div>
        </div>
    )
}