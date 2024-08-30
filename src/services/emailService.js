import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const emailService = {
    query,
    getById,
    remove,
    save,
    createEmail,
    getDefaultFilter
}

const STORAGE_KEY = "emails"

_createEmails()

async function query(filterBy, viewSelector) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        let {search} = filterBy
        emails = emails.filter(email => 
            email.subject.toLowerCase().includes(search.toLowerCase())
            || (email.sender.email.toLowerCase().includes(search.toLowerCase()))
            || (email.receiver.toLowerCase().includes(search.toLowerCase()))
        )
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

async function save(email) {
    if (email.id)
        storageService.put(STORAGE_KEY, email)
    else
        storageService.post(storageService, email)
}

function createEmail(subject, body, sentAt, receiver, sender) {
    return {
        id: utilService.makeId(),
        sender,
        receiver,
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt,
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
            sentAt: "June 28", removedAt: null, sender: {email: "AvinoamInc@gmail.com", name: "Avinoam"},
            receiver: " React managemant"
        },
        {
            id: utilService.makeId(), subject: "the email app has a bug!!!",
            body: "Please fix it immediatly!!!", isRead: false, isStarred: true,
            sentAt: "July 9", removedAt: null, sender: {email: "AvinoamInc@gmail.com", name: "Avinoam"},
            receiver: " React managemant"
        },
        {
            id: utilService.makeId(), subject: "Bug fixed!",
            body: "the app is back to normal!", isRead: true, isStarred: false,
            sentAt: "Jan 19", removedAt: null, sender: {email: "React managemant@gmail.com", name: "React managemant"},
            receiver: " AvinoamInc@gmail.com"
        }
        
        //TODO we want to change the date into numbers, in strings when entering to db the order might be jumbled a bit
    ]
    utilService.saveToStorage(STORAGE_KEY, emails)
}

function getDefaultFilter(){
    return {
        search: ''
    }
}


