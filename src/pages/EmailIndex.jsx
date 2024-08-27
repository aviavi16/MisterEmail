import { useEffect, useState } from "react"
import { emailService } from "../services/emailService"
import { EmailList } from "../cmps/EmailsList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailUnread } from "../cmps/EmailUnread"
import { SideBar } from "../cmps/SideBar"
import backgroundLogo from "../assets/imgs/background3.jpg"
import composeLogo from "../assets/imgs/compose.png"


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

    function isShowReadFunc(isShowReadVar){
        try {
            setShowRead(isShowReadVar)
        } catch (err) {
            console.log('err:', err)
            alert("could not open else emails")
        }

    }

    async function isReadPreviewFunc(isReadPreviewVar){
        try {
            isReadPreviewVar.isRead = !isReadPreviewVar.isRead
            await emailService.save(isReadPreviewVar)
            setIsRead(isReadPreviewVar)
        } catch (err) {
            console.log('err:', err)
            alert("could not change unread emails display")
        }

    }
    
    async function isUnreadPreviewFunc(isUnreadPreviewVar){
        try {
            isUnreadPreviewVar.isRead = !isUnreadPreviewVar.isRead
            await emailService.save(isUnreadPreviewVar)
            setIsUnread(isUnreadPreviewVar)
        } catch (err) {
            console.log('err:', err)
            alert("could not change unread emails display")
        }

    }

    function onOpenModal(){
        const elName = document.querySelector('.modal')
            elName.style.display='block'
    }

    function onCloseModal() {
        document.querySelector('.modal').style.display='none'
    }

    if (!unreadEmails) return <span> email page loading.. </span>

    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            </div>
            <div className="list-container">
                <div className="filter-container">
                    <EmailUnread intialIsRead={false} isShowRead={isShowUnreadFunc}/>
                </div>
                <EmailList emails= {unreadEmails} onRemove= {removeUnreadEmail} onRead={isUnreadPreviewFunc}/>
                <div className="filter-container">
                    <EmailUnread intialIsRead={true}  isShowRead={isShowReadFunc}/>
                </div>
                <EmailList emails= {emails} onRemove= {removeEmail} onRead={isReadPreviewFunc}/>
                
            </div>

            
            <div className="compose-container" onClick={onOpenModal}>
                <img src={composeLogo} />
                <span className="show-container"> Compose </span>         
            </div>
            <div className="sidebar-container">
                <SideBar />
            </div>
            {/* <div className="image-container">
                <img src={backgroundLogo}/>
            </div> */}


            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                    <button onClick={onCloseModal}>Close</button>
                    <h2>Modal Header</h2>
                    </div>
                    <div className="modal-body">
                    <p>Some text in the Modal Body</p>
                    <p>Some other text...</p>
                    </div>
                    <div className="modal-footer">
                    <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>
                   
        </section>
    )
}