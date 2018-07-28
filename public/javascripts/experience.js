((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }
        fulfiller(ajax) {
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
                load.ajax('/javascripts/experience.json');
                load.style('/stylesheets/experience.css');
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
