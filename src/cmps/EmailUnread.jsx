import { useEffect, useState } from "react"

export function EmailUnread({isRead}){
    const [filterByUnread, setFilterByUnread] = useState(null)

    useEffect(() =>{
        isRead(filterByUnread)
    }, [filterByUnread])

    function handleChange({target}){
        const name = target.value

        if (target.value === "Unread") 
            setFilterByUnread(false )
        if (target.value === "Read") 
            setFilterByUnread(true )
        if (target.value === "All") 
            setFilterByUnread( null )

    }

    return(
        <section className="email-unread">

        <select  
            onChange={handleChange}
            id="isRead" 
        >  
        <option value="All">All </option>
        <option value="Unread">Unread</option>
        <option value="Read">Read</option>


        </select>
        </section>
    )
}