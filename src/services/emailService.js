import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const emailService = {
    query,
    getById,
    remove,
    save,
    createEmail,
    getDefaultFilter,
    getUnreadCounter,
    getFilterFromSearchParams,
    moveToTrash,
    getUnreadById, 
    restore,
    saveDraft
}

const STORAGE_KEY = "emails"

_createEmails()

async function query(filterBy, viewSelector) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        //two options: by text and by status.
        let {status, search} = filterBy
        console.log('filterBy:', filterBy)
        
        switch (status){
            case 'starred':
                emails = emails.filter(email => email.isStarred && !email.removedAt && email.sentAt)
                break;
            case 'inbox':
                emails = emails.filter(email => (email.receiver ? email.receiver : ' ').toLowerCase().includes('Avinoam'.toLowerCase()) && !email.removedAt&& email.sentAt)
                break;
            case 'sent':
                emails = emails.filter(email => email.sender.toLowerCase().includes('Avinoam'.toLowerCase()) && !email.removedAt && email.sentAt)
                break;
            case 'trash':
                emails = emails.filter(email => email.removedAt)
                break;
            case 'drafts':
                emails = emails.filter(email => !email.sentAt && !email.removedAt)
                break;
            default:
                break;

        }
       
        emails = emails.filter(email => 
            ((email.subject ? email.subject : ' ').toLowerCase().includes(search.toLowerCase())
            || (email.sender.toLowerCase().includes(search.toLowerCase()))
            || ((email.receiver ? email.receiver : ' ').toLowerCase().includes(search.toLowerCase())))
        )
        console.log('filterBy:', filterBy)
    }
    if(viewSelector !== null && viewSelector !== "All"){
        console.log('viewSelector:', viewSelector)
        const view = viewSelector === "Unread" ? false : true
        emails = emails.filter(email => 
            email.isRead === view
        )
    }
    return emails

}

async function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

async function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

async function save(emailToSave) {
    emailToSave.sentAt = 'now'
    if (emailToSave.id){

        return storageService.put(STORAGE_KEY, emailToSave)
    }
    else{
        emailToSave.isRead = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
        
}

function createEmail(subject, body, receiver ) {
    return {
        id: null,
        sender : "avinoam@gmail.com",
        receiver : ' ',
        subject : ' ',
        body : ' ',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null //for later use    
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (emails && emails.length > 0) return
    // const offset = yourDate.getTimezoneOffset()
    // let yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    // const dateNow = yourDate.toISOString().split('T')[0] 
    emails = [
        {
            id: utilService.makeId(), subject: "the email app is up!",
            body: "this app is revotunalry!", isRead: false, isStarred: false,
            sentAt: "June 28", removedAt: null, sender:"AvinoamInc@gmail.com",
            receiver:  "React managemant@react.org.il"
        },
        {
            id: utilService.makeId(), subject: "the email app has a bug!!!",
            body: "Please fix it immediatly!!!", isRead: false, isStarred: true,
            sentAt: "July 9", removedAt: null, sender:"AvinoamInc@gmail.com",
            receiver: "React managemant@react.org.il"
        },
        {
            id: utilService.makeId(), subject: "Bug fixed!",
            body: "the app is back to normal!", isRead: true, isStarred: false,
            sentAt: "Jan 19", removedAt: null, sender: "React managemant@react.org.il",
            receiver: "AvinoamInc@gmail.com"
        }
        
        //TODO we want to change the date into numbers, in strings when entering to db the order might be jumbled a bit
    ]
    utilService.saveToStorage(STORAGE_KEY, emails)
}

function getDefaultFilter(){
    return {
        status: 'inbox',
        search: ''
    }
}

function getUnreadCounter(){
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if(!emails) return 0
    emails = emails.filter(mail => 
        mail.isRead === false && (mail.receiver ? mail.receiver : ' ').includes('avinoam')
        && !mail.removedAt )
     
        console.log('emails.length :', emails.length )
    return emails.length
    
}

function getFilterFromSearchParams(searchParams, folder){
    const filterBy = {
        status: folder,
        search: searchParams.get('search') || ''
        // isRead: JSON.parse(searchParams.get('isRead')),
        // isStarred: searchParams.get('isStarred') || null
        // labels: searchParams.get('labels') || []
    }

    return filterBy
}

async function moveToTrash(id){
    
    const emailToSave = await getById(id).then()
    console.log('move to trash:', emailToSave)
    emailToSave.removedAt = true
    storageService.put(STORAGE_KEY, emailToSave)
}

async function restore(id){
    const emailToSave = await getById(id).then()
    console.log('restored:', emailToSave)
    emailToSave.removedAt = null
    storageService.put(STORAGE_KEY, emailToSave)
}

async function getUnreadById(id){
    const email = await getById(id).then()
    return email.isRead
}

/**
 * gets an email and saves to draft, if he already exists there updates the body / sender / subject
 * @param {*} mail 
 */
function saveDraft(emailToSave){
    console.log('saving: ')
    if (emailToSave.id){

        return storageService.put(STORAGE_KEY, emailToSave)
    }
    else{
        emailToSave.id = utilService.makeId()
        emailToSave.isRead = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

