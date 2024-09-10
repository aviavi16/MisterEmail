import { useState } from "react"
import { ColorInput } from "./dynemic-inputs/ColorInput"
import { FontSizeInput } from "./dynemic-inputs/FontSizeInput"


export function AppFooter(){

    const [cmpType, setCmpType] = useState( 'color')
    const [footerSytle, setFooterStyle] = useState({
        backgroundColor : 'white',
        fontSize : '16px'
    })

    function onSetFooterStyle ( newStyle ){
        setFooterStyle ( prevStyle => ({ ...prevStyle, ...newStyle}))
    }

    return(
        <section className="app-footer">
                    ashkenazyRights 2024 &copy;
                    {/* <section  style={footerSytle} className="container">
                        <DynamicCmp {...footerSytle} cmpType={cmpType} name='test' onSetFooterStyle={onSetFooterStyle}/>
                        <select onChange={(ev) => setCmpType(ev.target.value)}>
                            <option value='color'> Color </option>
                            <option value='fontSize'> Font Size </option>

                        </select>
                    </section> */}
        </section>
    )
}

function DynamicCmp( { cmpType, ...restOfProps }){
    const dynemicCmps = {
        color: <ColorInput {...restOfProps} />,
        fontSize: <FontSizeInput  {...restOfProps}/>,
    }

    return dynemicCmps[cmpType]
}