((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        fulfiller(ajax) {
            let portfolioWrapper = document.getElementById('portfolio');
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
                load.ajax('/javascripts/portfolio/source.json');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
