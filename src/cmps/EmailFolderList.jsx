import inboxLogo from "../assets/imgs/inbox.png"
import composeLogo from "../assets/imgs/compose.jpg"
import starredLogo from "../assets/imgs/starred.png"
import sentLogo from "../assets/imgs/sent.png"
import draftLogo from "../assets/imgs/draft.jfif"
import trashLogo from "../assets/imgs/trash.jpg"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

export function EmailFolderList({unreadCounter, saveFilterBeforeSwitchTab}){
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()  
    const navigate = useNavigate()

    function closeMiniMenu(){
        const emailFolderEl = document.querySelector('.email-folder-mini')
        if (emailFolderEl)
            emailFolderEl.className = 'email-folder-container'        
    }

    function navigateToFolder(folderTo, searchParams){
        closeMiniMenu();
        saveFilterBeforeSwitchTab(searchParams)
        navigate(`/email/${folderTo}`)
    }

    return (
        <section className="email-folder">
            <div onClick={ closeMiniMenu } className="material-symbols-outlined" id='mini-menu-close'> close </div>
            <div onClick={()=> navigateToFolder('inbox', searchParams)} className="inbox-container">
                <img src={inboxLogo} />
                <span className="show-container"> 
                    Inbox 
                </span>
                <span className="unread-counter">{unreadCounter}</span>

            </div>

            <div onClick={()=> navigateToFolder('starred', searchParams)} className="starred-container">
                <img src={starredLogo} />
                <span className="show-container"> Starred </span>
            </div>

            <div onClick={()=> navigateToFolder('sent', searchParams)}  className="sent-container">
                <img src={sentLogo} />
                <span className="show-container"> Sent </span>
            </div>

            <div onClick={()=> navigateToFolder('drafts', searchParams)}  className="drafts-container">  
                <img src={draftLogo} />
                <span className="show-container"> Draft </span>
            </div>

            <div onClick={()=> navigateToFolder('trash', searchParams)}  className="trash-container">  
                <img src={trashLogo} />
                <span className="show-container"> Trash </span>
            </div>
            

            
                    
        </section>
    )
}