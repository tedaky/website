(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
            this.version = 'You are viewing this page developed using JavaScript ES6. Want more details? Take a look at Dev Tools.';
        }
        Setup.prototype.versions = function (versions) {
            var wrapper = this.etiedeken.element('li', ['item'], []);
            var link = this.etiedeken.link(['link', versions.link], [], [], versions.link, false);
            var image = this.etiedeken.image([], [], versions.image, versions.name);
            var span = this.etiedeken.element('span', ['h5'], [], versions.name);
            link.appendChild(image);
            link.appendChild(span);
            wrapper.appendChild(link);
            return wrapper;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var versionsWrapper = document.getElementById('versions');
            versionsWrapper.classList.add('versions-wrapper');
            var container = this.etiedeken.element('div', ['container'], []);
            var label = this.etiedeken.element('h2', ['text-center'], [], 'View this site in:');
            ajax.versions.reverse();
            var versionsContainer = this.etiedeken.element('ul', ['versions'], []);
            for (var i = ajax.versions.length; i > 0; --i)
                versionsContainer.appendChild(this.versions(ajax.versions[i - 1]));
            container.appendChild(label);
            container.appendChild(versionsContainer);
            var whichVersion = this.etiedeken.element('h3', ['text-center'], [], 'Which Version');
            var version = this.etiedeken.element('p', ['text-center'], [], this.version);
            container.appendChild(whichVersion);
            container.appendChild(version);
            versionsWrapper.appendChild(container);
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
        (window.etiedeken) ?
            window.requestAnimationFrame(function () {
                var load = new Setup(window.etiedeken);
                load.ajax('/javascripts/regular/versions/source.json');
            }) :
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
