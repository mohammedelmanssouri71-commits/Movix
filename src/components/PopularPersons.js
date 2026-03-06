import { useEffect, useState } from "react";
import Loader from "./Loader";
import PersonCard from "./PersonCard";


export default function PopularPersons(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxPages, setMaxPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    


    useEffect(() => {
        fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPersons(data.results)
            if(!maxPages) setMaxPages(data.total_pages);
        })
        .finally(() => setLoading(false));
    }, [currentPage])

    if (loading) return <Loader/>;
    const personsList = persons.map(p => <PersonCard person={p} key={p.id}/>);

    function handlePrevPage(){
        if (currentPage > 1){
            setCurrentPage(prev => prev - 1);
        }else{
            setCurrentPage(1);
        }
    }
    function handleNextPage(){
        if (currentPage < maxPages){
            setCurrentPage(prev => prev + 1);
        }else{
            setCurrentPage(maxPages);
        }
    }
    return (
        <div className="persons-list">
            <h2>Popular</h2>
            <div>
                {personsList}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage}><i class="fa-solid fa-angles-left"></i></button>
                <div>{currentPage}/{maxPages}</div>
                <button onClick={handleNextPage}><i class="fa-solid fa-angles-right"></i></button>
            </div>
        </div>
    )
}