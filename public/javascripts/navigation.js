((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        navHome(item) {
            let home = this.etiedeken.element('ul', ['nav'], []);

            let nav = this.etiedeken.element('li', ['nav-item'], []);
            let text = this.etiedeken.element('span', [], [], item.name);
            let link = this.etiedeken.link(['nav-click'], [], [], item.link, false);

            let logo = this.etiedeken.image([], [], item.image, item.name);
            link.appendChild(logo);
            link.appendChild(text);

            nav.appendChild(link);

            home.appendChild(nav);

            let button = this.etiedeken.element('li', ['nav-item'], []);
            let icon = this.etiedeken.accessibleElement('button', [], [], [{'aria-label': item.buttonText}, {'aria-controls': 'navbar'}, {'aria-expanded': 'false'}]);
            let iconOpen = this.etiedeken.element('span', [], [], item.buttonIconOpen);
            let iconclose = this.etiedeken.element('span', [], [], item.buttonIconClose);
            icon.appendChild(iconOpen);
            icon.appendChild(iconclose);
            button.appendChild(icon);

            home.appendChild(button);

            return home;
        }

        navItem(item, link) {
            let nav = this.etiedeken.element('li', ['nav-item'], []);
            let text = (link) ?
                this.etiedeken.link(['nav-click'], [], item.name, item.link, false) :
                this.etiedeken.element('a', ['nav-click'], [], item.name);

            nav.appendChild(text);

            return nav;
        }

        navigating(home, nav) {
            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            let homeWrapper = this.navHome(home);

            let navWrapper = this.etiedeken.element('ul', ['nav'], []);
            navWrapper.id = 'navbar';

            for (let i = nav.length; i > 0; --i) {
                let curItem;
                if (nav[i-1].nest) {
                    curItem = this.navItem(nav[i-1], false);
                    nav[i-1].nest.reverse();
                    let nestWrapper = this.etiedeken.element('ul', ['nav'], []);

                    for (let y = nav[i-1].nest.length; y > 0; --y) {
                        let curNestItem = this.navItem(nav[i-1].nest[y-1], true);
                        nestWrapper.appendChild(curNestItem);
                    }
                    curItem.appendChild(nestWrapper);
                } else {
                    curItem = this.navItem(nav[i-1], true);
                }
                navWrapper.appendChild(curItem);
            }

            container.appendChild(homeWrapper);
            container.appendChild(navWrapper);

            return container;
        }

        fulfiller(ajax) {
            let navigationWrapper = document.getElementById('navigation');
            navigationWrapper.classList.add('navigation');

            let closeElement = this.etiedeken.element('div', ['close-navigation'], []);
            navigationWrapper.parentNode.insertBefore(closeElement, navigationWrapper.nextSibling);

            ajax.navigation.reverse();

            navigationWrapper.appendChild(this.navigating(ajax.home, ajax.navigation));
            window.load.downloadjs('/javascripts/navigation_events');
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }

        style(style) {
            this.etiedeken.loadDeferredStyles(style);
        }
    }

    const check = (window) => {
        (window.etiedeken) ?
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/navigation.json');
                load.style('/stylesheets/navigation.css');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
