((window, document) => {
    class Tiedeken {
        constructor () {}

        ajax(method, url, callback) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
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
            }
            xhttp.open(method, url, true);
            xhttp.send();

            return xhttp;
        }

        accessibleElement(element, classlist, stylelist, arialist, text) {
            let elem = etiedeken.element(element, classlist, stylelist, text);

            for (let i = arialist.length; i > 0; --i)
                for (let aria in arialist[i-1])
                    elem.setAttribute(aria, arialist[i-1][aria]);

            return elem;
        }

        classElement(element, classlist) {
            let elem = element;

            for (let i = classlist.length; i > 0; --i)
                elem.classList.add(classlist[i-1]);

            return elem;
        }

        styleElement(element, stylelist) {
            let elem = element;

            for (let x = stylelist.length; x > 0; --x)
                for (let style in stylelist[x-1])
                    elem.style[style] = stylelist[x-1][style];

            return elem;
        }

        textElement(element, text) {
            let elem = element;

            elem.appendChild(document.createTextNode(text));

            return elem;
        }

        element(element, classlist, stylelist, text) {
            let elem = document.createElement(element);

            if (classlist.length)
                elem = this.classElement(elem, classlist);

            if (stylelist.length)
                elem = this.styleElement(elem, stylelist);

            if (text)
                elem = this.textElement(elem, text);

            return elem;
        }

        link(classlist, stylelist, text, href, target) {
            let elem = etiedeken.element('a', classlist, stylelist, text);
            elem.href = href;

            if (target)
                elem.target = '_blank';

            return elem;
        }

        image(classlist, stylelist, src, alt) {
            let elem = etiedeken.element('img', classlist, stylelist);
            elem.src = src;
            elem.alt = alt;

            return elem;
        }

        loadDeferredStyles(source) {
            let replacement = document.createElement('link');
            replacement.setAttribute('rel', 'stylesheet');
            replacement.setAttribute('href', source);
            document.head.appendChild(replacement);
        }
    }
    let etiedeken = window.etiedeken = new Tiedeken();
})(window, document);
