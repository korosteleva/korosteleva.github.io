supportsCustomElements = () => 'registerElement' in document;
getRandom = (min = 0, max = 100) => Math.floor(Math.random() * ((max + 1) - min)) + min;

if (supportsCustomElements()) {

    class CustomProgressBar extends HTMLElement {
        constructor() {
            super();
            const t = document.querySelector('#customProgressBar');
            const shadowRoot = this.createShadowRoot({mode: 'closed'});
            shadowRoot.innerHTML = t.innerHTML;
            this._progressElement = shadowRoot.querySelector('.progress');
            this._label = shadowRoot.querySelector('.label');
            this._bar = shadowRoot.querySelector('.bar');
        }

        static get observedAttributes() {
            return ['value'];
        }

        attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
            switch (name) {
                case 'value':
                    const newPercentage = newValue === null ? 0 : parseInt(newValue);
                    this._progressElement.setAttribute('aria-valuenow', newPercentage);
                    this._label.textContent = newPercentage + '%';
                    this._bar.style.width = newPercentage + '%';
                    break;
            }
        }
        get progress() { return this.getAttribute('value'); }
        set progress(newValue) { this.setAttribute('value', newValue); }
    }
    customElements.define('custom-progress-bar', CustomProgressBar);

    const customProgressBar = document.querySelector('custom-progress-bar');
    document.querySelector('.js-change-progress').addEventListener('click', () => {
        customProgressBar.setAttribute('value', getRandom());
    });

} else {
    alert('Your browser does not supper Custom Elements!')
}
