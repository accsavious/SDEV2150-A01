const template = document.createElement('template');

template.innerHTML = `

`

class Resource extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    };

}

customElements.define('app-button', Resource);

export default Resource