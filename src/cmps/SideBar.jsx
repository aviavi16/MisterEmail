import inboxLogo from "../assets/imgs/inbox.png"
import composeLogo from "../assets/imgs/compose.jpg"
import starredLogo from "../assets/imgs/starred.png"
import sentLogo from "../assets/imgs/sent.png"
import draftLogo from "../assets/imgs/draft.jfif"
import trashLogo from "../assets/imgs/trash.jpg"

export function SideBar(){
    return (
        <section className="sidebar-container">
            <div className="inbox-container">
                <img src={inboxLogo} />
                
                <span className="show-container"> 
                    Inbox 
                </span>
            </div>

            <div className="starred-container">
                <img src={starredLogo} />
                <span className="show-container"> Starred </span>
            </div>

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