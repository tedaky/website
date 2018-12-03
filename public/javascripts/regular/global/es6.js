/* jshint esversion: 6 */
(function (window, document) {
    var Loader = /** @class */ (function () {
        function Loader(jsfiles, cssfiles) {
            this.jsfiles = jsfiles;
            this.cssfiles = cssfiles;
        }
        Loader.prototype.downloadjs = function (script) {
            var element = document.createElement('script');
            element.src = script + '.js';
            element.async = true;
            document.body.appendChild(element);
        };
        Loader.prototype.loadjs = function (i) {
            var _this = this;
            if (i < this.jsfiles.length) {
                this.downloadjs(this.jsfiles[i]);
                window.requestAnimationFrame(function () {
                    _this.loadjs(++i);
                });
            }
        };
        Loader.prototype.downloadstyles = function (style) {
            var element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = style + '.css';
            document.head.appendChild(element);
        };
        Loader.prototype.loadcss = function (i) {
            var _this = this;
            if (i < this.cssfiles.length) {
                this.downloadstyles(this.cssfiles[i]);
                window.requestAnimationFrame(function () {
                    _this.loadcss(++i);
                });
            }
        };
        Loader.prototype.load = function () {
            var outOfDate = document.getElementById('out-of-date');
            document.body.removeChild(outOfDate);
            this.loadjs(0);
            this.loadcss(0);
        };
        return Loader;
    }());
    var jsfiles = [
        '/javascripts/regular/global/script',
        // '/javascripts/regular/navigation/script',
        // '/javascripts/regular/about/script',
        // '/javascripts/regular/versions/script',
        // '/javascripts/regular/skills/script',
        // '/javascripts/regular/experience/script',
        // '/javascripts/regular/portfolio/script',
        // '/javascripts/regular/education/script',
        // '/javascripts/regular/social/script'


        '/javascripts/regular/navigation/events',
        '/javascripts/regular/skills/events',
        '/javascripts/regular/portfolio/events'
    ];
    var cssfiles = [
        // '/stylesheets/global/styles',
        // '/stylesheets/navigation/styles',
        // '/stylesheets/about/styles',
        // '/stylesheets/versions/styles',
        // '/stylesheets/skills/styles',
        // '/stylesheets/experience/styles',
        // '/stylesheets/portfolio/styles',
        // '/stylesheets/education/styles',
        // '/stylesheets/social/styles',
        // '/stylesheets/background/styles',
        // '/stylesheets/sphere/styles'
    ];
    window.requestAnimationFrame(function () {
        var load = window.load = new Loader(jsfiles, cssfiles);
        window.addEventListener('DOMContentLoaded', load.load(), false);
    });
})(window, document);
