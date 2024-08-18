import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function EmailPreview({email , onRemove}){
    const [emailPreview, setEmailPreview] = useState(email)
    const [isDark, setIsDark] = useState(false)

    useEffect(() =>{
        
    }, [isDark])

    function handleChange(id){
        var email = emailService.getById(id)
        onReadChange()
        setIsDark(isDark => isDark = !email.isRead)
        console.log('handleChange isDark:', isDark)
    }

    function rowStyle(isRead){
        console.log('rowStyle isRead:', isRead)
        var classList = ["email-row"]
        if(isDark)
            classList.push("dark")
        return classList.join(" ")
    }

    return(
        <section className="email-preview">
                    <input className="checkbox" title="Select" type="checkbox" onClick={() => handleChange(email.id)} />    
                    <input className="star" title="Select" type="checkbox" /> 
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { emailPreview.sender.name } </div>
                   <Link to={`/email/${emailPreview.id}`}>  {emailPreview.subject} </Link> 
                   <div className="date"> {emailPreview.sentAt} </div>  
                   <button onClick={() => onRemove(email.id)}> X </button>              
        </section>
    )
}