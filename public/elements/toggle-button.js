import SioElement from '/modules/sioelement';

class ToggleButton extends SioElement {
    static properties = {
        active: { type: Boolean, attribute: true, default: false },
    };

    constructor() {
        super();
        console.log('Se conectó correctamente el componente ToggleButton!');
    }

    async init() {
        console.log('Iniciando carga de datos...');
    }

    static styles = `
        :host {
            display: flex;
            justify-content: center; /* Centra el contenido horizontalmente */
            align-items: center;     /* Centra el contenido verticalmente */
            height: 100vh;          /* Asegura que ocupe toda la altura de la vista */
            margin-top: -200px; 
        }

        button {
            background-color:#202070; /* Color del botón */
            color: white; 
            padding: 100px 150px;  /* Tamaño del botón */
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 24px;      /* Tamaño de la fuente */
            transition: background-color 0.2s; 
        }

        button:hover {
            background-color: #151d33; /* Color más oscuro al pasar el cursor */
        }
    `;

    render() {
        return this.html`<button @click="${this.toggle.bind(this)}">COHACER</button>`;
    }

    toggle() {
        // Redirigir a logo.html
        window.location.href = 'logo.html';
    }
}

ToggleButton.define('toggle-button');
