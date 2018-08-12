(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.third = function (element, classname, items) {
            var wrapper = this.etiedeken.element(element, classname, []);
            items.reverse();
            for (var i = items.length; i > 0; --i)
                wrapper.appendChild(this.etiedeken.element('span', [], [], items[i - 1]));
            return wrapper;
        };
        Setup.prototype.school = function (education) {
            var schoolElement = this.etiedeken.element('li', ['school'], []);
            var groupElement = this.etiedeken.element('div', ['group'], []);
            var studyElement = this.third('h3', ['study'], [education.study.degree, ' - ', education.study.college]);
            groupElement.appendChild(studyElement);
            var nameElement = this.etiedeken.element('p', ['school-name'], [], education.school);
            groupElement.appendChild(nameElement);
            var timeElement = this.third('div', ['time'], [education.time.start.toString(), ' - ', education.time.end.toString()]);
            groupElement.appendChild(timeElement);
            if (education.cgpa) {
                var cgpaWrapper = this.third('div', ['cgpa'], ['CGPA:', ' ', education.cgpa.toString()]);
                groupElement.appendChild(cgpaWrapper);
            }
            schoolElement.appendChild(groupElement);
            return schoolElement;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var educationElement = document.getElementById('education');
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var label = this.etiedeken.element('h2', ['text-center'], [], 'Education');
            var schools = this.etiedeken.element('ul', ['education'], []);
            ajax.education.reverse();
            for (var i = ajax.education.length; i > 0; --i)
                schools.appendChild(this.school(ajax.education[i - 1]));
            container.appendChild(label);
            container.appendChild(schools);
            educationElement.appendChild(container);
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
        (window.etiedeken) ?
            window.requestAnimationFrame(function () {
                var load = new Setup(window.etiedeken);
                load.ajax('/javascripts/response/education/source.json');
            }) :
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
