/* jshint esversion: 6 */
((window, document) => {
    class Events {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350;
        }

        scrollbar() {
            let scrollElement = document.createElement('div');
            scrollElement.classList.add('scrollbar');
            document.body.appendChild(scrollElement);
            const result = scrollElement.offsetWidth - scrollElement.clientWidth;
            document.body.removeChild(scrollElement);
            return result;
        }

        openPadding() {
            let menu = document.getElementById('navigation');
            document.body.classList.remove('popup-close');
            document.body.classList.add('popup-open');

            const scrollbarWidth = this.scrollbar() + 'px';
            document.body.style.paddingRight = scrollbarWidth;
            menu.style.paddingRight = scrollbarWidth;
        }
        closePadding() {
            let menu = document.getElementById('navigation');
            document.body.classList.remove('popup-open');
            document.body.classList.add('popup-close');

            menu.style.paddingRight = null;
            document.body.style.paddingRight = null;
        }

        setImage(ajax) {
            let container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase(), 'portfolio-item'], [{'backgroundImage': 'url(' + ajax.cover + ')'}], [{'aria-label': ajax.name}, {'data-set': [ajax.set]}, {'data-description': ajax.description}, {'data-name': ajax.name}, {'type': 'button'}], []);
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
            let portfolioContainer = document.querySelector('.portfolio');
            const tempHeight = this.getHeight(portfolioContainer);
            if (next > 0)
                this.etiedeken.ajax('GET', '/javascripts/response/portfolio/source.' + next + '.json', function() {
                    button.setAttribute('data-next', this.next);
                    self.append(this.portfolio);
                    self.thumbClick();

                    const newHeight = self.getHeight(portfolioContainer);

                    portfolioContainer.style.height = tempHeight + 'px';
                    const animateHeight = self.getHeight(portfolioContainer);
                    portfolioContainer.classList.add('animating');
                    portfolioContainer.style.height = newHeight + 'px';

                    self.timeout = setTimeout(self.removeAnimation, self.time, portfolioContainer, button, self);

                    if (this.next == 0)
                        button.classList.add('remove');
                });
        }

        createPopupWrapper() {
            let self = this;
            let body = document.body;
            let popupWrapper = this.etiedeken.element('div', ['portfolio-popup'], []);
            popupWrapper.id = 'portfolio_popup';
            let popupContainer = this.etiedeken.element('div', ['container'], []);

            let close = this.etiedeken.accessibleElement('button', ['portfolio-close'], [], [{'aria-label': 'Close'}, {'type': 'button'}], '×');
            popupContainer.appendChild(close);
            close.addEventListener('click', (e) => {
                self.removePopup();
            });

            let images = this.etiedeken.element('div', ['portfolio-images'], []);
            popupContainer.appendChild(images);

            let prevNext = this.etiedeken.element('div', ['portfolio-prev-next'], []);
            popupContainer.appendChild(prevNext);
            
            let slides = this.etiedeken.element('div', ['portfolio-slides'], []);
            popupContainer.appendChild(slides);

            let name = this.etiedeken.element('div', ['portfolio-name'], []);
            popupContainer.appendChild(name);

            let description = this.etiedeken.element('div', ['portfolio-description'], []);
            popupContainer.appendChild(description);

            popupWrapper.appendChild(popupContainer);

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
            images.firstChild.classList.add('active');

            let name = popupWrapper.getElementsByClassName('portfolio-name')[0];
            let nameText = this.etiedeken.element('h3', [], [], dataName);
            name.appendChild(nameText);

            let description = popupWrapper.getElementsByClassName('portfolio-description')[0];
            let descriptionText = this.etiedeken.element('p', [], [], dataDescription);
            description.appendChild(descriptionText);
        }
        createPopup(dataDescription, dataName, dataSet) {
            this.createPopupWrapper();
            this.populatePopup(dataDescription, dataName, dataSet);
            this.openPadding();
        }
        removePopup() {
            this.closePadding();
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

        window() {
            let self = this;

            window.addEventListener('keydown', (e) => {
                let popup = document.getElementById('portfolio_popup');
                if (e.keyCode === 27)
                    if (popup)
                        self.removePopup();
            });
        }

        loadClick() {
            let self = this;
            let button = document.getElementsByClassName('portfolio-btn')[0];

            button.addEventListener('click', (e) => {
                self.load(button);
            });
        }

        init() {
            this.loadClick();
            this.thumbClick();
            this.window();
        }
    }

    let events = new Events(window.etiedeken);
    events.init();
})(window, document);
