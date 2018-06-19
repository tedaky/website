((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        const navItem = (item) => {
            let nav = etiedeken.element('li', ['nav-item'], []);
            let text = etiedeken.link(['nav-click'], [], item.name, item.link, false);

            nav.appendChild(text);

            return nav;
        };

        const navigation = (nav) => {
            let container = etiedeken.element('div', ['container', 'no-bg'], []);

            let mainWrapper = etiedeken.element('ul', ['nav'], []);

            for (let i = nav.length; i > 0; --i) {
                let curItem = navItem(nav[i-1]);
                if (nav[i-1].nest) {
                    nav[i-1].nest.reverse();
                    let nestWrapper = etiedeken.element('ul', ['nav'], []);
                    
                    for (let y = nav[i-1].nest.length; y > 0; --y) {
                        let curNestItem = navItem(nav[i-1].nest[y-1]);
                        nestWrapper.appendChild(curNestItem);
                    }
                    curItem.appendChild(nestWrapper);
                }
                mainWrapper.appendChild(curItem);
            }

            container.appendChild(mainWrapper);

            return container;
        };

        etiedeken.ajax('GET', '/javascripts/navigation.json', function() {
            let navigationWrapper = document.getElementById('navigation');
            navigationWrapper.classList.add('navigation');

            this.navigation.reverse();
            navigationWrapper.appendChild(navigation(this.navigation));
        });
        
        etiedeken.loadDeferredStyles('/stylesheets/navigation.css');
    };

    const callEtiedeken = (window) => {
        if (window.etiedeken) {
            let etiedeken = window.etiedeken;
            window.requestAnimationFrame(() => {
                setUpEtiedeken(etiedeken);
            });
        } else {
            window.requestAnimationFrame(() => {
                callEtiedeken(window);
            });
        }
    }

    window.requestAnimationFrame(() => {
        callEtiedeken(window);
    });
})(window, document);
