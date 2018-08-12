((window, document) => {
    class Events {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350;
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase()], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}], []);
            container.description = ajax.description;
            return container;
        }

        append(ajax) {
            let container = document.querySelector('.portfolio');

            ajax.reverse();

            for (let i = ajax.length; i > 0; --i) {
                const item = this.setImage(ajax[i-1]);
                container.appendChild(item);
            }

            return container;
        }

        getHeight(container) {
            return container.clientHeight;
        }

        removeAnimation(container, button, self) {
            container.classList.remove('animating');
            container.style.height = null;
            self.timeout = undefined;
            button.removeAttribute('disabled');
        }

        load(button) {
            let self = this;
            const next = button.getAttribute('data-next');
            button.setAttribute('disabled', 'disabled');
            let portfolio = document.querySelector('.portfolio');
            const tempHeight = this.getHeight(portfolio);
            if (next > 0)
                this.etiedeken.ajax('GET', '/javascripts/es6/portfolio/source.' + next + '.json', function() {
                    button.setAttribute('data-next', this.next);
                    self.append(this.portfolio);
                    self.thumbClick();

                    const newHeight = self.getHeight(portfolio);

                    portfolio.style.height = tempHeight + 'px';
                    const animateHeight = self.getHeight(portfolio);
                    portfolio.classList.add('animating');
                    portfolio.style.height = newHeight + 'px';

                    self.timeout = setTimeout(self.removeAnimation, self.time, portfolio, button, self);

                    if (this.next == 0)
                        button.classList.add('remove');
                });
        }

        thumbClick() {
            let self = this;
            let items = document.querySelectorAll('.portfolio li:not(.loaded)');

            for (let i = items.length; i > 0; --i) {
                let item = items[i-1];
                item.classList.add('loaded');
                item.addEventListener('click', (e) => {

                });
            }
        }

        loadClick() {
            let self = this;
            let button = document.querySelector('.portfolio-btn');

            button.addEventListener('click', (e) => {
                self.load(button);
            });
        }

        init() {
            this.loadClick();
            this.thumbClick();
        }
    }

    let events = new Events(window.etiedeken);
    events.init();
})(window, document);
