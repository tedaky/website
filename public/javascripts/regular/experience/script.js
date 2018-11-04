(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.setTime = function (time) {
            var container = this.etiedeken.element('p', ['time'], []);
            var start = this.etiedeken.element('span', [], [], time.start);
            var dash = this.etiedeken.element('span', [], [], ' - ');
            var end = this.etiedeken.element('span', [], [], time.end);
            container.appendChild(start);
            container.appendChild(dash);
            container.appendChild(end);
            return container;
        };
        Setup.prototype.setImage = function (src, alt, link) {
            var container = this.etiedeken.element('div', ['image'], []);
            var href = this.etiedeken.link([], [], [], link, true);
            var image = this.etiedeken.image([], [], src, alt);
            href.appendChild(image);
            container.appendChild(href);
            return container;
        };
        Setup.prototype.setPosition = function (position) {
            return this.etiedeken.element('p', ['position'], [], position);
        };
        Setup.prototype.setDescription = function (description) {
            return this.etiedeken.element('p', ['description'], [], description);
        };
        Setup.prototype.fulfiller = function (ajax) {
            var experienceElement = document.getElementById('experience');
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var label = this.etiedeken.element('h2', ['text-center'], [], 'Experience');
            var company = this.etiedeken.element('ul', ['experience'], []);
            ajax.experience.reverse();
            for (var i = ajax.experience.length; i > 0; --i) {
                var experience = ajax.experience[i - 1];
                var companyElement = this.etiedeken.element('li', ['company'], []);
                var group = this.etiedeken.element('div', ['group'], []);
                var time = this.setTime(experience.time);
                var image = this.setImage(experience.image, experience.company, experience.link);
                var position = this.setPosition(experience.position);
                var description = this.setDescription(experience.description);
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
        };
        Setup.prototype.ajax = function (ajax) {
            var self = this;
            this.etiedeken.ajax('GET', ajax, function () {
                self.fulfiller(this);
            });
        };
        return Setup;
    }());
    var check = function (window) {
        if (window.etiedeken)
            window.requestAnimationFrame(function () {
                var load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/experience/source.json');
            });
        else
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
