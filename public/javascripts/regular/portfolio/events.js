/* jshint esversion: 6 */
(function (window, document) {
    var Events = /** @class */ (function () {
        function Events(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350;
            this.lastFocus = undefined;
        }
        Events.prototype.scrollbar = function () {
            var scrollElement = document.createElement('div');
            scrollElement.classList.add('scrollbar');
            document.body.appendChild(scrollElement);
            var result = scrollElement.offsetWidth - scrollElement.clientWidth;
            document.body.removeChild(scrollElement);
            return result;
        };
        Events.prototype.openPadding = function () {
            var menu = document.getElementById('navigation');
            document.body.classList.remove('popup-close');
            document.body.classList.add('popup-open');
            var scrollbarWidth = this.scrollbar() + 'px';
            document.body.style.paddingRight = scrollbarWidth;
            menu.style.paddingRight = scrollbarWidth;
        };
        Events.prototype.closePadding = function () {
            var menu = document.getElementById('navigation');
            document.body.classList.remove('popup-open');
            document.body.classList.add('popup-close');
            menu.style.paddingRight = null;
            document.body.style.paddingRight = null;
        };
        Events.prototype.setImage = function (ajax) {
            var container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase(), 'portfolio-item'], [{ 'backgroundImage': 'url(' + ajax.cover + ')' }], [{ 'aria-label': ajax.name }, { 'data-set': [ajax.set] }, { 'data-description': ajax.description }, { 'data-name': ajax.name }, { 'type': 'button' }], []);
            return container;
        };
        Events.prototype.append = function (ajax) {
            var container = document.querySelector('.portfolio');
            ajax.reverse();
            for (var i = ajax.length; i > 0; --i) {
                var item = this.setImage(ajax[i - 1]);
                container.appendChild(item);
            }
            return container;
        };
        Events.prototype.getHeight = function (container) {
            return container.clientHeight;
        };
        Events.prototype.removeAnimation = function (container, button, self) {
            container.classList.remove('animating');
            container.style.height = null;
            self.timeout = undefined;
            button.removeAttribute('disabled');
        };
        Events.prototype.load = function (button) {
            var self = this;
            var next = button.getAttribute('data-next');
            button.setAttribute('disabled', 'disabled');
            var portfolioContainer = document.querySelector('.portfolio');
            var tempHeight = this.getHeight(portfolioContainer);
            if (next > 0)
                this.etiedeken.ajax('GET', '/api/portfolio/getCollection/?collection=' + next, function () {
                    button.setAttribute('data-next', this.next);
                    self.append(this.portfolio);
                    self.thumbClick();
                    var newHeight = self.getHeight(portfolioContainer);
                    portfolioContainer.style.height = tempHeight + 'px';
                    var animateHeight = self.getHeight(portfolioContainer);
                    portfolioContainer.classList.add('animating');
                    portfolioContainer.style.height = newHeight + 'px';
                    self.timeout = setTimeout(self.removeAnimation, self.time, portfolioContainer, button, self);
                    if (this.next == 0)
                        button.classList.add('remove');
                });
        };
        Events.prototype.prevPortfolioImage = function () {
            var portfolioImagesContainer = document.getElementsByClassName('portfolio-images')[0];
            var currentImage = portfolioImagesContainer.getElementsByClassName('active')[0];
            var prevSibling = currentImage.previousElementSibling;
            if (prevSibling) {
                currentImage.classList.remove('active');
                prevSibling.classList.add('active');
            }
        };
        Events.prototype.nextPortfolioImage = function () {
            var portfolioImagesContainer = document.getElementsByClassName('portfolio-images')[0];
            var currentImage = portfolioImagesContainer.getElementsByClassName('active')[0];
            var nextSibling = currentImage.nextElementSibling;
            if (nextSibling) {
                currentImage.classList.remove('active');
                nextSibling.classList.add('active');
            }
        };
        Events.prototype.createPopupWrapper = function () {
            var self = this;
            var body = document.body;
            var popupWrapper = this.etiedeken.element('div', ['portfolio-popup'], []);
            popupWrapper.id = 'portfolio_popup';
            var popupContainer = this.etiedeken.element('div', ['container'], []);
            var close = this.etiedeken.accessibleElement('button', ['portfolio-close'], [], [{ 'aria-label': 'Close' }, { 'type': 'button' }], '×');
            popupContainer.appendChild(close);
            close.addEventListener('click', function (e) {
                self.removePopup();
            });
            var prevNext = this.etiedeken.element('div', ['portfolio-prev-next'], []);
            var prevButton = this.etiedeken.accessibleElement('button', ['portfolio-prev'], [], [{ 'aria-label': 'Previous Image' }, { 'type': 'button' }], '‹');
            var nextButton = this.etiedeken.accessibleElement('button', ['portfolio-next'], [], [{ 'aria-label': 'Next Image' }, { 'type': 'button' }], '›');
            prevNext.appendChild(prevButton);
            prevNext.appendChild(nextButton);
            popupContainer.appendChild(prevNext);
            prevButton.addEventListener('click', function (e) {
                self.prevPortfolioImage();
            });
            nextButton.addEventListener('click', function (e) {
                self.nextPortfolioImage();
            });
            var images = this.etiedeken.element('div', ['portfolio-images'], []);
            popupContainer.appendChild(images);
            var slides = this.etiedeken.element('div', ['portfolio-slides'], []);
            popupContainer.appendChild(slides);
            var name = this.etiedeken.element('div', ['portfolio-name'], []);
            popupContainer.appendChild(name);
            var description = this.etiedeken.element('div', ['portfolio-description'], []);
            popupContainer.appendChild(description);
            popupWrapper.appendChild(popupContainer);
            body.appendChild(popupWrapper);
        };
        Events.prototype.populatePopup = function (dataDescription, dataName, dataSet) {
            dataSet.reverse();
            var popupWrapper = document.getElementById('portfolio_popup');
            var images = popupWrapper.getElementsByClassName('portfolio-images')[0];
            for (var i = dataSet.length; i > 0; --i) {
                var imageSet = this.etiedeken.image([], [], dataSet[i - 1], []);
                images.appendChild(imageSet);
            }
            images.firstChild.classList.add('active');
            var name = popupWrapper.getElementsByClassName('portfolio-name')[0];
            var nameText = this.etiedeken.element('h3', [], [], dataName);
            name.appendChild(nameText);
            var description = popupWrapper.getElementsByClassName('portfolio-description')[0];
            var descriptionText = this.etiedeken.element('p', [], [], dataDescription);
            description.appendChild(descriptionText);
            var focusable = popupWrapper.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
            focusable[0].focus();
        };
        Events.prototype.createPopup = function (dataDescription, dataName, dataSet) {
            this.createPopupWrapper();
            this.populatePopup(dataDescription, dataName, dataSet);
            this.openPadding();
        };
        Events.prototype.removePopup = function () {
            this.closePadding();
            var popupWrapper = document.getElementById('portfolio_popup');
            if (popupWrapper) {
                popupWrapper.parentElement.removeChild(popupWrapper);
                this.lastFocus.focus();
            }
        };
        Events.prototype.popup = function (dataDescription, dataName, dataSet) {
            this.removePopup();
            this.createPopup(dataDescription, dataName, dataSet);
        };
        Events.prototype.thumbEvent = function (item) {
            var self = this;
            item.addEventListener('click', function (e) {
                var dataDescription = item.getAttribute('data-description');
                var dataName = item.getAttribute('data-name');
                var dataSet = item.getAttribute('data-set').split(',');
                self.lastFocus = item;
                item.blur();
                self.popup(dataDescription, dataName, dataSet);
            });
        };
        Events.prototype.thumbClick = function () {
            var self = this;
            var items = document.querySelectorAll('.portfolio .portfolio-item:not(.loaded)');
            for (var i = items.length; i > 0; --i) {
                var item = items[i - 1];
                item.classList.add('loaded');
                self.thumbEvent(item);
            }
        };
        Events.prototype.windowBinding = function (e) {
            var popup = document.getElementById('portfolio_popup');
            if (popup) {
                if (e.keyCode === 27)
                    this.removePopup();
                if (e.keyCode === 9)
                    this.focus(e);
            }
        };
        Events.prototype.isPopupFocused = function (focusable, focused) {
            var isPopupFocused = false;
            for (var i = focusable.length; i > 0; --i) {
                if (focused == focusable[i - 1]) {
                    isPopupFocused = true;
                    break;
                }
            }
            return isPopupFocused;
        };
        Events.prototype.focus = function (e) {
            var popup = document.getElementById('portfolio_popup');
            var focusable = popup.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
            var firstFocusable = focusable[0];
            var lastFocusable = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable || !this.isPopupFocused(focusable, document.activeElement)) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            }
            else {
                if ((document.activeElement === lastFocusable) || !this.isPopupFocused(focusable, document.activeElement)) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };
        Events.prototype.window = function () {
            var self = this;
            window.addEventListener('keydown', function (e) {
                self.windowBinding(e);
            });
        };
        Events.prototype.loadClick = function () {
            var self = this;
            var button = document.getElementsByClassName('portfolio-btn')[0];
            button.addEventListener('click', function (e) {
                self.load(button);
            });
        };
        Events.prototype.init = function () {
            this.loadClick();
            this.thumbClick();
            this.window();
        };
        return Events;
    }());
    var events = new Events(window.etiedeken);
    events.init();
})(window, document);
