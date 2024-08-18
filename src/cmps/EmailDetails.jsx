import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../services/emailService"
import { Link } from "react-router-dom"

export function EmailDetails(){
    const [emails, setEmails] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        loadEmails()
    }, [id])
        
    async function loadEmails(){
        const emailsList = await emailService.getById(id)
        setEmails(emailsList)
    }

    return (
        <section className="email details"> 
        <span> email details page </span>
             <pre>  {JSON.stringify(emails, null, 2)}</pre>
             <Link to='/email'> Back </Link>
        </section>
    )
}