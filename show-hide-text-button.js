class ShowHideTextButton extends HTMLElement {
    constructor() {
        super();
        this._isVisible = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                p {
                    display: block;
                }
                p.hidden {
                    display: none;
                }
            </style>
            <button>Show</button>
            <p><slot>Some dummy text</slot></p>`;
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        const text = this.shadowRoot.querySelector('p');

        if(this.hasAttribute('isVisible')) {
            this._isVisible = this.getAttribute('isVisible')  === 'true';
        }

        if (this._isVisible) {
            button.textContent = 'Hide';
            text.classList.remove('hidden');
        }
        else {
            button.textContent = 'Show';
            text.classList.add('hidden');
        }

        button.addEventListener('click', this._toggleVisibility.bind(this));
    }

    _toggleVisibility() {
        const button = this.shadowRoot.querySelector('button');
        const text = this.shadowRoot.querySelector('p');

        button.textContent = button.textContent == 'Show' ? 'Hide' : 'Show';
        text.classList.toggle('hidden');
    }
}

customElements.define('ll-show-hide-text-button', ShowHideTextButton);