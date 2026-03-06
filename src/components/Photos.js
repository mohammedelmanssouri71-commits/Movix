import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Loader from "./Loader";
import { Link } from "react-router-dom";


export default function Photos(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const {mediaId} = useParams();
    const {mediaType} = useParams();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        fetch(`${BASE_URL}/${mediaType}/${mediaId}/images?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setImages(data.backdrops))
        .finally(() => {
            setLoading(false);
        })
    },[])

    if (loading) return <Loader/>;

    const imagesList = images.map(i => {
        return (
            <img src={`https://image.tmdb.org/t/p/original${i.file_path}`}/>
        )
    })

    function handleDec(){
        if (imgIndex > 0){
            setImgIndex(prev => prev - 1);
        }else{
            setImgIndex(0);
        }
    }
    function handleInc(){
        if (imgIndex < images.length - 1){
            setImgIndex(prev => prev + 1);
        }else{
            setImgIndex(images.length - 1);
        }
    }
    return (
        <div className="media-photos">
            <Link to={`/${mediaType}-details/${mediaId}`}><button className="btn-close"><i class="fa-solid fa-xmark"></i></button></Link>
            <p>{imgIndex + 1} of {imagesList.length}</p>
            <div>
                <button onClick={handleDec} className="btn-left" disabled={imgIndex === 0}><i class="fa-solid fa-angle-left"></i></button>
                {imagesList[imgIndex]}
                <div></div>
                <button onClick={handleInc} className="btn-right" disabled={imgIndex === imagesList.length - 1}><i class="fa-solid fa-angle-right"></i></button>
            </div>
        </div>
    )
}