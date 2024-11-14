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
    flex-direction: column; /* Cambia la dirección a columna para que la imagen esté arriba y la descripción abajo */
    align-items: center; /* Centra los elementos horizontalmente */
    box-sizing: border-box; /* Asegura que el padding no afecte al tamaño total */
}

/* Estilos para la imagen y su contenedor */
.image-wrapper {
    background-color: #fff; /* Fondo blanco para la imagen */
    padding: 10px; /* Espaciado interno */
    border-radius: 8px; /* Bordes redondeados */
    margin-bottom: 10px; /* Margen inferior para separar la imagen de la descripción */
    display: flex;
    justify-content: center; /* Centra la imagen horizontalmente */
    align-items: center; /* Centra la imagen verticalmente */
}

img {
    max-width: 200px; /* La imagen no debe ser más grande de 200px */
    height: auto;
}

/* Estilos para la descripción */
p {
    margin: 0; /* Elimina márgenes */
    text-align: center; /* Centra la descripción debajo de la imagen */
}

/* Estilos responsivos para pantallas pequeñas (max-width: 768px) */
@media (max-width: 768px) {
    .container {
        padding: 10px; /* Ajusta el padding para mejorar el diseño en móvil */
    }

    .image-wrapper {
        margin-bottom: 10px; /* Espaciado entre la imagen y la descripción */
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
