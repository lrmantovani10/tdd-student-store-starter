import "./NotFound.css"
import Confused from "./Confused.png"
export default function NotFound({error}){
    return(
    <div className="not-found">
        <h1 className="notFoundMessage">
            Page Not Found... {error}
        </h1>
        <img className = "notFoundImage" src = {Confused}/>
    </div>)
}
