import { emailService } from "../services/emailService"
import composeLogo from "../assets/imgs/compose.png"
import { EmailUnread } from "../cmps/EmailUnread"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailList } from "../cmps/EmailsList"
import { SideBar } from "../cmps/SideBar"
import { useEffect, useState } from "react"


export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const defaultFilter = emailService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [viewSelector, setViewSelector] = useState("All")

    useEffect(() => {
        loadEmails()
    }, [filterBy, viewSelector])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, viewSelector)
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

    function viewFunc(viewVar){
        try {
            setViewSelector(viewVar)
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
            <div className="list-container">
                <div className="filter-container">
                    <EmailUnread viewSelector={viewFunc} />
                </div>
                <EmailList emails= {emails} onRemove= {removeEmail} onRead= {previewLoad} />
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