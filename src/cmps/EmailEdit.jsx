import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { emailService } from "../services/emailService"

export function EmailEdit(){
    const [email, setEmail] = useState( emailService.createEmail())
    const { onSaveEmail } = useOutletContext()

    function handleChange( {target }){
        let {name: field, value, type} = target
        switch(type){
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        console.log('value:', value)
        setEmail( prevEmail => ({ ...prevEmail, [field]: value }))

    }
    const { receiver , subject, body } = email

    function onSubmitEmail( ev ){
        ev.preventDefault()
        console.log('onSaveEmail:', onSaveEmail)
        onSaveEmail(email)
        //TODO after the email is sent i want the unread counter to get +1 want to re-render (happens on refresh by query)
    }

    return (
        <section className="email-edit">
            <Link to="/email">  <button className="close-btn"> X </button>   </Link>
            <span> {email.id ? 'Edit' : 'Add'} Email </span>
            
            <form onSubmit={onSubmitEmail}>
                <label htmlFor="receiver"> To:   </label>
                <input onChange={handleChange} value={ receiver } type="text" id="receiver" name="receiver" />

                <label htmlFor="subject">   Subject: </label>
                <input onChange={handleChange} value={ subject } type="text" id="subject" name="subject" />

                <label htmlFor="body">   Email: </label>
                <input onChange={handleChange} value={ body } type="text" id="body" name="body" />

                <section className="btns">
                    <button className="btn">    Send    </button>
                    {/* <button type="button" className="btn">    Cancel    </button> */}
                </section>
            </form>

        </section>
    )
}