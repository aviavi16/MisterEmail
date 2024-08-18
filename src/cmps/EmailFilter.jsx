import { useEffect, useState } from "react"

export function EmailFilter({ filterBy, onFilterBy}){
    const [filterByEdit, setFilterByEdit] = useState(filterBy)

    useEffect(() =>{
        onFilterBy(filterByEdit)
    }, [filterByEdit])

    function handleChange({target}){
        const {type, name} = target
        const value = type === 'text' ? target.value : +target.value
        setFilterByEdit(prev => ({ ...prev, [name] : value }))
    }

    return(
        <section className="email-filter">
            <label htmlFor="subject"> Subject </label>
            <input 
                value={filterByEdit.subject} 
                onChange={handleChange}
                id="subject" 
                name="subject" 
                type="text" />  

            <label htmlFor="sender"> Sender </label>
            <input 
                value={filterByEdit.sender} 
                onChange={handleChange}
                id="sender" 
                name="sender" 
                type="text" />  
            
            <label htmlFor="receiver"> Receiver </label>
            <input 
                value={filterByEdit.receiver}
                onChange={handleChange}
                 id="receiver" 
                 name="receiver" 
                 type="text" />  


        </section>
        
    )
}