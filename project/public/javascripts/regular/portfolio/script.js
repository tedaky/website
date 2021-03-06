/* jshint esversion: 6 */
(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.setImage = function (ajax) {
            var container = this.etiedeken.accessibleElement('button', ['category-' + ajax.category.toLowerCase(), 'portfolio-item'], [{ 'backgroundImage': 'url(' + ajax.cover + ')' }], [{ 'aria-label': ajax.name }, { 'data-set': [ajax.set] }, { 'data-description': ajax.description }, { 'data-name': ajax.name }, { 'type': 'button' }], []);
            return container;
        };
        Setup.prototype.more = function (next) {
            var container = this.etiedeken.element('div', ['text-center'], []);
            var button = this.etiedeken.accessibleElement('button', ['portfolio-btn'], [], [{ 'type': 'button' }, { 'data-next': next }], '+');
            container.appendChild(button);
            return container;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var portfolioWrapper = document.getElementById('portfolio');
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var label = this.etiedeken.element('h2', ['text-center'], [], 'Portfolio');
            var items = this.etiedeken.element('div', ['portfolio'], []);
            ajax.portfolio.reverse();
            for (var i = ajax.portfolio.length; i > 0; --i) {
                var item = this.setImage(ajax.portfolio[i - 1]);
                items.appendChild(item);
            }
            var button = this.more(ajax.next);
            container.appendChild(label);
            container.appendChild(items);
            container.appendChild(button);
            portfolioWrapper.appendChild(container);
            window.load.downloadjs('/javascripts/regular/portfolio/events');
        };
        Setup.prototype.ajax = function (ajax) {
            var self = this;
            this.etiedeken.ajax('GET', ajax, function () {
                self.fulfiller(this);
            });
        };
        return Setup;
    }());
    var check = function (window) {
        if (window.etiedeken)
            window.requestAnimationFrame(function () {
                var load = new Setup(window.etiedeken);
                load.ajax('/api/portfolio/getCollection/?collection=1');
            });
        else
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
