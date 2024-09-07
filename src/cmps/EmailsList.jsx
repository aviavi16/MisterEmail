import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails , onRemove, onRead, onRestore}) {

    return <section className="email-list">

        <div className="table">
            {emails.map(email => 
            <div className="email-row" key={email.id}>
                    <EmailPreview email={email} onRemove={onRemove} onRead={onRead} onRestore= {onRestore}/>
            </div>)}     
        </div>
    </section> 
}