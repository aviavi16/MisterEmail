import { useEffect, useState } from "react"
import { emailService } from "../services/emailService"
import { EmailList } from "../cmps/EmailsList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailUnread } from "../cmps/EmailUnread"


export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const defaultFilter = emailService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [filterRead, setFilterRead] = useState(false)

    useEffect(() => {
        loadEmails()
    }, [filterBy, filterRead])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, filterRead)
            console.log('load emails:', emails)

            setEmails(emails)
        } catch (err) {
            console.log('err:', err)
            alert("problem loading emails")
        }

    }

    async function removeEmail(emailId) {
        console.log('removint the emailId:', emailId)
        try {
            await emailService.remove(emailId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log('err:', err)
            alert("could not remove email")
        }

    }

    function filterByFunc(filterBy){
        try {
            setFilterBy(filterBy)
        } catch (err) {
            console.log('err:', err)
            alert("could not remove email")
        }
    }

    function isReadFunc(filterRead){
        try {
            console.log('isReadFunc filterRead:', filterRead)
            setFilterRead(filterRead)
        } catch (err) {
            console.log('err:', err)
            alert("could not open unread emails")
        }

    }

    if (!emails) return <span> email page loading.. </span>
    return (
        <section className="email-index">
            <span> email page: </span>
            <EmailUnread isRead={isReadFunc} />
            <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            <EmailList emails={emails} onRemove={removeEmail} onReadChange = {loadEmails} />
        </section>
    )
}