((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('li', [], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}], []);

            return container;
        }

        fulfiller(ajax) {
            let portfolioWrapper = document.getElementById('portfolio');

            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            const label = this.etiedeken.element('h2', ['text-center'], [], 'Portfolio');

            let items = this.etiedeken.element('ul', ['portfolio'], []);

            ajax.portfolio.reverse();

            for (let i = ajax.portfolio.length; i > 0; --i) {
                const item = this.setImage(ajax.portfolio[i-1]);
                items.appendChild(item);
            }

            container.appendChild(label);
            container.appendChild(items);
            portfolioWrapper.appendChild(container);

            window.load.downloadjs('/javascripts/es6/portfolio/events');
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }
    }

    const check = (window) => {
        (window.etiedeken) ?
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/es6/portfolio/source.json');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
