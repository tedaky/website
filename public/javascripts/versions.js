((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        versions(versions) {
            let wrapper = this.etiedeken.element('li', ['item'], []);
            let link = this.etiedeken.link(['link', versions.link], [], [], versions.link, false);

            const image = this.etiedeken.image([], [], '/images/' + versions.image, versions.name);
            const span = this.etiedeken.element('span', ['h5'], [], versions.name);

            link.appendChild(image);
            link.appendChild(span);
            wrapper.appendChild(link);

            return wrapper;
        }

        fulfiller(ajax) {
            let versionsWrapper = document.getElementById('versions');
            versionsWrapper.classList.add('versions-wrapper');

            let container = this.etiedeken.element('div', ['container'], []);

            const label = this.etiedeken.element('h2', ['text-center'], [], 'View this site in:');

            ajax.versions.reverse();

            let versionsContainer = this.etiedeken.element('ul', ['versions'], []);

            for (let i = ajax.versions.length; i > 0; --i)
                versionsContainer.appendChild(this.versions(ajax.versions[i-1]));

            container.appendChild(label);
            container.appendChild(versionsContainer);
            versionsWrapper.appendChild(container);
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
                load.ajax('/javascripts/versions.json');
                load.style('/stylesheets/versions.css');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
