((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        const versions = (versions) => {
            let wrapper = etiedeken.element('li', ['item'], []);
            let link = etiedeken.link(['link', versions.link], [], [], versions.link, false);

            const image = etiedeken.image([], [], '/images/' + versions.image, versions.name);
            const span = etiedeken.textElement('span', ['h5'], [], versions.name);

            link.appendChild(image);
            link.appendChild(span);
            wrapper.appendChild(link);

            return wrapper;
        };

        etiedeken.ajax('GET', '/javascripts/versions.json', function() {
            let versionsWrapper = document.getElementById('versions');
            versionsWrapper.classList.add('versions-wrapper');

            let container = etiedeken.element('div', ['container'], []);

            const label = etiedeken.textElement('h2', ['text-center'], [], 'View this site in:');

            this.versions.reverse();

            let versionsContainer = etiedeken.element('ul', ['versions'], []);

            for (let i = this.versions.length; i > 0; --i) {
                versionsContainer.appendChild(versions(this.versions[i-1]));
            }
            container.appendChild(label);
            container.appendChild(versionsContainer);
            versionsWrapper.appendChild(container);
        });

        etiedeken.loadDeferredStyles('/stylesheets/versions.css');
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
