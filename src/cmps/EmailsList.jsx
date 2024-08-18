import { Link } from "react-router-dom";

export function EmailList({ emails , onRemove}) {
    return <section className="email-list">
        <div className="table">
            {emails.map(email =>
                <div className="email-row" key={email.id}>
                    <input className="checkbox" title="Select" type="checkbox"/>    
                    <input className="star" title="Select" type="checkbox"/> 
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { email.receiver.name } </div>
                   <div className="email-subject">  {email.subject} </div>
                   <div className="date"> {email.sentAt} </div>
                    
                   <div> 
                        <button onClick={() => onRemove(email.id)}> X </button>
                        <Link to={`/email/${email.id}`}> Details </Link> 
                    </div> 
                </div>)}
        </div>
    </section> 
}