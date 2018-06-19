((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        const social = (social) => {
            let wrapper = etiedeken.element('li', ['item'], []);
            let link = etiedeken.link(['link'], [], '', social.link, true);

            let image = etiedeken.image(['image'], [], social.base64, social.name);

            link.appendChild(image);

            wrapper.appendChild(link);

            return wrapper;
        };

        etiedeken.ajax('GET', '/javascripts/social.json', function() {
            let socialWrapper = document.getElementById('social');
            socialWrapper.classList.add('social-wrapper');

            let container = etiedeken.element('div', ['container'], []);

            this.social.reverse();
            
            let socialContainer = etiedeken.element('ul', ['social'], []);

            for (let i = this.social.length; i > 0; --i) {
                socialContainer.appendChild(social(this.social[i-1]));
            }
            container.appendChild(socialContainer);
            socialWrapper.appendChild(container);
        });
        
        etiedeken.loadDeferredStyles('/stylesheets/social.css');
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
