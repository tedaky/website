((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }
        fulfiller(ajax) {
            let experienceElement = document.getElementById('experience');

            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            ajax.experience.reverse();
            for (let i = ajax.experience.length; i > 0; --i)
                container.appendChild(this.etiedeken.image([], [], ajax.experience[i-1].image, ajax.experience[i-1].company));

            experienceElement.appendChild(container);
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
                load.ajax('/javascripts/experience/source.json');
                load.style('/stylesheets/experience/styles.css');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
