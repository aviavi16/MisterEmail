import { emailService } from "../services/emailService"
import composeLogo from "../assets/imgs/compose.png"
import { EmailUnread } from "../cmps/EmailUnread"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailList } from "../cmps/EmailsList"
import { SideBar } from "../cmps/SideBar"
import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [counter, setCounter] = useState(0)
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
            console.log('previewLoad:' , isChanged)
            if(isChanged === false)
                setCounter(prev => prev + 1)
            if(isChanged === true)
                setCounter(prev => prev - 1)
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
            <div className="compose-container">
                <Link to='/email/edit'>
                    <img src={composeLogo} />
                    <span className="show-container"> Compose </span>         
                </Link>

            </div>
            <div className="sidebar-container">
                <SideBar unreadCounter={counter}/>
            </div>


            <Outlet />     
        </section>
    )
}