import { useEffect, useState } from "react"
import downIcon from "../assets/imgs/down-arrow.png"

export function EmailUnread({intialIsRead, isShowRead}){
    const [showUnread, setShowUnread] = useState(intialIsRead)

    useEffect(() =>{
        console.log(' useEffect intialIsRead: showUnread:', intialIsRead, showUnread)
        isShowRead(showUnread)
    }, [showUnread])

    function toggleUnread(){
        setShowUnread(showUnread => !showUnread)

    }

    function intialText(intialIsRead){
        if(intialIsRead)
            return 'Everything Else'
        else
            return 'Unread'
    }
    return(
        <section className="email-unread">
        
        <button  
            onClick={toggleUnread}
            className="toggle-btn"
        >  
        {intialText(intialIsRead)}


        </button>
        <div className="icon-container">
            <img src={downIcon} />
        </div>
        </section>
    )
}