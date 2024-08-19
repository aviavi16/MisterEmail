import { NavLink } from "react-router-dom";
import aboutIcon from "../assets/imgs/about.png"
import gmailIcon from "../assets/imgs/gmailIcon.png"
import homeIcon from "../assets/imgs/home.png"
import settingsIcon from "../assets/imgs/settings.png"
import emailIcon from "../assets/imgs/email.png"

export function AppHeader(){
    return (
        <section className="app-header">
                <div className=" title-container">
                    <img src={gmailIcon} className="main-logo" />
                    <h1> Mister Email </h1>
                </div>
                    <nav>
                        <NavLink to='/email'> <img src={emailIcon} className="email-link"/> </NavLink>
                        <NavLink to='/about'>  <img src={aboutIcon} className="about-link"/> </NavLink>
                        <NavLink to='/settings'> <img src={settingsIcon} className="settings-link"/> </NavLink>
                        <NavLink to='/'>   <img src={homeIcon} className="home-link"/> </NavLink>

                    </nav>

        </section>
    )
}