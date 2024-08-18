import { Link } from "react-router-dom";

export function EmailList({ emails , onRemove}) {
    return <section className="email-list">
        <div className="table">
            {emails.map(email =>
                <div className="email-row" key={email.id}>
                    <input className="checkbox" title="Select" type="checkbox"/>    
                    <input className="star" title="Select" type="checkbox"/> 
                   {/* <div className="checkbox-important-btn"> <button /> </div> */}
                   <div className="from-email"> { email.sender.name } </div>
                   <Link to={`/email/${email.id}`}>  {email.subject} </Link> 
                   <div className="date"> {email.sentAt} </div>
                    
                   
                    <button onClick={() => onRemove(email.id)}> X </button>
                     
                </div>)}
        </div>
    </section> 
}