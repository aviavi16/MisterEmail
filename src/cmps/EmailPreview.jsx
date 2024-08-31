import { useEffect, useState } from "react"
import { json, Link } from "react-router-dom"
import { emailService } from "../services/emailService"
import  deleteIcon  from "../assets/imgs/delete.png"
import unreadIcon  from "../assets/imgs/unread-message.png"
import fullStarIcon  from "../assets/imgs/full-star.png"
import emptyStarIcon  from "../assets/imgs/empty-star.png"

export function EmailPreview({email , onRemove, onRead }){
    const [read, setRead] = useState(email.isRead)
    const [starred, setStarred] = useState(email.isStar)
    
    useEffect (() => {
        console.log('EmailPreview useEffect read:', read)
        onRead(read)
    }, [read])

    async function toggleUnread(){
        email.isRead = !email.isRead
        await emailService.save(email)
        setRead(read => !read )
    }

    function rowStyle(){
        var classList = ["email-preview"]
        if(email.isRead === true)
            classList.push("dark")
        return classList.join(" ")
    }

    function getStar(){
        if(starred)
            return fullStarIcon
        else
            return emptyStarIcon
    }

    async function switchStarState(){
        email.isStar = !email.isStar
        await emailService.save(email)
        setStarred(starred => !starred)
    }

    return(
        <section className={rowStyle()}>
                    <input className="checkbox" title="Select" type="checkbox" />   
                    <div className="star-container">
                        <img src={getStar()} id="imgClickAndChange" onClick={() => switchStarState()}/>
                    </div> 
                   
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { email.sender ? email.sender.name : ' '} </div>
                   <Link to={`/email/${email.id}`} className="details-container">
                         <span className="test-container"> {email.isStar}! </span>
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
                        <button onClick={() => onRemove(email.id)} className="remove-btn"> X </button> 
                        <Link to={`/email/edit/${email.id}`}> Edit </Link>
                   </div>
                          
        </section>
    )
}