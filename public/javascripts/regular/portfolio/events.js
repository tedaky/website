(function (window, document) {
    var Events = /** @class */ (function () {
        function Events(etiedeken) {
            this.etiedeken = etiedeken;
            this.timeout = undefined;
            this.time = 350;
        }
        Events.prototype.setImage = function (ajax) {
            var container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase()], [{ 'backgroundImage': 'url(' + ajax.cover + ')' }], [{ 'aria-label': ajax.name }, { 'data-set': [ajax.set] }], []);
            container.description = ajax.description;
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
            var portfolio = document.querySelector('.portfolio');
            var tempHeight = this.getHeight(portfolio);
            if (next > 0)
                this.etiedeken.ajax('GET', '/javascripts/es6/portfolio/source.' + next + '.json', function () {
                    button.setAttribute('data-next', this.next);
                    self.append(this.portfolio);
                    self.thumbClick();
                    var newHeight = self.getHeight(portfolio);
                    portfolio.style.height = tempHeight + 'px';
                    var animateHeight = self.getHeight(portfolio);
                    portfolio.classList.add('animating');
                    portfolio.style.height = newHeight + 'px';
                    self.timeout = setTimeout(self.removeAnimation, self.time, portfolio, button, self);
                    if (this.next == 0)
                        button.classList.add('remove');
                });
        };
        Events.prototype.thumbClick = function () {
            var self = this;
            var items = document.querySelectorAll('.portfolio li:not(.loaded)');
            for (var i = items.length; i > 0; --i) {
                var item = items[i - 1];
                item.classList.add('loaded');
                item.addEventListener('click', function (e) {
                });
            }
        };
        Events.prototype.loadClick = function () {
            var self = this;
            var button = document.querySelector('.portfolio-btn');
            button.addEventListener('click', function (e) {
                self.load(button);
            });
        };
        Events.prototype.init = function () {
            this.loadClick();
            this.thumbClick();
        };
        return Events;
    }());
    var events = new Events(window.etiedeken);
    events.init();
})(window, document);
