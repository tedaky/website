(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.navHome = function (item) {
            var home = this.etiedeken.element('ul', ['nav'], []);
            var nav = this.etiedeken.element('li', ['nav-item'], []);
            var text = this.etiedeken.element('span', [], [], item.name);
            var link = this.etiedeken.link(['nav-click'], [], [], item.link, false);
            var logo = this.etiedeken.image([], [], item.image, item.name);
            link.appendChild(logo);
            link.appendChild(text);
            nav.appendChild(link);
            home.appendChild(nav);
            var button = this.etiedeken.element('li', ['nav-item'], []);
            var icon = this.etiedeken.accessibleElement('button', [], [], [{ 'aria-label': item.buttonText }, { 'aria-controls': 'navbar' }, { 'aria-expanded': 'false' }]);
            var iconOpen = this.etiedeken.element('span', [], [], []);
            var iconclose = this.etiedeken.element('span', [], [], item.buttonIconClose);
            icon.appendChild(iconOpen);
            icon.appendChild(iconclose);
            button.appendChild(icon);
            home.appendChild(button);
            return home;
        };
        Setup.prototype.navItem = function (item) {
            var nav = this.etiedeken.element('li', ['nav-item'], []);
            var text = this.etiedeken.link(['nav-click'], [], item.name, item.link, false);
            nav.appendChild(text);
            return nav;
        };
        Setup.prototype.navigating = function (home, nav) {
            var container = this.etiedeken.element('nav', ['container', 'no-bg'], []);
            var homeWrapper = this.navHome(home);
            var navWrapper = this.etiedeken.element('ul', ['nav'], []);
            navWrapper.id = 'navbar';
            for (var i = nav.length; i > 0; --i) {
                var curItem = void 0;
                if (nav[i - 1].nest) {
                    curItem = this.navItem(nav[i - 1]);
                    curItem.classList.add('sub-nav');
                    curItem.firstChild.id = 'subnav' + (i - 1);
                    curItem.firstChild.setAttribute('aria-haspopup', 'true');
                    curItem.firstChild.setAttribute('aria-expanded', 'false');
                    curItem.firstChild.setAttribute('role', 'button');
                    nav[i - 1].nest.reverse();
                    var nestWrapper = this.etiedeken.accessibleElement('ul', ['nav'], [], [{ 'aria-labelledby': 'subnav' + (i - 1) }]);
                    for (var y = nav[i - 1].nest.length; y > 0; --y) {
                        var curNestItem = this.navItem(nav[i - 1].nest[y - 1]);
                        nestWrapper.appendChild(curNestItem);
                    }
                    curItem.appendChild(nestWrapper);
                }
                else {
                    curItem = this.navItem(nav[i - 1]);
                }
                navWrapper.appendChild(curItem);
            }
            container.appendChild(homeWrapper);
            container.appendChild(navWrapper);
            return container;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var navigationWrapper = document.getElementById('navigation');
            navigationWrapper.classList.add('navigation');
            var closeElement = this.etiedeken.element('div', ['close-navigation'], []);
            navigationWrapper.parentNode.insertBefore(closeElement, navigationWrapper.nextSibling);
            ajax.navigation.reverse();
            navigationWrapper.appendChild(this.navigating(ajax.home, ajax.navigation));
            window.load.downloadjs('/javascripts/regular/navigation/events');
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
                load.ajax('/javascripts/regular/navigation/source.json');
            }) :
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
