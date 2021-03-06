/* jshint esversion: 6 */
((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        social(social) {
            let wrapper = this.etiedeken.element('li', ['item'], []);
            let link = this.etiedeken.link(['link'], [], '', social.link, true);

            const image = this.etiedeken.image(['image'], [], social.base64, social.name);

            link.appendChild(image);

            wrapper.appendChild(link);

            return wrapper;
        }

        fulfiller(ajax) {
            let socialWrapper = document.getElementById('social');
            socialWrapper.classList.add('social-wrapper');

            let container = this.etiedeken.element('div', ['container'], []);

            ajax.social.reverse();

            let socialContainer = this.etiedeken.element('ul', ['social'], []);

            for (let i = ajax.social.length; i > 0; --i)
                socialContainer.appendChild(this.social(ajax.social[i-1]));

            container.appendChild(socialContainer);
            socialWrapper.appendChild(container);
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }
    }

    const callEtiedeken = (window) => {
        if (window.etiedeken)
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/social/source.json');
            });
        else
            window.requestAnimationFrame(() => {
                callEtiedeken(window);
            });
    };

    window.requestAnimationFrame(() => {
        callEtiedeken(window);
    });
})(window, document);
