import { useEffect, useState } from "react"
import { emailService } from "../services/emailService"
import { EmailList } from "../cmps/EmailsList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailUnread } from "../cmps/EmailUnread"


export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [unreadEmails, setUnreadEmails] = useState(null)

    const defaultFilter = emailService.getDefaultFilter()

    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [showRead, setShowRead] = useState(true)
    const [showUnread, setShowUnread] = useState(true)

    const [isRead, setIsRead] = useState(null)
    const [isUnread, setIsUnread] = useState(null)



    useEffect(() => {
        loadEmails()
    }, [showRead])

    useEffect(() => {
        loadEmails()
    }, [isRead])


    useEffect(() => {
        loadUnreadEmails()
    }, [ showUnread])

    useEffect(() => {
        loadUnreadEmails()
    }, [ isUnread])


    async function loadEmails() {
        try {
            if(showRead === false) {
                const emails =[]
                setEmails(emails)
                return            
            }
            const emails = await emailService.query(filterBy, true)
            console.log('Email index loadEmails after read is changed emails:', emails)
            setEmails(emails)
        } catch (err) {
            console.log('err:', err)
            alert("problem loading emails")
        }

    }

    async function loadUnreadEmails() {
        try {
            if(showUnread === false) {
                const unreadEmails =[]
                setUnreadEmails(unreadEmails)
                return            
            }
            const unreadEmails = await emailService.query(filterBy, false)
            console.log('Email index loadUnreadEmails after read is changed emails:', unreadEmails)

            setUnreadEmails(unreadEmails)
        } catch (err) {
            console.log('err:', err)
            alert("problem loading unread emails")
        }

    }

    async function removeEmail(emailId) { 
        try {
            if (!confirm('Are you sure?')) return
            console.log('removing the emailId:', emailId)
            await emailService.remove(emailId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log('err:', err)
            alert("could not remove email")
        }

    }

    async function removeUnreadEmail(emailId) { 
        try {
            if (!confirm('Are you sure?')) return
            console.log('removing the emailId:', emailId)
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

    function isShowUnreadFunc(isShowUnreadVar){
        try {
            setShowUnread(isShowUnreadVar)
        } catch (err) {
            console.log('err:', err)
            alert("could not open unread emails")
        }

    }

    if (!emails) return <span> email page loading.. </span>
    return (
        <section className="email-index">
            <EmailUnread isRead={isReadFunc} />
            <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            <EmailList emails= {emails} onRemove= {removeEmail} onEmailPreviewChange= {previewLoad} />
        </section>
    )
}