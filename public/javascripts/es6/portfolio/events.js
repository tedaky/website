/* jshint esversion: 6 */
((window, document) => {
    class Events {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350;
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase(), 'portfolio-item'], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}, {'data-description': ajax.description}, {'data-name': ajax.name}], []);
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
                this.etiedeken.ajax('GET', '/javascripts/response/portfolio/source.' + next + '.json', function() {
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

        createPopupWrapper() {
            let body = document.body;
            let popupWrapper = this.etiedeken.element('div', ['portfolio-popup'], []);
            popupWrapper.id = 'portfolio_popup';

            let close = this.etiedeken.accessibleElement('button', ['portfolio-close'], [], [{'aria-label': 'Close'}, {'type': 'button'}]);
            popupWrapper.appendChild(close);

            let name = this.etiedeken.element('div', ['portfolio-name'], []);
            popupWrapper.appendChild(name);

            let description = this.etiedeken.element('div', ['portfolio-description'], []);
            popupWrapper.appendChild(description);

            let images = this.etiedeken.element('div', ['portfolio-images'], []);
            popupWrapper.appendChild(images);

            let prevNext = this.etiedeken.element('div', ['portfolio-prev-next'], []);
            popupWrapper.appendChild(prevNext);
            
            let slides = this.etiedeken.element('div', ['portfolio-slides'], []);
            popupWrapper.appendChild(slides);

            body.appendChild(popupWrapper);
        }
        populatePopup(dataDescription, dataName, dataSet) {
            dataSet.reverse();

            let popupWrapper = document.getElementById('portfolio_popup');

            let images = popupWrapper.getElementsByClassName('portfolio-images')[0];
            for (let i = dataSet.length; i > 0; --i) {
                let imageSet = this.etiedeken.image([], [], dataSet[i-1], []);
                images.appendChild(imageSet);
            }

            let name = popupWrapper.getElementsByClassName('portfolio-name')[0];
            let nameText = this.etiedeken.element('span', [], [], dataName);
            name.appendChild(nameText);

            let description = popupWrapper.getElementsByClassName('portfolio-description')[0];
            let descriptionText = this.etiedeken.element('span', [], [], dataDescription);
            description.appendChild(descriptionText);
        }
        createPopup(dataDescription, dataName, dataSet) {
            this.createPopupWrapper();
            this.populatePopup(dataDescription, dataName, dataSet);
        }
        removePopup() {
            let popupWrapper = document.getElementById('portfolio_popup');
            if (popupWrapper)
                popupWrapper.parentElement.removeChild(popupWrapper);
        }
        popup(dataDescription, dataName, dataSet) {
            this.removePopup();
            this.createPopup(dataDescription, dataName, dataSet);
        }
        thumbEvent(item) {
            let self = this;

            item.addEventListener('click', (e) => {
                const dataDescription = item.getAttribute('data-description');
                const dataName = item.getAttribute('data-name');
                const dataSet = item.getAttribute('data-set').split(',');
                item.blur();
                self.popup(dataDescription, dataName, dataSet);
            });
        }
        thumbClick() {
            let self = this;
            let items = document.querySelectorAll('.portfolio .portfolio-item:not(.loaded)');

            for (let i = items.length; i > 0; --i) {
                let item = items[i-1];
                item.classList.add('loaded');
                self.thumbEvent(item);
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
