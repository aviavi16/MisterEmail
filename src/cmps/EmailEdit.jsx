import { useEffect, useRef, useState } from "react"
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { emailService } from "../services/emailService"
import { debounce } from "../services/util.service"

export function EmailEdit({ onSaveEmail }){
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()  
    const [email, setEmail] = useState( emailService.createEmail())
    const [viewState, setViewState] = useState('normal') // 'full-screen' or 'minimize'
    const onSaveDraftByDebounce = useRef( debounce( onSaveDraft, 400)).current

    useEffect(() => {
        const mailId = searchParams.get('compose')
        if (mailId && mailId !== 'new') {
            emailService.getById(mailId).then(setEmail)
        }
    }, [])

    function handleChange( {target }){
        let {name: field, value, type} = target
        switch(type){
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        console.log('value:', value)
        setEmail( prevEmail => ({ ...prevEmail, [field]: value }))
        console.log('email:', email)
        if (!email.sentAt ){
            
            onSaveDraftByDebounce(email)
        }
    }

    const { receiver , subject, body } = email

    function onSubmitEmail( ev ){
        ev.preventDefault()
        console.log('onSaveEmail:', email)
        onSaveEmail(email)
    }

    function onChangeViewState(viewState , ev) {
        if (ev) ev.stopPropagation()
        setViewState(viewState)
    }

    function onToggleView(view1, view2, ev){
        if (ev) ev.stopPropagation()
        setViewState(view1 === viewState ? view2 : view1)
    }

    function onToggleIcon(viewToChange, isChangeState, ev){
        if (ev) ev.stopPropagation()

        let miniVar = ''
        let iconText1 = 'add'
        let iconText2 = 'open_in_full'
        let view1 = ''
        let view2 = ''
        console.log('we need to chage view to: viewToChange', viewToChange)
        
        switch (viewToChange){
            case 'minimize':
                miniVar = 'mini-icon'
                iconText1 = 'add'
                iconText2 = 'open_in_full'
                view1 = 'normal'
                view2 = 'full-screen'
                break;
            case 'normal':
                iconText1 = 'minimize'
                iconText2 = 'open_in_full'
                view1 = 'minimize'
                view2 = 'full-screen'
                break;
            case 'full-screen':
                iconText1 = 'minimize'
                iconText2 = 'close_fullscreen'
                view1 = 'minimize'
                view2 = 'normal'
                break;
            default:
                console.log('error: this view is not supported yet', viewToChange)
                break;
        }
        if( isChangeState)
            setViewState(viewToChange)

        return  (
            <>
                <span
                    onClick={(ev) => onToggleIcon(view1, true,  ev)}
                    className={`material-symbols-outlined ${miniVar}`}>
                    {iconText1}
                </span>
                <span
                    onClick={(ev) => onToggleIcon(view2, true, ev)}
                    className='material-symbols-outlined'
                >
                    {iconText2}
                </span>
            </>
            
        ) 
    }

    function onSaveDraft(mailToDraft){
        console.log('saving the email to drafts: ' , mailToDraft)
        emailService.saveDraft(mailToDraft)
    }

    return (
        <>
        <section className={ `${viewState} email-edit` }>
            { viewState === 'minimize' && (<span> Draft </span>)}
            <header
                onClick={() => {
                    onToggleView('minimize','normal')
                }}>

                <h4>New Message</h4>
                <div className='icon-container'>
                { onToggleIcon(viewState, false )}

                    <Link
                        to={`/email/${params.folder}`}
                        className='material-symbols-outlined'
                    >
                        close
                    </Link>
                </div>
            </header>

            <span className="sub-title"> {searchParams.get('compose') !== 'new' ? 'Edit' : 'Add'} Email </span>
            
            <form onSubmit={onSubmitEmail}>
                <label htmlFor="receiver"> To:   </label>
                <input onChange={handleChange} value={ receiver } type="text" id="receiver" name="receiver" />

                <label htmlFor="subject">   Subject: </label>
                <input onChange={handleChange} value={ subject } type="text" id="subject" name="subject" />

                <label htmlFor="body">   Email: </label>
                <input onChange={handleChange} value={ body } type="text" id="body" name="body" />

                <section className="btns">
                    <button className="btn">    Send    </button>
                    {/* <button type="button" className="btn">    Cancel    </button> */}
                </section>
            </form>

        </section>

        {viewState === 'full-screen' && (
                <div
                    className='close-modal-screen'
                    onClick={() => onChangeViewState('normal')}
                > Close Full Screen  </div>
            )}
        </>
    )
}