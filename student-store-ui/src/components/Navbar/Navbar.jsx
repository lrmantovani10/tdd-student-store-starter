import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logoImage">
        <Logo/>
      </div>
      <div className="socialMedias">
        <a href = "https://twitter.com/codepath?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target = "_blank">
          <TwitterIcon style={{ color: 'white', fontSize: "xx-large"}}/>
        </a>
        <a href = "https://www.instagram.com/codepathorg/?hl=en" target = "_blank">
          <InstagramIcon style={{ color: 'white', fontSize: "xx-large"}}/>
        </a>
        <a href = "https://www.facebook.com/codepath.org/" target = "_blank">
          <FacebookIcon style={{ color: 'white', fontSize: "xx-large"}}/>
        </a>
      </div>
      <div className="navbarLinks">
        <a className="navbarLink" href="#productGrid">Shop</a>
        <a className="navbarLink" href="#about">About Us</a>
        <a className="navbarLink" href="#contact">Contact Us</a>
      </div>
    </nav>
  )
}
