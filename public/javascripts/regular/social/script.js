(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.social = function (social) {
            var wrapper = this.etiedeken.element('li', ['item'], []);
            var link = this.etiedeken.link(['link'], [], '', social.link, true);
            var image = this.etiedeken.image(['image'], [], social.base64, social.name);
            link.appendChild(image);
            wrapper.appendChild(link);
            return wrapper;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var socialWrapper = document.getElementById('social');
            socialWrapper.classList.add('social-wrapper');
            var container = this.etiedeken.element('div', ['container'], []);
            ajax.social.reverse();
            var socialContainer = this.etiedeken.element('ul', ['social'], []);
            for (var i = ajax.social.length; i > 0; --i)
                socialContainer.appendChild(this.social(ajax.social[i - 1]));
            container.appendChild(socialContainer);
            socialWrapper.appendChild(container);
        };
        Setup.prototype.ajax = function (ajax) {
            var self = this;
            this.etiedeken.ajax('GET', ajax, function () {
                self.fulfiller(this);
            });
        };
        return Setup;
    }());
    var callEtiedeken = function (window) {
        if (window.etiedeken)
            window.requestAnimationFrame(function () {
                var load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/social/source.json');
            });
        else
            window.requestAnimationFrame(function () {
                callEtiedeken(window);
            });
    };
    window.requestAnimationFrame(function () {
        callEtiedeken(window);
    });
})(window, document);
