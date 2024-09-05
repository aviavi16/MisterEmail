import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function Starred({ filterBy, onFilterBy}){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect( ()=>{
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({target}){
    //     let {name: field, value, type } = target
    //     switch (type) {
    //         case 'number':
    //         case 'range' :
    //             value = +value
    //             break;
    //         case 'checkbox':
    //             value = target.checked
    //             break;
    //         default:
    //             break;
    //     }
    //     console.log('target:', target)
    //     setFilterByToEdit(prev => ({ ...prev, [field] : value }))
    // }
    return (
        <section className="starred">
            <Link to='/email/starred' className="starred"> Show Starred </Link>
            
        </section>
    )
}