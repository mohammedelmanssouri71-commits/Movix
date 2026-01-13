

export default function Dashboard(){
    const styleDash = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px"
    }
    return (
        <div>
            <h2 style={styleDash}>{process.env.NODE_ENV} Environment</h2>
        </div>
    )
}