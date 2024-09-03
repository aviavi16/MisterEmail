import { useState } from "react"

export function Starred({ filterBy, onFilterBy}){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

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
        setFilterByToEdit(prev => ({ ...prev, [field] : value }))
    }
    return (
        <section className="starred">
            <label htmlFor="starred"> Show Starred </label>
            <input value={filterByToEdit.isStarred} type="button" onClick={handleChange} />
        </section>
    )
}