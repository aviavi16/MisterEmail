import { EmailPreview } from "./EmailPreview";
import { EmailUnread } from "./EmailUnread";

export function EmailList({ emails , onRemove, onEmailPreviewChange}) {

    return <section className="email-list">

        <div className="table">
            {emails.map(email => 
            <div className="email-row" key={email.id}>
                    <EmailPreview email={email} onRemove={onRemove} onEmailPreviewChange={onEmailPreviewChange} />
            </div>)}     
        </div>
    </section> 
}