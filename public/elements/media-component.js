import SioElement from '/modules/sioelement/SioElement.js';

class MediaComponent extends SioElement {
    static properties = {
        mediaUrl: { type: String, attribute: true },
        mediaType: { type: String, attribute: true },
        description: { type: String, attribute: true },
    };

    static get observedAttributes() {
        return ['mediaurl', 'mediatype', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'mediaurl') {
            this.mediaUrl = newValue;
        }
        if (name === 'mediatype') {
            this.mediaType = newValue;
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

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }

        .media-wrapper {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }

        video, iframe {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }

        iframe {
            height: 500px; /* Para PDFs */
        }

        p {
            font-size: 1.2em;
            text-align: center;
            margin: 0;
        }

        .download-link {
            margin-top: 10px;
            padding: 10px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            text-align: center;
        }

        .download-link:hover {
            background-color: #0056b3;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
                padding: 10px;
            }

            .media-wrapper {
                margin-right: 0;
                margin-bottom: 15px;
            }
        }
    `;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Usamos Shadow DOM
    }

    render() {
        // Aseguramos que renderizamos contenido correctamente según el tipo de media
        const mediaContent = this.mediaType === 'video' ? 
            `<video controls>
                <source src="${this.mediaUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>` : 
            this.mediaType === 'pdf' ? 
            `<iframe src="${this.mediaUrl}"></iframe>` : 
            `<p>Unsupported media type</p>`;

        const downloadLink = (this.mediaType === 'video' || this.mediaType === 'pdf') ? 
            `<a class="download-link" href="${this.mediaUrl}" download>Download ${this.mediaType.charAt(0).toUpperCase() + this.mediaType.slice(1)}</a>` : 
            '';

        // Renderizamos el contenido en el shadow root
        this.shadowRoot.innerHTML = `
            <style>${MediaComponent.styles}</style>
            <div class="container">
                <div class="media-wrapper">
                    ${mediaContent}
                </div>
                <p>${this.description}</p>
                ${downloadLink}
            </div>
        `;
    }
}

MediaComponent.define('media-component');
