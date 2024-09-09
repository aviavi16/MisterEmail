import { useEffect, useState } from "react"
import searchIcon from "../assets/imgs/search.png"

export function EmailFilter({ filterBy, onFilterBy}){
    const [filterByEdit, setFilterByEdit] = useState(filterBy)

    useEffect(() =>{
        onFilterBy(filterByEdit)
    }, [filterByEdit])

    function handleChange({target}){
        let {name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range' :
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        setFilterByEdit(prev => ({ ...prev, [field] : value }))
    }

    function openMenu(){
        const emailFolderEl = document.querySelector('.email-folder-container')
        emailFolderEl.className = 'email-folder-mini' 
    }

    return(
        <section className="email-filter">
            <div className="material-symbols-outlined" id='mini-menu-container' onClick={ openMenu }>              
                menu
            </div>
            <div className="filter-container">
                <img src={searchIcon} htmlFor="search" className="search-link"/>
                <input 
                    value={filterByEdit.search} 
                    onChange={handleChange}
                    name="search"
                    id="search" 
                    type="text" 
                    placeholder="Search mail"/>  
            </div>

            

        </section>
        
    )
}