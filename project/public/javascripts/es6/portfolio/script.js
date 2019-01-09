/* jshint esversion: 6 */
((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase(), 'portfolio-item'], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}, {'data-description': ajax.description}, {'data-name': ajax.name}, {'type': 'button'}], []);
            return container;
        }

        more(next) {
            let container = this.etiedeken.element('div', ['text-center'], []);
            const button = this.etiedeken.accessibleElement('button', ['portfolio-btn'], [], [{'type': 'button'}, {'data-next': next}], '+');
            container.appendChild(button);
            return container;
        }

        fulfiller(ajax) {
            let portfolioWrapper = document.getElementById('portfolio');

            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            const label = this.etiedeken.element('h2', ['text-center'], [], 'Portfolio');

            let items = this.etiedeken.element('div', ['portfolio'], []);

            ajax.portfolio.reverse();

            for (let i = ajax.portfolio.length; i > 0; --i) {
                const item = this.setImage(ajax.portfolio[i-1]);
                items.appendChild(item);
            }

            let button = this.more(ajax.next);

            container.appendChild(label);
            container.appendChild(items);
            container.appendChild(button);
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
        if (window.etiedeken)
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/api/portfolio/getCollection/?collection=1');
            });
        else
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
