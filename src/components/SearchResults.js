import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchCard from "./SearchCard";

export default function SearchResults(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const {query} = useParams();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.results))
        .finally(() => setLoading(false));
    },[query]);

    if(loading) return <p>Chargement...</p>
    const resultsList = results.map(r => <SearchCard movie={r} key={r.id}/>)
    return (
        <div>
            {resultsList}
        </div>
    )
}