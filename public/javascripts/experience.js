((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        etiedeken.ajax('GET', '/javascripts/experience.json', function() {
        });
        
        etiedeken.loadDeferredStyles('/stylesheets/experience.css');
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
