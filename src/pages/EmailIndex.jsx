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
    const defaultFilter = emailService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [filterRead, setFilterRead] = useState(false)

    useEffect(() => {
        loadEmails()
    }, [filterBy, filterRead])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, filterRead)
            setEmails(emails)
        } catch (err) {
            console.log('err:', err)
            alert("problem loading emails")
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

    function previewLoad(isChanged){
        try{
            console.log(' previewLoad isChanged:', isChanged)
            loadEmails();
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
            setFilterRead(filterRead)
        } catch (err) {
            console.log('err:', err)
            alert("could not open unread emails")
        }

    }

    function onOpenModal(){
        const elName = document.querySelector('.modal')
           // elName.querySelector('h5').innerText = place.lat   
            //elName.querySelector('h5').innerText = place.lng     
            elName.style.display='block'
    }

    function onCloseModal() {
        document.querySelector('.modal').style.display='none'
    }

    if (!emails) return <span> email page loading.. </span>
    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={filterBy} onFilterBy={filterByFunc} />
            </div>
            <div className="filter-container">
                <EmailUnread isRead={isReadFunc} />
            </div>
            <div className="list-container">
                <EmailList emails= {emails} onRemove= {removeEmail} onEmailPreviewChange= {previewLoad} />
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
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                    <button onClick={onCloseModal}>Close</button>
                    <h2>Modal Header</h2>
                    </div>
                    <div class="modal-body">
                    <p>Some text in the Modal Body</p>
                    <p>Some other text...</p>
                    </div>
                    <div class="modal-footer">
                    <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>       
        </section>
    )
}