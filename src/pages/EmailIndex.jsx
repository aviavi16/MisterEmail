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
    const [filterRead, setFilterRead] = useState(true)
    const [filterUnread, setFilterUnread] = useState(false)

    const [isRead, setIsRead] = useState(null)


    useEffect(() => {
        console.log('herer:', filterRead, isRead )
        loadEmails()
    }, [filterRead, isRead])

    useEffect(() => {
        loadUnreadEmails()
    }, [ filterUnread])


    async function loadEmails() {
        try {
            if(!filterRead && filterRead === false) {
                const emails =[]
                setEmails(emails)
                return            
            }
            const emails = await emailService.query(filterBy, filterRead)
            console.log('after read is changed emails:', emails)
            setEmails(emails)
        } catch (err) {
            console.log('err:', err)
            alert("problem loading emails")
        }

    }

    async function loadUnreadEmails() {
        try {
            if(filterUnread === true) {
                const unreadEmails =[]
                setUnreadEmails(unreadEmails)
                return            
            }
            const unreadEmails = await emailService.query(filterBy, filterUnread)
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

    function filterByFunc(filterBy){
        try {
            setFilterBy(filterBy)
        } catch (err) {
            console.log('err:', err)
            alert("could not remove email")
        }
    }

    function isUnreadFunc(isUnreadVar){
        try {
            setFilterUnread(isUnreadVar)
        } catch (err) {
            console.log('err:', err)
            alert("could not open unread emails")
        }

    }

    function isReadFunc(isReadVar){
        try {
            setFilterRead(isReadVar)
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

    function onOpenModal(){
        const elName = document.querySelector('.modal')
            elName.style.display='block'
    }

    function onCloseModal() {
        document.querySelector('.modal').style.display='none'
    }

    if (!emails || !unreadEmails) return <span> email page loading.. </span>

    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            </div>
            <div className="list-container">
                <div className="filter-container">
                    <EmailUnread intialIsRead={false} isShowRead={isUnreadFunc}/>
                </div>
                <EmailList emails= {unreadEmails} onRemove= {removeEmail} onRead={isReadPreviewFunc}/>
                <div className="filter-container">
                    <EmailUnread intialIsRead={true}  isShowRead={isReadFunc}/>
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