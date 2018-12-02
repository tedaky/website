/* jshint esversion: 6 */
((window, document) => {
    class Loader {
        constructor(jsfiles, cssfiles) {
            this.jsfiles = jsfiles;
            this.cssfiles = cssfiles;
        }

        downloadjs(script) {
            let element = document.createElement('script');
            element.src = script + '.js';
            element.async = true;
            document.body.appendChild(element);
        }

        loadjs(i) {
            if (i < this.jsfiles.length) {
                this.downloadjs(this.jsfiles[i]);
                window.requestAnimationFrame(() => {
                    this.loadjs(++i);
                });
            }
        }

        downloadstyles(style) {
            let element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = style + '.css';
            document.head.appendChild(element);
        }

        loadcss(i) {
            if (i < this.cssfiles.length) {
                this.downloadstyles(this.cssfiles[i]);
                window.requestAnimationFrame(() => {
                    this.loadcss(++i);
                });
            }
        }

        load() {
            let outOfDate = document.getElementById('out-of-date');
            document.body.removeChild(outOfDate);
            this.loadjs(0);
            this.loadcss(0);
        }
    }

    const jsfiles = [
        '/javascripts/es6/global/script',
        // '/javascripts/es6/navigation/script',
        // '/javascripts/es6/about/script',
        // '/javascripts/es6/versions/script',
        // '/javascripts/es6/skills/script',
        // '/javascripts/es6/experience/script',
        '/javascripts/es6/portfolio/script',
        '/javascripts/es6/education/script',
        // '/javascripts/es6/social/script'


        '/javascripts/es6/navigation/events',
        '/javascripts/es6/skills/events'
    ];

    const cssfiles = [
        '/stylesheets/global/styles',
        '/stylesheets/navigation/styles',
        '/stylesheets/about/styles',
        '/stylesheets/versions/styles',
        '/stylesheets/skills/styles',
        '/stylesheets/experience/styles',
        '/stylesheets/portfolio/styles',
        '/stylesheets/education/styles',
        '/stylesheets/social/styles',

        '/stylesheets/background/styles',
        '/stylesheets/sphere/styles'
    ];

    window.requestAnimationFrame(() => {
        let load = window.load = new Loader(jsfiles, cssfiles);
        window.addEventListener('DOMContentLoaded', load.load(), false);
    });
})(window, document);
