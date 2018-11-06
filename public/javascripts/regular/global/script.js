/* jshint esversion: 6 */
(function (window, document) {
    var Tiedeken = /** @class */ (function () {
        function Tiedeken() {
        }
        Tiedeken.prototype.ajax = function (method, url, callback) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // if (this.readyState == 1) {
                //     console.log('server connection established ' + new Date());
                // }
                // if (this.readyState == 2) {
                //     console.log('request received ' + new Date());
                // }
                // if (this.readyState == 3) {
                //     console.log('processing request ' + new Date());
                // }
                if (this.readyState == 4 && this.status == 200)
                    callback.call(JSON.parse(this.responseText));
            };
            xhttp.open(method, url, true);
            xhttp.send();
            return xhttp;
        };
        Tiedeken.prototype.accessibleElement = function (element, classlist, stylelist, arialist, text) {
            var elem = etiedeken.element(element, classlist, stylelist, text);
            for (var i = arialist.length; i > 0; --i)
                for (var aria in arialist[i - 1])
                    elem.setAttribute(aria, arialist[i - 1][aria]);
            return elem;
        };
        Tiedeken.prototype.classElement = function (element, classlist) {
            var elem = element;
            for (var i = classlist.length; i > 0; --i)
                elem.classList.add(classlist[i - 1]);
            return elem;
        };
        Tiedeken.prototype.styleElement = function (element, stylelist) {
            var elem = element;
            for (var x = stylelist.length; x > 0; --x)
                for (var style in stylelist[x - 1])
                    elem.style[style] = stylelist[x - 1][style];
            return elem;
        };
        Tiedeken.prototype.textElement = function (element, text) {
            var elem = element;
            elem.appendChild(document.createTextNode(text));
            return elem;
        };
        Tiedeken.prototype.element = function (element, classlist, stylelist, text) {
            var elem = document.createElement(element);
            if (classlist.length)
                elem = this.classElement(elem, classlist);
            if (stylelist.length)
                elem = this.styleElement(elem, stylelist);
            if (text)
                elem = this.textElement(elem, text);
            return elem;
        };
        Tiedeken.prototype.link = function (classlist, stylelist, text, href, target) {
            var elem = etiedeken.element('a', classlist, stylelist, text);
            elem.href = href;
            if (target)
                elem.target = '_blank';
            return elem;
        };
        Tiedeken.prototype.image = function (classlist, stylelist, src, alt) {
            var elem = etiedeken.element('img', classlist, stylelist);
            elem.src = src;
            elem.alt = alt;
            return elem;
        };
        Tiedeken.prototype.loadDeferredStyles = function (source) {
            var replacement = document.createElement('link');
            replacement.setAttribute('rel', 'stylesheet');
            replacement.setAttribute('href', source);
            document.head.appendChild(replacement);
        };
        return Tiedeken;
    }());
    var etiedeken = window.etiedeken = new Tiedeken();
})(window, document);
