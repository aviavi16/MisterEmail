import { emailService } from "../services/emailService"
import composeLogo from "../assets/imgs/compose.png"
import { EmailUnread } from "../cmps/EmailUnread"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailList } from "../cmps/EmailsList"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus-service"
import { getExistingProperties } from "../services/util.service"
import { EmailEdit } from "../cmps/EmailEdit"

export function EmailIndex() {
    const params = useParams()

    const [emails, setEmails] = useState(null)
    const [counter, setCounter] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()  
    const [filterBy, setFilterBy] = useState( emailService.getFilterFromSearchParams( searchParams, params.folder ))
    const [viewSelector, setViewSelector] = useState("All")
    const saveFilterBeforeSwitchTab = useRef('')
    const navigate = useNavigate()

    //TODO multi select
    //TODO sort
    //TODO fix draft issues
    //TODO validate compose
    //TODO add the mobile resolution change

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
            if ( params.folder !== 'trash'){
                if (!confirm('Do you want to move the email to trash?')) return
                console.log('move the email to trash:', emailId)
                
                //if the email unread and we delete the email from inbox the counter decrease (function?)
                if ( params.folder === 'inbox'){
                    const _isRead = await emailService.getUnreadById(emailId)

                    if(_isRead === false){
                        console.log('moved to trash unread email, counter was decreased ')
                        setCounter(prev => prev - 1)
                    }
                        
                }

                emailService.moveToTrash(emailId)
                setEmails(emails => emails.filter(email => email.id !== emailId))
                showSuccessMsg(`Email (${emailId}) moved to trash`)
            } 
            else {
                if (!confirm('Are you sure? This action will DELETE this email FOREVER!')) return
                console.log('removing the emailId:', emailId)
                await emailService.remove(emailId)
                setEmails(emails => emails.filter(email => email.id !== emailId))
                showSuccessMsg(`Email (${emailId}) removed FOREVER!`)
            }                    
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not remove email")
        }

    }

    /**
     * only in inbox if we click the change read/unread button (preview) the unread counter is changed accordingly 
     * @param {*} isChanged 
     */
    function onEmailRead(isChanged){
        try{
            if ( params.folder === 'inbox'){
                console.log('previewLoad:' , isChanged)
                if(isChanged === false)
                    setCounter(prev => prev + 1)
                if(isChanged === true)
                    setCounter(prev => prev - 1)
            }
           
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
            const emailToSave = await emailService.save(email)
            console.log('emailToSave:', emailToSave)
            if (!email.id){
                setEmails(emails => [...emails, emailToSave])
                if ( emailToSave.receiver.toLowerCase().includes('avinoam')){
                    setCounter(prev => prev + 1)
                }
                    
            }
            else
                setEmails(emails => emails.map(
                    _email => _email.id === emailToSave.id ? emailToSave : _email
                ))
            showSuccessMsg(`Email (${emailToSave.id}) saved`)
            navigate(`/email/${ params.folder }`)
        } catch (err){
            showErrorMsg('error adding email:', err)
        }
    }

    function saveFilterBeforeSwitchTabFunc(filterByParams){
        console.log('filterByParams:', filterByParams.get('search') || '')
        saveFilterBeforeSwitchTab.current = (filterByParams.get('search') || '')
    }

    async function onRestoreFunc(emailId) { 
        try {
            if (!confirm('Do you want to restore the email?')) return
            console.log('move the email to inbox:', emailId)
            
            //if the email unread the counter increase (function?)
            const _isRead = await emailService.getUnreadById(emailId)

            if(_isRead === false){
                console.log('moved to inbox unread email, counter was increased ')
                setCounter(prev => prev + 1)
            }
                        
                

            emailService.restore(emailId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
            showSuccessMsg(`Email (${emailId}) restored`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg("could not restore email")
        }
    }

    const isComposeOpen = Boolean(searchParams.get('compose'))
    if (!params.mailId && !emails) return <span> email page loading.. </span>
    const { search, status } = filterBy
    return (
        <section className="email-index">
            <div className="search-container">
                <EmailFilter filterBy={{ search }} onFilterBy={filterByFunc} />
                {!params.mailId && (<div className="filter-unread-container">
                    <EmailUnread viewSelector={viewFunc} />
                </div>)}
            </div>
            {!params.mailId && (<div className="list-container">
                <EmailList emails= {emails} onRemove= {removeEmail} onRead= {onEmailRead} onRestore= { onRestoreFunc}/>
            </div>)}

            <Link to={`/email/${ params.folder }?compose=new`} className="compose-container" > 
            
                <img src={composeLogo} />
                <span className="email-compose"> Compose </span>         
            </Link>

            <div className="email-folder-container">
                <EmailFolderList unreadCounter={counter} saveFilterBeforeSwitchTab={saveFilterBeforeSwitchTabFunc} />
            </div>
            {params.mailId && <Outlet />}
            {isComposeOpen && <EmailEdit  onSaveEmail= { onSaveEmail}/> }

        </section>
    )
}