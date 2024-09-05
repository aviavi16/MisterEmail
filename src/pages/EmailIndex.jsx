import { emailService } from "../services/emailService"
import composeLogo from "../assets/imgs/compose.png"
import { EmailUnread } from "../cmps/EmailUnread"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailList } from "../cmps/EmailsList"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus-service"
import { Starred } from "../cmps/Starred"
import { getExistingProperties } from "../services/util.service"

export function EmailIndex() {
    const params = useParams()

    const navigate = useNavigate()
    const [emails, setEmails] = useState(null)
    const [counter, setCounter] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()  
    const [filterBy, setFilterBy] = useState( emailService.getFilterFromSearchParams( searchParams, params.folder ))
    const [viewSelector, setViewSelector] = useState("All")
    const saveFilterBeforeSwitchTab = useRef('')


    //TODO add the mobile resolution change
    //TODO fix checkbox filter params bug

    useEffect(() => {
        console.log('useEffect email index params.folder:', params.folder)
        setFilterBy({ search: saveFilterBeforeSwitchTab.current , status: params.folder })
    }, [ params.folder])

    useEffect(() => {
        setCounter( emailService.getUnreadCounter());
    }, [])

    useEffect(() => {
        loadEmails()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy, viewSelector ])

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
            //TODO add email unread count using the service
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
            setFilterBy(prevFilter => ({...prevFilter , ...filterBy}))
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

    function saveFilterBeforeSwitchTabFunc(filterByParams){
        console.log('filterByParams:', filterByParams.get('search') || '')
        saveFilterBeforeSwitchTab.current = (filterByParams.get('search') || '')
    }

    if (!emails) return <span> email page loading.. </span>
    const { search, status } = filterBy
    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={{ search }} onFilterBy={filterByFunc} />
                <Starred filterBy={{ status }} onFilterBy={filterByFunc}/>
                <div className="filter-container">
                    <EmailUnread viewSelector={viewFunc} />
                </div>
            </div>
            <div className="list-container">
                <EmailList emails= {emails} onRemove= {removeEmail} onRead= {onEmailRead} />
            </div>

            <Link to='/email/edit' className="compose-container">
                <img src={composeLogo} />
                <span className="email-compose"> Compose </span>         
            </Link>

            <div className="email-folder-container">
                <EmailFolderList unreadCounter={counter} saveFilterBeforeSwitchTab={saveFilterBeforeSwitchTabFunc} />
            </div>


            <Outlet context={ {onSaveEmail }}/>     

        </section>
    )
}