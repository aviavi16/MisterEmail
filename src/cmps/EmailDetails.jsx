import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/emailService"
import { Link } from "react-router-dom"
import backIcon from "../assets/imgs/back.png"

export function EmailDetails(){
    const params = useParams()
    const [email, setEmail] = useState(null)

    useEffect(() => {
        loadEmail()
    }, [params])
        
    async function loadEmail(){
        const email = await emailService.getById(params.mailId)
        setEmail(email)
    }

    if(!email) return <span> loading in progress... </span>
    return (
        <section className="email-details"> 
        <h1 > Subject: { email.subject }</h1>
        <div className="email-header">
             
            <div className="sender-container">
             <span > { email.sender }</span>
             <span className="sender-email"> {'<'}{ email.sender}{'>' }</span>
             </div>
             <Link to={`/email/${ params.folder }`}> 
                Back 
                <img src= {backIcon} className="back-btn" title="back"/>
             </Link>
        </div>

             <pre>  {JSON.stringify(email.body, null, 2)}</pre>
        </section>
    )
}