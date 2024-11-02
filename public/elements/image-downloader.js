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
                }

                .download-button:hover {
                    background-color: #218838; /* Color más oscuro al pasar el mouse */
                    transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
                }

                label {
                    text-align: center; /* Centrar el texto del label */
                    margin-top: 10px; /* Espacio superior */
                }

                input[type="number"] {
                    padding: 0.5em; /* Espaciado interno */
                    border: 1px solid #ccc; /* Borde suave */
                    border-radius: 5px; /* Bordes redondeados */
                    width: 100px; /* Ancho fijo */
                    font-size: 1em; /* Tamaño de fuente */
                    margin-top: 5px; /* Espacio superior */
                    transition: border-color 0.3s; /* Transición suave para el borde */
                }

                input[type="number"]:focus {
                    border-color: #ffc629; /* Color del borde al hacer foco */
                    outline: none; /* Quitar el contorno por defecto */
                }

                p {
                    color: red; /* Color del mensaje de error */
                }
            </style>
            <div>
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
