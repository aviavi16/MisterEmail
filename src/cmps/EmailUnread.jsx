import { useEffect, useState } from "react"
import downIcon from "../assets/imgs/down-arrow.png"

export function EmailUnread({intialIsRead, isShowRead}){
    const [show, setShow] = useState(true)

    useEffect(() =>{
        console.log('EmailUnread useEffect intialIsRead: show:', intialIsRead, show)
        isShowRead(show)
    }, [show])

    function toggleUnread(){
        setShow(show => !show)

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