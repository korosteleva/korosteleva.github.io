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


    class Multirange extends HTMLElement {
        constructor() {
            super();
            const t = document.querySelector('#customMultirange');
            const shadowRoot = this.createShadowRoot({mode: 'closed'});
            shadowRoot.innerHTML = t.innerHTML;
            this._multirange = shadowRoot.querySelector('.multirange');
            this._rangeLow = shadowRoot.querySelector('.range-low');
            this._rangeLowLabel = this._rangeLow.querySelector('.label');
            this._rangeHigh = shadowRoot.querySelector('.range-high');
            this._rangeHighLabel = this._rangeHigh.querySelector('.label');
        }

        static get observedAttributes() {
            return ['min', 'max'];
        }

        attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
            switch (name) {
                case 'min':
                    const lowPercentage = newValue === null ? 0 : parseInt(newValue);
                    this._multirange.style.setProperty('--low', lowPercentage + '%');
                    this._rangeLow.style.left = lowPercentage + '%';
                    this._rangeLowLabel.textContent = lowPercentage;
                    break;
                case 'max':
                    const highPercentage = newValue === null ? 0 : parseInt(newValue);
                    this._multirange.style.setProperty('--high', highPercentage + '%');
                    this._rangeHigh.style.left = highPercentage + '%';
                    this._rangeHighLabel.textContent = highPercentage;
                    break;
            }
        }

        // get progress() { return this.getAttribute('value'); }
        // set progress(newValue) { this.setAttribute('value', newValue); }
    }
    customElements.define('custom-multirange', Multirange);



    const customProgressBar = document.querySelector('custom-progress-bar');
    document.querySelector('.js-change-progress').addEventListener('click', () => {
        customProgressBar.setAttribute('value', getRandom());
    });

    const customMultirange = document.querySelector('custom-multirange');
    document.querySelector('.js-change-multirange').addEventListener('click', () => {
        customMultirange.setAttribute('min', getRandom(0, 50));
        customMultirange.setAttribute('max', getRandom(51, 100));
    });

} else {
    alert('Your browser does not supper Custom Elements!')
}
