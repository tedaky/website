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

            return home;
        }

        navItem(item) {
            let nav = this.etiedeken.element('li', ['nav-item'], []);
            let text = this.etiedeken.link(['nav-click'], [], item.name, item.link, false);

            nav.appendChild(text);

            return nav;
        }

        navigating(home, nav) {
            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            let homeWrapper = this.navHome(home);

            let navWrapper = this.etiedeken.element('ul', ['nav'], []);

            for (let i = nav.length; i > 0; --i) {
                let curItem = this.navItem(nav[i-1]);
                if (nav[i-1].nest) {
                    nav[i-1].nest.reverse();
                    let nestWrapper = this.etiedeken.element('ul', ['nav'], []);

                    for (let y = nav[i-1].nest.length; y > 0; --y) {
                        let curNestItem = this.navItem(nav[i-1].nest[y-1]);
                        nestWrapper.appendChild(curNestItem);
                    }
                    curItem.appendChild(nestWrapper);
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

            ajax.navigation.reverse();

            navigationWrapper.appendChild(this.navigating(ajax.home, ajax.navigation));
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
        if (window.etiedeken) {
            let etiedeken = window.etiedeken;
            window.requestAnimationFrame(() => {
                let load = new Setup(etiedeken);
                load.ajax('/javascripts/navigation.json');
                load.style('/stylesheets/navigation.css');
            });
        } else {
            window.requestAnimationFrame(() => {
                check(window);
            });
        }
    }

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
