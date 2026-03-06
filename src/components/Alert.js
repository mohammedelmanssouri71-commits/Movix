

export default function Alert({alert}){
    console.log(alert.type);
    return (
        <div className={`alert alert-${alert.type}`}>
            <p>{alert.message}</p>
        </div>
    )
}