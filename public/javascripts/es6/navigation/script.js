/* jshint esversion: 6 */
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
            let icon = this.etiedeken.accessibleElement('button', [], [], [{'aria-label': item.buttonText}, {'aria-controls': 'navbar'}, {'aria-expanded': 'false'}, {'type': 'button'}]);
            let iconOpen = this.etiedeken.element('span', [], [], []);
            let iconclose = this.etiedeken.element('span', [], [], item.buttonIconClose);
            icon.appendChild(iconOpen);
            icon.appendChild(iconclose);
            button.appendChild(icon);

            home.appendChild(button);

            return home;
        }

        navItem(item, hasChildren) {
            let nav = this.etiedeken.element('li', ['nav-item'], []);
            
            let text = hasChildren ?
                this.etiedeken.element('button', ['nav-click'], [], item.name) :
                this.etiedeken.link(['nav-click'], [], item.name, item.link, false);

            nav.appendChild(text);

            return nav;
        }

        navigating(home, nav) {
            let container = this.etiedeken.element('nav', ['container', 'no-bg'], []);

            let homeWrapper = this.navHome(home);

            let navWrapper = this.etiedeken.element('ul', ['nav'], []);
            navWrapper.id = 'navbar';

            for (let i = nav.length; i > 0; --i) {
                let curItem;
                if (nav[i-1].nest) {
                    curItem = this.navItem(nav[i-1], true);
                    curItem.classList.add('sub-nav');
                    curItem.firstChild.id = 'subnav' + (i - 1);
                    curItem.firstChild.setAttribute('aria-haspopup', 'true');
                    curItem.firstChild.setAttribute('aria-expanded', 'false');
                    curItem.firstChild.setAttribute('type', 'button');

                    nav[i-1].nest.reverse();
                    let nestWrapper = this.etiedeken.accessibleElement('ul', ['nav'], [], [{'aria-labelledby': 'subnav' + (i - 1)}]);

                    for (let y = nav[i-1].nest.length; y > 0; --y) {
                        let curNestItem = this.navItem(nav[i-1].nest[y-1]);
                        nestWrapper.appendChild(curNestItem);
                    }
                    curItem.appendChild(nestWrapper);
                } else {
                    curItem = this.navItem(nav[i-1]);
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
            window.load.downloadjs('/javascripts/es6/navigation/events');
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }
    }

    const check = (window) => {
        if (window.etiedeken)
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/navigation/source.json');
            });
        else
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
