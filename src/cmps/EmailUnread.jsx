import { useEffect, useState } from "react"

export function EmailUnread({isRead}){
    const [filterByUnread, setFilterByUnread] = useState(false)

    useEffect(() =>{
        isRead(filterByUnread)
    }, [filterByUnread])

    function handleChange({target}){
        console.log('target:', target)
        const name = target.value

        console.log('name:', name)
        if (target.value === "Unread") 
            setFilterByUnread(prev => false )
        if (target.value === "Read") 
            setFilterByUnread(prev => true )
        if (target.value === "All") 
            setFilterByUnread(prev => null )

    }

    return(
        <section className="email-unread">

        <select  
            value={isRead} 
            onChange={handleChange}
            id="isRead" 
            name="isRead" 
        >  
        <option value="Unread">Unread</option>
        <option value="Read">Read</option>
        <option value="All">All </option>

        </select>
        </section>
    )
}