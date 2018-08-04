((window, document) => {
    class Events {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('li', [], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}, {'role': 'button'}], []);

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

        load(button) {
            let self = this;
            const next = button.getAttribute('data-next');
            button.setAttribute('disabled', 'disabled');

            if (next > 0)
                this.etiedeken.ajax('GET', '/javascripts/es6/portfolio/source.' + next + '.json', function() {
                    button.setAttribute('data-next', this.next);
                    self.append(this.portfolio);
                    self.thumbClick();
                    button.removeAttribute('disabled');
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
