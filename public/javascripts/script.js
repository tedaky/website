((window, document) => {
    let etiedeken = window.etiedeken = {

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
                if (this.readyState == 4 && this.status == 200) {
                    callback.call(JSON.parse(this.responseText));
                }
            }
            xhttp.open(method, url, true);
            xhttp.send();
    
            return xhttp;
        },

        element(element, classlist, stylelist) {
            let elem = document.createElement(element);
            let classnames = classlist;

            for (let i = classlist.length; i > 0; --i) {
                elem.classList.add(classlist[i-1]);
            }

            for (let x = stylelist.length; x > 0; --x) {
                for (let style in stylelist[x-1]) {
                    elem.style[style] = stylelist[x-1][style];
                }
            }

            return elem;
        },

        textElement(element, classlist, stylelist, text) {
            let elem = etiedeken.element(element, classlist, stylelist);
            elem.appendChild(document.createTextNode(text));

            return elem;
        },

        link(classlist, stylelist, text, href, target) {
            let elem;
            if (text.length) {
                elem = etiedeken.textElement('a', classlist, stylelist, text);
            } else {
                elem = etiedeken.element('a', classlist, stylelist);
            }
            elem.href = href;

            if (target) {
                elem.target = '_blank';
            }

            return elem;
        },

        image(classlist, stylelist, src, alt) {
            let elem = etiedeken.element('img', classlist, stylelist);
            elem.src = src;
            elem.alt = alt;

            return elem;
        },

        loadDeferredStyles(source) {
            let replacement = document.createElement('link');
            replacement.setAttribute('rel', 'stylesheet');
            replacement.setAttribute('href', source);
            document.head.appendChild(replacement);
        }
    };
})(window, document);
