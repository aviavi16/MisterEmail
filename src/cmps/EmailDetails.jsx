import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/emailService"
import { Link } from "react-router-dom"
import backIcon from "../assets/imgs/back.png"

export function EmailDetails(){
    const [email, setEmail] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        loadEmail()
    }, [id])
        
    async function loadEmail(){
        const email = await emailService.getById(id)
        setEmail(email)
    }

    if(!email) return <span> loading in progress... </span>
    return (
        <section className="email-details"> 
        <h1 > Subject: { email.subject }</h1>
        <div className="email-header">
             
            <div className="sender-container">
             <span > { email.sender.name }</span>
             <span className="sender-email"> {'<'}{ email.sender.email}{'>' }</span>
             </div>
             <Link to='/email'>Back <img src= {backIcon} className="back-btn" title="back"/> </Link>
        </div>

             <pre>  {JSON.stringify(email.body, null, 2)}</pre>
        </section>
    )
}