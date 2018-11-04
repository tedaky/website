/* jshint esversion: 6 */
((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        setTime(time) {
            let container = this.etiedeken.element('p', ['time'], []);
            const start = this.etiedeken.element('span', [], [], time.start);
            const dash = this.etiedeken.element('span', [], [], ' - ');
            const end = this.etiedeken.element('span', [], [], time.end);
            container.appendChild(start);
            container.appendChild(dash);
            container.appendChild(end);
            return container;
        }

        setImage(src, alt, link) {
            let container = this.etiedeken.element('div', ['image'], []);
            let href = this.etiedeken.link([], [], [], link, true);
            const image = this.etiedeken.image([], [], src, alt);
            href.appendChild(image);
            container.appendChild(href);
            return container;
        }

        setPosition(position) {
            return this.etiedeken.element('p', ['position'], [], position);
        }

        setDescription(description) {
            return this.etiedeken.element('p', ['description'], [], description);
        }

        fulfiller(ajax) {
            let experienceElement = document.getElementById('experience');

            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);

            const label = this.etiedeken.element('h2', ['text-center'], [], 'Experience');
            let company = this.etiedeken.element('ul', ['experience'], []);

            ajax.experience.reverse();

            for (let i = ajax.experience.length; i > 0; --i) {
                const experience = ajax.experience[i-1];
                let companyElement = this.etiedeken.element('li', ['company'], []);
                let group = this.etiedeken.element('div', ['group'], []);
                const time = this.setTime(experience.time);
                const image = this.setImage(experience.image, experience.company, experience.link);
                const position = this.setPosition(experience.position);
                const description = this.setDescription(experience.description);
                group.appendChild(image);
                group.appendChild(position);
                group.appendChild(time);
                group.appendChild(description);
                companyElement.appendChild(group);
                company.appendChild(companyElement);
            }

            container.appendChild(label);
            container.appendChild(company);

            experienceElement.appendChild(container);
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }
    }

    const check = (window) => {
        if (window.etiedeken)
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/experience/source.json');
            });
        else
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
