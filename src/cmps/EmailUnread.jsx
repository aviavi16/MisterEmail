import { useEffect, useState } from "react"
import downIcon from "../assets/imgs/down-arrow.png"

export function EmailUnread({viewSelector}){
    const [view, setView] = useState(null)

    useEffect(() =>{
        viewSelector(view)
    }, [view])

    function handleChange({target}){
        setView(target.value )
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