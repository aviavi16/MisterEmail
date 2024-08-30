import { useState } from "react"

export function UserMsg(){
    const [ msg, setMsg ] = useState(null)

    function onCloseMsg(){
        setMsg(null)
    }

    if(!msg) return <></>
    return (
        <section className={"user-msg " + msg.type}>
            <span> { msg.txt }</span>
            <button onClick={onCloseMsg} className="close-btn" > X </button>
        </section>
    )
}