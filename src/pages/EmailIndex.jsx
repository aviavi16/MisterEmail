import { emailService } from "../services/emailService"
import composeLogo from "../assets/imgs/compose.png"
import { EmailUnread } from "../cmps/EmailUnread"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailList } from "../cmps/EmailsList"
import { SideBar } from "../cmps/SideBar"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus-service"

export function EmailIndex() {
    const navigate = useNavigate()
    const [emails, setEmails] = useState(null)
    const [counter, setCounter] = useState(null)
    const defaultFilter = emailService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [viewSelector, setViewSelector] = useState("All")

    //TODO add the mobile resolution change

    useEffect(() => {

        setCounter( emailService.getUnreadCounter());
        
    }, [])

    useEffect(() => {
        loadEmails()
    }, [filterBy, viewSelector])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, viewSelector)
            setEmails(emails)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("problem loading emails")
        }

    }

    async function removeEmail(emailId) { 
        try {
            if (!confirm('Are you sure?')) return
            console.log('removing the emailId:', emailId)
            await emailService.remove(emailId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
            showSuccessMsg(`Email (${emailId}) removed`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not remove email")
        }

    }

    function onEmailRead(isChanged){
        try{
            console.log('previewLoad:' , isChanged)
            if(isChanged === false)
                setCounter(prev => prev + 1)
            if(isChanged === true)
                setCounter(prev => prev - 1)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not change counter email")
        }

    }

    function filterByFunc(filterBy){
        try {
            setFilterBy(filterBy)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not search email")
        }
    }

    function viewFunc(viewVar){
        try {
            setViewSelector(viewVar)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not open unread emails")
        }

    }

    async function onSaveEmail(email){
        try{
            console.log('email:', email)
            const emailToSave = await emailService.save(email)
            console.log('emailToSave:', emailToSave)

            if (!email.id)
                setEmails(emails => [...emails, emailToSave])
            else
                setEmails(emails => emails.map(
                    _email => _email.id === emailToSave.id ? emailToSave : _email
                ))
            showSuccessMsg(`Email (${emailToSave.id}) saved`)
            navigate('/email')
        } catch (err){
            showErrorMsg('error adding email:', err)
        }
       


    }

    if (!emails) return <span> email page loading.. </span>
    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            </div>
            <div className="list-container">
                <div className="filter-container">
                    <EmailUnread viewSelector={viewFunc} />
                </div>
                <EmailList emails= {emails} onRemove= {removeEmail} onRead= {onEmailRead} />
            </div>

            <Link to='/email/edit' className="compose-container">
                <img src={composeLogo} />
                <span className="email-compose"> Compose </span>         
            </Link>

            <div className="sidebar-container">
                <SideBar unreadCounter={counter}/>
            </div>


            <Outlet context={ {onSaveEmail }}/>     

        </section>
    )
}