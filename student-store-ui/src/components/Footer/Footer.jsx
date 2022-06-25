import "./Footer.css"
import AndroidIcon  from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple';

export default function Footer(){
    return(
        <div className="footer">
            <div className = "App">Our App</div>
                <div className = "appLogos">
                <a target ="_blank" href = "https://play.google.com/store/">
                    <AndroidIcon style={{ color: 'white', fontSize: "xxx-large"}}/>
                </a>
                <a target ="_blank" href = "https://www.apple.com/app-store/">
                    <AppleIcon style={{ color: 'white', fontSize: "xxx-large"}}/>
                </a>
            </div>
        </div>
    )
}