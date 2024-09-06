import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { emailService } from "../services/emailService"

export function EmailEdit({ onSaveEmail }){
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()  
    const [email, setEmail] = useState( emailService.createEmail())

    useEffect(() => {
        const mailId = searchParams.get('compose')
        if (mailId && mailId !== 'new') {
            emailService.getById(mailId).then(setEmail)
        }
    }, [])

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
        console.log('onSaveEmail:', email)
        onSaveEmail(email)
    }

    return (
        <section className="email-edit">
            <Link to={`/email/${ params.folder} `}>  <button className="close-btn"> X </button> </Link>
            <span> {searchParams.get('compose') !== 'new' ? 'Edit' : 'Add'} Email </span>
            
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