import { useEffect, useState } from "react"
import searchIcon from "../assets/imgs/search.png"

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
            <img src={searchIcon} htmlFor="search" className="search-link"/>
            <input 
                value={filterByEdit.search} 
                onChange={handleChange}
                name="search"
                id="search" 
                type="text" 
                placeholder="Search mail"/>  

            

        </section>
        
    )
}