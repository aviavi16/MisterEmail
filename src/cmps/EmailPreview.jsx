import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/emailService"
import  deleteIcon  from "../assets/imgs/delete.png"
import unreadIcon  from "../assets/imgs/unread-message.png"

export function EmailPreview({email , onRemove }){
    const [emailPreview, setEmailPreview] = useState(email)
    const [isDark, setIsDark] = useState(email.isRead)

    useEffect(() =>{
        setEmailPreview(emailPreview)
    }, [isDark])

    async function toggleUnread(id, value){
        var email = await emailService.changeIsReadById(id, value)
        console.log('handleChange email:', email)
        rowStyle()
        setIsDark(isDark => isDark = email.isRead)
        console.log('handleChange isDark:', isDark)
    }

    function rowStyle(){
        var classList = ["email-preview"]
        if(isDark)
            classList.push("dark")
        return classList.join(" ")
    }

    return(
        <section className={rowStyle()}>
                    <input className="checkbox" title="Select" type="checkbox" />    
                    <input className="star" title="Select" type="checkbox" /> 
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { emailPreview.sender.name } </div>
                   <Link to={`/email/${emailPreview.id}`}>  {emailPreview.subject} </Link> 
                   <div className="date"> 
                        {emailPreview.sentAt} 
                        <div className="action-btn">
                            <img className= "hide" src= {deleteIcon} onClick={() => onRemove(email.id)}/>
                            <img className= "hide" src= {unreadIcon} onClick={() => toggleUnread(email.id, false)}/>
                        </div>
                    </div>  
                   <div className="test-btn">
                        <button onClick={() => onRemove(email.id)}> X </button> 
                        <button onClick={() => toggleUnread(email.id)}> Read/Unread </button>             
                   </div>
                          
        </section>
    )
}