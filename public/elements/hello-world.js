// hello-world.js
import SioElement from '/modules/sioelement/SioElement.js';

class HelloWorld extends SioElement {
    static properties = {
        text: { type: String, attribute: true, default: 'Hello, World!' },
    };

    static styles = `
:host {
    display: block;
    padding: 0; /* Elimina el padding alrededor del custom element */
    margin: 0; /* Elimina el margen del custom element */
    font-family: 'Montserrat', sans-serif;
}


    p {
        font-size: 3em; /* Aumentar tamaño de la letra */
        font-weight: bold; /* Negrita */
        margin: 0; /* Elimina el margen del párrafo */
        text-align: left; /* Centrar el texto */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra del texto */
    }
    `;


    render() {
        return this.html`<p><slot></slot></p>`;
    }
}

HelloWorld.define('hello-world');
