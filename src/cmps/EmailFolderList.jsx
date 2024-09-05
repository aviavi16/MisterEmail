import inboxLogo from "../assets/imgs/inbox.png"
import composeLogo from "../assets/imgs/compose.jpg"
import starredLogo from "../assets/imgs/starred.png"
import sentLogo from "../assets/imgs/sent.png"
import draftLogo from "../assets/imgs/draft.jfif"
import trashLogo from "../assets/imgs/trash.jpg"
import { Link, useSearchParams } from "react-router-dom"

export function EmailFolderList({unreadCounter, saveFilterBeforeSwitchTab}){
    const [searchParams, setSearchParams] = useSearchParams()  

    return (
        <section className="email-folder">
            <Link onClick={() => saveFilterBeforeSwitchTab(searchParams)} to='/email/inbox' className="inbox-container">
                <img src={inboxLogo} />
                <span className="show-container"> 
                    Inbox 
                </span>
                <span className="unread-counter">{unreadCounter}</span>

            </Link>

            <Link onClick={() => saveFilterBeforeSwitchTab(searchParams)} to='/email/starred' className="starred-container">
                <img src={starredLogo} />
                <span className="show-container"> Starred </span>
            </Link>

            <div className="sent-container">
                <img src={sentLogo} />
                <span className="show-container"> Sent </span>
            </div>

            <div className="draft-container">
                <img src={draftLogo} />
                <span className="show-container"> Draft </span>
            </div>

            <div className="trash-container">
                <img src={trashLogo} />
                <span className="show-container"> Trash </span>
            </div>

            
                    
        </section>
    )
}