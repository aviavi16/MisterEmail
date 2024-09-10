export function About(){

    function handleClick( msg ){
        console.log('Clicked:', msg)
    }
    return (
        <section className="about-container"> 
            about page 
            <div className="about">
                <h2> We like email! </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum illum sit laborum odio a, similique fuga esse id sed eligendi nostrum corrupti pariatur suscipit harum, inventore ipsa ad reiciendis culpa?
                </p>

                <section style={{ marginBlock : '30px' , cursor: 'pointer' }} >
                    <DynamicCmp cmpType = 'hello' handleClick={handleClick} name='Muki' />
                    {/* {cmpType === 'hello' && <Hello handleClick={handleClick} name='Muki' />}
                    {cmpType === 'hi' && <Hi handleClick={handleClick} name='Shuki' />}
                    {cmpType === 'pff' && <Pff handleClick={handleClick} name='Puki' />} */}
                </section>
            </div>
        
        </section>
    )
}

function DynamicCmp( { cmpType, ...restOfProps }){

    const dynemicCmp = {
        hello: <Hello {...restOfProps} />,
        hi: <Hi  {...restOfProps}/>,
        pff: <Pff  {...restOfProps} />
    }

    return dynemicCmp[cmpType]
}

function Hello({ name, handleClick }) {
    return (
        <section onClick={ () => {
            handleClick('Hello') } } >
                <u> Welcome {name} </u>
        </section>
    )
}

function Hi({ name, handleClick }) {
    return (
        <section onClick={ () => {
            handleClick('hi') } } >
                <u> hi {name} </u>
        </section>
    )
}

function Pff({ name, handleClick }) {
    return (
        <section onClick={ () => {
            handleClick('pff') } } >
                <u> pff {name} </u>
        </section>
    )
}