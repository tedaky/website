((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
            this.version = 'You are viewing this page developed using JavaScript ES6. Want more details? Take a look at Dev Tools.';
        }

        versions(versions) {
            let wrapper = this.etiedeken.element('li', ['item'], []);
            let link = this.etiedeken.link(['link', versions.link], [], [], versions.link, false);

            const image = this.etiedeken.image([], [], versions.image, versions.name);
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
            
            const whichVersion = this.etiedeken.element('h3', ['text-center'], [], 'Which Version');
            const version = this.etiedeken.element('p', ['text-center'], [], this.version);

            container.appendChild(whichVersion);
            container.appendChild(version);

            versionsWrapper.appendChild(container);
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }
    }

    const check = (window) => {
        (window.etiedeken) ?
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/es6/versions/source.json');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
