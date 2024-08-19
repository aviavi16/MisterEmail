import { useEffect, useState } from "react"
import downIcon from "../assets/imgs/down-arrow.png"

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
            className="select-box"
        >  
        <option value="All">All </option>
        <option value="Unread">Unread</option>
        <option value="Read">Read</option>


        </select>
        <div className="icon-container">
            <img src={downIcon} />
        </div>
        </section>
    )
}