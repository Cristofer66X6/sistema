import SioElement from '/modules/sioelement/SioElement.js';

class ImageDownloader extends SioElement {
    static properties = {
        imageUrl: { type: String, attribute: false },
        width: { type: Number, attribute: true },
        height: { type: Number, attribute: true },
        errorMessage: { type: String, attribute: false },
        aspectRatio: { type: Number, attribute: false },
    };

    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.errorMessage = '';
        this.imageUrl = '';
        this.aspectRatio = 0;
    }

    connectedCallback() {
        super.connectedCallback();
        const logoComponent = this.previousElementSibling;
        if (logoComponent && logoComponent.tagName === 'LOGO-COMPONENT') {
            this.imageUrl = logoComponent.imageUrl;
            const img = new Image();
            img.src = this.imageUrl;

            img.onload = () => {
                this.aspectRatio = img.width / img.height;
            };
        } else {
            this.errorMessage = 'No se encontró un logo-component anterior.';
        }
    }

    render() {
        return this.html`
            <style>
/* Estilos para el contenedor que envuelve el h3, el input, el botón y el mensaje de error */
.download-container {
    display: flex;
    flex-direction: column; /* Organiza los elementos de manera vertical */
    align-items: center; /* Centra el contenido horizontalmente */
    justify-content: center; /* Centra el contenido verticalmente */
    margin-top: 1em;
    text-align: center; /* Centra el texto dentro del contenedor */
    padding: 20px; /* Espaciado interno del contenedor */
    width: 100%; /* Asegura que el contenedor ocupe todo el ancho disponible */
    box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

/* Estilos para el h3 (texto "Descargar Imagen") */
.download-container h3 {
    font-size: 1.5em; /* Tamaño de la fuente */
    font-weight: bold; /* Negrita */
    margin-bottom: 15px; /* Espacio debajo del h3 */
    text-align: center; /* Centra el texto */
}

/* Estilos para el botón de descarga */
.download-button {
    background-color: #28a745; /* Color verde */
    color: white; /* Color del texto */
    border: none; /* Sin borde */
    border-radius: 5px; /* Bordes redondeados */
    padding: 10px 20px; /* Espaciado interno */
    cursor: pointer; /* Cambiar cursor al pasar el mouse */
    font-size: 1em; /* Tamaño de fuente */
    transition: background-color 0.3s, transform 0.3s; /* Transición suave para el fondo */
    margin-top: 10px; /* Espacio superior */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Sombra sutil */
    display: inline-block; /* Cambiar a inline-block para un comportamiento más fluido */
    width: auto; /* Ajustar al contenido */
}

/* Efecto hover para el botón */
.download-button:hover {
    background-color: #218838; /* Color más oscuro al pasar el mouse */
    transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}

/* Estilos para el campo de entrada (input) */
input[type="number"] {
    padding: 0.5em; /* Espaciado interno */
    border: 1px solid #ccc; /* Borde suave */
    border-radius: 5px; /* Bordes redondeados */
    width: 100px; /* Ancho fijo */
    font-size: 1em; /* Tamaño de fuente */
    margin-top: 10px; /* Espacio superior */
    transition: border-color 0.3s; /* Transición suave para el borde */
    display: block; /* Asegura que el campo de entrada sea un bloque */
    margin-left: auto; /* Auto-margen izquierdo para centrarlo */
    margin-right: auto; /* Auto-margen derecho para centrarlo */
}

/* Efecto para el campo de entrada (input) cuando se hace foco */
input[type="number"]:focus {
    border-color: #ffc629; /* Color del borde al hacer foco */
    outline: none; /* Quitar el contorno por defecto */
}

/* Estilos para el texto del label */
label {
    text-align: center; /* Centra el texto del label */
    margin-top: 10px; /* Espacio superior */
    display: block; /* Asegura que el label se comporte como un bloque */
    margin-left: auto; /* Auto-margen izquierdo para centrarlo */
    margin-right: auto; /* Auto-margen derecho para centrarlo */
    font-size: 1em; /* Tamaño de fuente */
    font-weight: normal; /* Peso de la fuente normal */
}

/* Estilo para mensaje de error */
p {
    color: red; /* Color del mensaje de error */
    text-align: center; /* Centra el texto de error */
    margin-top: 10px; /* Espacio superior */
}

/* Media query para dispositivos con un ancho máximo de 768px (para móviles y tabletas pequeñas) */
@media (max-width: 768px) {
    .download-container {
        padding: 15px; /* Reducir el padding en móviles */
    }

    /* Ajustes para el botón de descarga */
    .download-button {
        width: 80%; /* El botón ocupará el 80% del ancho disponible */
        padding: 8px 16px; /* Ajustar el tamaño del botón para dispositivos más pequeños */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el campo de entrada */
    input[type="number"] {
        width: 80%; /* El campo de entrada ocupará el 80% del ancho */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el label */
    label {
        width: 80%; /* El label ocupará el 80% del ancho */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el mensaje de error */
    p {
        width: 80%; /* El mensaje de error también será más pequeño */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }
}

/* Media query para dispositivos muy pequeños (300px en adelante) */
@media (max-width: 300px) {
    .download-container {
        padding: 10px; /* Espaciado más pequeño */
    }

    /* Ajustes para el botón de descarga */
    .download-button {
        width: 90%; /* El botón ocupará el 90% del ancho */
        padding: 8px 12px; /* Ajustar el tamaño del botón */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el campo de entrada */
    input[type="number"] {
        width: 90%; /* El campo de entrada ocupará el 90% del ancho */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el label */
    label {
        width: 90%; /* El label ocupará el 90% del ancho */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }

    /* Ajustes para el mensaje de error */
    p {
        width: 90%; /* El mensaje de error también será más pequeño */
        margin-left: auto;
        margin-right: auto; /* Mantener centrado */
    }
}



            </style>
           <div class="download-container">
    <h3>Descargar Imagen</h3>
    <label>
        Ancho (px):
        <input type="number" min="1" @input="${e => this.updateWidth(e.target.value)}" placeholder="Ancho (px)" />
    </label>
    <button @click="${() => this.downloadImage()}" class="download-button">Descargar Imagen</button>
    <p>${this.errorMessage}</p>
</div>

        `;
    }

    updateWidth(value) {
        this.width = value;
        this.height = this.width / this.aspectRatio;
    }

    async downloadImage() {
        if (this.width <= 0 || this.height <= 0) {
            this.errorMessage = 'Las dimensiones deben ser mayores a cero.';
            return;
        }

        const img = new Image();
        img.src = this.imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = this.width;
            canvas.height = this.height;

            ctx.drawImage(img, 0, 0, this.width, this.height);

            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = this.getFileName();
            a.click();
        };
    }

    getFileName() {
        return `imagen-${this.width}x${this.height}.png`;
    }
}

ImageDownloader.define('image-downloader');
