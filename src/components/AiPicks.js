import { useRef, useState } from "react"
import { data } from "react-router-dom";

export default function AiPicks(){
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const inpRef =useRef();
    const [res, setRes] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        askForPick();
    }
    async function askForPick(){
        fetch("https://api.openai.com/v1/chat/completions", { 
                method: "POST", 
                headers: { "Authorization": `Bearer ${apiKey}`, 
                    "Content-Type": "application/json" }, 
                body: JSON.stringify({ 
                    model: "gpt-4.1-mini", 
                    messages: [{ role: "user", content: inpRef.current.value }] 
                }) 
        })
        .then(res => res.json())
        .then(data => {
            // setRes(data.choices[0].message.content);
            console.log(data);
        })
    }
    return (
        <div className="ai-picks">
            <h3>Welcome to AI Picks</h3>
            <div>
                <div>
                    <i class="fa-solid fa-robot"></i>
                    <p>What do you prefer to watch?</p>
                </div>
                <p>{res}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input ref={inpRef}/>
            </form>
        </div>
    )
}