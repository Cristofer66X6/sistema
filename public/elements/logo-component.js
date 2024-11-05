import SioElement from '/modules/sioelement/SioElement.js';

class LogoComponent extends SioElement {
    static properties = {
        imageUrl: { type: String, attribute: true },
        description: { type: String, attribute: true },
    };

    static get observedAttributes() {
        return ['imageurl', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'imageurl') {
            this.imageUrl = newValue;
        }
        if (name === 'description') {
            this.description = newValue;
        }
    }

    static styles = `
 :host {
    display: block;
    margin: 20px 0;
}

/* Estilos generales del container */
.container {
    display: flex;
    align-items: center; /* Centra verticalmente */
    background-color: #d0d0d0; /* Color gris más oscuro */
    padding: 20px; /* Espaciado interno */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    width: 100%; /* Ocupa todo el ancho disponible */
    max-width: 800px; /* Ancho máximo para el contenedor */
    margin: 0 auto; /* Centra el contenedor horizontalmente */
}

/* Estilos para pantallas móviles (max-width: 768px) */
@media (max-width: 768px) {
    .container {
        width: 100vw; /* Asegura que ocupe todo el ancho del viewport en móvil */
        margin: 0; /* Elimina márgenes, para que ocupe todo el espacio horizontal */
        padding: 10px; /* Ajusta el padding para mejorar el diseño en móvil */
        box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
    }
    
    /* Si quieres que el fondo gris cubra todo el ancho incluso cuando hay espaciado o márgenes */
    body {
        margin: 0; /* Elimina márgenes del body en móvil */
    }
}

/* Estilos para la imagen y su contenedor */
.image-wrapper {
    background-color: #fff; /* Fondo blanco para la imagen */
    padding: 10px; /* Espaciado interno */
    border-radius: 8px; /* Bordes redondeados */
    margin-right: 20px; /* Espaciado entre imagen y descripción */
}

img {
    max-width: 200px; /* Aumenta el tamaño de la imagen */
    height: auto;
}

p {
    margin: 0; /* Sin margen para mantenerlo alineado */
}

/* Estilos responsivos */
@media (max-width: 768px) {
    .container {
        flex-direction: column; /* Cambia la dirección a columna en móvil */
        align-items: center; /* Centra elementos horizontalmente */
    }

    .image-wrapper {
        margin-right: 0; /* Elimina el margen en móvil */
        margin-bottom: 10px; /* Margen inferior para separación */
    }
}


    `;

    render() {
        return this.html`
            <div class="container">
                <div class="image-wrapper">
                    <img src="${this.imageUrl}" alt="Logo">
                </div>
                <div>
                    <p>${this.description}</p>
                </div>
            </div>
        `;
    }
}

LogoComponent.define('logo-component');
