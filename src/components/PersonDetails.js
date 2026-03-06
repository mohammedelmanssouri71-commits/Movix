import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";

export default function PersonDetails(){
    const {personId} = useParams();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState(null);
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showImg, setShowImg] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        Promise.all([
            fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`)
            .then(res => res.json()),
    
            fetch(`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`)
            .then(res => res.json()),

            fetch(`${BASE_URL}/person/${personId}/images?api_key=${API_KEY}`)
            .then(res => res.json()),
        ])
        .then(([personData, creditsData, imagesData]) => {
            setPerson(personData);
            setCredits(creditsData.cast.sort((a,b) => b.popularity - a.popularity).slice(0,10));
            console.log(creditsData);
            setImages(imagesData.profiles);
            console.log(imagesData);
        })
        .catch(error => {
            console.error("Erreur API :", error);
        })
        .finally(() => setLoading(false));
    
    }, [personId, API_KEY]);

    if (loading) return <Loader/>;

    const castList = credits.map(c => {
        return (
            <div key={c.credit_id}>
                <Link to={`/${c.media_type}-details/${c.id}`}><img src={`https://image.tmdb.org/t/p/original${c.poster_path ? c.poster_path:c.backdrop_path}`} alt="poster" loading="lazy"/></Link>
                <p title="Character">{c.character}</p>
                <span>{c.media_type.toUpperCase()}</span>
            </div>
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
        <div className="person-details">
            {!showImg ? 
            <div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/original${person.profile_path}`}/>
                    <div className="card-photos" onClick={() => setShowImg(true)}>
                        <i class="fa-solid fa-photo-film"></i>
                        <p>+{images.length} PHOTOS</p>
                    </div>
                </div>
                <div style={{width: 'calc(100% - 290px)'}}>
                    <h2>{person.name.toUpperCase()}</h2>
                    <div className="biography">
                        <h3>Biography</h3>
                        <p>{person.biography.length === 0 ? "No biography available for this person": person.biography}</p>
                    </div>
                    <div className="credits">
                        <h3>Known for</h3>
                        <div>
                            {castList}
                        </div>
                    </div>
                </div>
            </div> :
            <div className="photos">
                <button onClick={() => setShowImg(false)} className="btn-close"><i class="fa-solid fa-xmark"></i></button>
                <p>{imgIndex + 1} of {images.length}</p>
                <div>
                    <button onClick={handleDec} disabled={imgIndex === 0}><i class="fa-solid fa-angle-left"></i></button>
                    <img src={`https://image.tmdb.org/t/p/original${images[imgIndex].file_path}`}/>
                    <button onClick={handleInc} disabled={imgIndex === images.length - 1}><i class="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
            }
        </div>
    )
}