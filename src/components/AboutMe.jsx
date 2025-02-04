import React from 'react'

const AboutMe = () => {
    return (
        <main className='flex space-x-28'>
            <section className='flex-1'>
                <div className='pr-8'>
                <h1 className='font-montserrat text-8xl font-bold text-whiteCream'>PAULA</h1>
                <p>
                    Me adapto a diferentes estilos y necesidades, explorando tendencias y buscando formas de hacer la web más intuitiva y atractiva. Mi enfoque está en la accesibilidad, la interactividad y la experiencia de usuario, siempre con una estructura bien organizada (porque sí, el desorden en el código me da ansiedad).
                    <br /><br />
                    Si quieres hablar de diseño, desarrollo o simplemente debatir sobre la mejor forma de animar sin perder la paciencia, hablemos.
                </p>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>
            <section className='flex-1'>
                <h2 className='font-montserrat text-5xl font-medium text-whiteCream mt-2'>SKILLS</h2>
                <div>
                    <h3 className='font-robotoMono text-3xl text-whiteCream mt-2'>DISEÑO</h3>
                </div>
                <div>
                    <h3 className='font-robotoMono text-3xl text-whiteCream'>FRONT-END</h3>
                </div>
            </section>
        </main>
    )
}

export default AboutMe