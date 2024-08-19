import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/emailService"
import  deleteIcon  from "../assets/imgs/delete.png"
import unreadIcon  from "../assets/imgs/unread-message.png"
import fullStarIcon  from "../assets/imgs/full-star.png"
import emptyStarIcon  from "../assets/imgs/empty-star.png"

export function EmailPreview({email , onRemove, onEmailPreviewChange }){
    const [isRead, setIsRead] = useState(email.isRead)
    const [isStar, setIsStar] = useState(email.isStar)

    useEffect (() => {
        onEmailPreviewChange(true)
        console.log('useEffect: entered the useeffect')
    }, [isRead, isStar])
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
                   <Link to={`/email/${email.id}`}>  {email.subject} </Link> 
                   <div className="date"> 
                        {email.sentAt} 
                        <div className="action-btn">
                            <img className= "hide" src= {deleteIcon} onClick={() => onRemove(email.id)}/>
                            <img className= "hide" src= {unreadIcon} onClick={toggleUnread}/>
                        </div>
                    </div>  
                   <div className="extra-action-btn">
                        <button onClick={() => toggleUnread(email.id)} className="is-read-btn"> Read/Unread </button>             
                        <button onClick={() => onRemove(email.id)} className="remove-btn"> X </button> 
                   </div>
                          
        </section>
    )
}