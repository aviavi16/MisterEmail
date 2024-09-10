export function FontSizeInput({name , onSetFooterStyle , fontSize}){

    function onSetFontSize( {target } ){

        const newStyle = {
            fontSize: target.value + 'px'
        }
        onSetFooterStyle ( newStyle )
    }   

    return (
        <section className="color-input">
            <div className=" items-container">
                <label htmlFor="fontSize"> {fontSize} </label>"
                <input value={parseInt(fontSize)} min={14} max={26} type="range" onChange={onSetFontSize} name="fontSize" id="fontSize"/ >

            </div>
            <h3> Hello {name} ! , pick a font size </h3>
        </section>
    )
}