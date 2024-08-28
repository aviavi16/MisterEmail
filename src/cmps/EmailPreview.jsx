import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/emailService"
import  deleteIcon  from "../assets/imgs/delete.png"
import unreadIcon  from "../assets/imgs/unread-message.png"
import fullStarIcon  from "../assets/imgs/full-star.png"
import emptyStarIcon  from "../assets/imgs/empty-star.png"

export function EmailPreview({email , onRemove, onRead }){
    const [isRead, setIsRead] = useState(email)
    const [isStar, setIsStar] = useState(email.isStar)
    
    useEffect (() => {
        console.log('useEffect isRead:', isRead)
        onRead(isRead)
    }, [isRead])

    async function toggleUnread(){
        email.isRead = !email.isRead
        await emailService.save(email)
        setIsRead(isRead => !isRead )
    }

    function rowStyle(){
        var classList = ["email-preview"]
        if(isRead)
            classList.push("dark")
        return classList.join(" ")
    }

    function getStar(){
        if(isStar)
            return fullStarIcon
        else
            return emptyStarIcon
    }

    async function switchStarState(){
        email.isRead = !email.isRead
        await emailService.save(email)
        setIsStar(isStar => !isStar)
    }

    return(
        <section className={rowStyle()}>
                    <input className="checkbox" title="Select" type="checkbox" />   
                    <div className="star-container">
                        <img src={getStar()} id="imgClickAndChange" onClick={() => switchStarState()}/>
                    </div> 
                   
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { email.sender.name } </div>
                   <Link to={`/email/${email.id}`} className="details-container">
                         <span className="subject-container"> {email.subject}- </span>
                         <span className="body-container"> {email.body} </span>
                    </Link> 
                   <div className="date-container"> 
                        <span className="date">{email.sentAt} </span>
                        <div className="action-btn">
                            <img className= "hide" src= {deleteIcon} onClick={() => onRemove(email.id)}/>
                            <img className= "hide" src= {unreadIcon} onClick={() => toggleUnread(email)}/>
                        </div>
                    </div>  
                   <div className="extra-action-btn">
                        <button onClick={toggleUnread} className="is-read-btn"> Read/Unread </button>             
                        <button onClick={onRemove} className="remove-btn"> X </button> 
                   </div>
                          
        </section>
    )
}