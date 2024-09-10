export function ColorInput({name , onSetFooterStyle , backgroundColor}){

    const colors = [
        'white',
        'black',
        'red',
        'lightBlue',
        'green',
        'lightGreen',
        'blue'
    ]

    function onSetColor( color ){

        const newStyle = {
            backgroundColor: color
        }
        onSetFooterStyle ( newStyle )
    }
    return (
        <section className="color-input">
            <div className=" items-container">
                { colors.map( color => 
                    <div 
                        key={color} 
                        className={`item ${backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor : color , padding : '10px', marginBottom : '10px'}}
                        onClick={ ()=> onSetColor( color )}>
                             {color}
                    </div>
                )}
            </div>
            <h3> Hello {name} ! , pick a color </h3>
        </section>
    )
}