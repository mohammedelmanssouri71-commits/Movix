

export default function Trailer({videoId}){
    return (
        <iframe
        width="700px"
        height="415"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder={0}>
        </iframe>
    )
}