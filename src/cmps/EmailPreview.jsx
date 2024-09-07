import { useEffect, useRef, useState } from "react"
import { json, Link, useParams } from "react-router-dom"
import { emailService } from "../services/emailService"
import  deleteIcon  from "../assets/imgs/delete.png"
import unreadIcon  from "../assets/imgs/unread-message.png"
import fullStarIcon  from "../assets/imgs/full-star.png"
import emptyStarIcon  from "../assets/imgs/empty-star.png"

export function EmailPreview({email , onRemove, onRead , onRestore}){
    const [read, setRead] = useState(email.isRead)
    const [starred, setStarred] = useState(email.isStar)
    const isMounted = useRef(false);
    const params = useParams()
    let senderField = ''

    useEffect (() => {
        console.log('EmailPreview useEffect read:', read)
        console.log('isMounted.current:', isMounted.current)
        if (isMounted.current === true) onRead(read);
        else isMounted.current = true;  
        //onRead(read)
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

    function getFromField(){
        senderField =  params.folder === 'sent' ? 'TO: ' + email.receiver : email.sender 
        return  senderField ? senderField.toString().split("@")[0] : ' '
    }

    return(
        <section className={rowStyle()}>
                    <input className="checkbox" title="Select" type="checkbox" />   
                    <div className="star-container">
                        <img src={getStar()} id="imgClickAndChange" onClick={() => switchStarState()}/>
                    </div> 
                   
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   {/* the sender must have @ in it's address!! */}
                   <div className="from-email"> { getFromField() } </div>
                   <Link to={`/email/${ params.folder }/${email.id}`} className="details-container">
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
                        { params.folder === 'trash' && (<button onClick={() => onRestore(email.id)} className="restore-btn"> Restore </button>)} 
                        <Link to={`/email/${ params.folder }?compose=${email.id}`}> Edit </Link>
                   </div>
                          
        </section>
    )
}