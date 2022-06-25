import "../Hero/Hero.css"
import Header from "./Header.png"

export default function Hero(){
    return(
    <div className = "hero">
        <img alt = "Store Header Image" src = {Header} className = "hero-img"/>
        <div className = "intro">
            Welcome! This is the CodePath College Store
        </div>
    </div>)
}
