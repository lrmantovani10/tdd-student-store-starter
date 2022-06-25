import { Link } from "react-router-dom"
import CodePathLogo from "./CodePathLogo.png"
import "./Logo.css"

export default function Logo() {
    return (
      <Link to = "/">
        <div className = "logo">
          <img id="CPLogo" src = {CodePathLogo}/>
        </div>
      </Link>
    )
  }
