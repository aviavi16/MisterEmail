import { useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/emailService"

export function EmailEdit(){
    const [email, setEmail] = useState( emailService.createEmail())

    const { receiver, subject, body } = email

    return (
        <section className="email-edit">
            <Link to="/email">  <button className="close-btn"> X </button>   </Link>
            <span> {email.id ? 'Edit' : 'Add'} Email </span>
            
            <form>
                <label htmlFor="receiver"> To:   </label>
                <input value={ receiver } type="text" id="receiver" className="receiver" />

                <label htmlFor="subject">   Subject: </label>
                <input value={ subject }type="text" id="subject" className="subject" />

                <label htmlFor="body">   Email: </label>
                <input value={ body }type="text" id="body" className="body" />

                <section className="btns">
                    <button className="btn">    Send    </button>
                </section>
            </form>

        </section>
    )
}