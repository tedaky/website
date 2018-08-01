((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        third(element, classname, items) {
            let wrapper = this.etiedeken.element(element, classname, []);

            items.reverse();

            for (let i = items.length; i > 0; --i)
                wrapper.appendChild(this.etiedeken.element('span', [], [], items[i-1]));

            return wrapper;
        }

        school(education) {
            let schoolElement = this.etiedeken.element('li', ['school'], []);

            let groupElement = this.etiedeken.element('div', ['group'], []);

            const studyElement = this.third('h3', ['study'], [education.study.degree, ' - ', education.study.college]);
            groupElement.appendChild(studyElement);

            const nameElement = this.etiedeken.element('p', ['school-name'], [], education.school);
            groupElement.appendChild(nameElement);

            const timeElement = this.third('div', ['time'], [education.time.start.toString(), ' - ', education.time.end.toString()]);
            groupElement.appendChild(timeElement);

            if (education.cgpa) {
                const cgpaWrapper = this.third('div', ['cgpa'], ['CGPA:', ' ', education.cgpa.toString()]);
                groupElement.appendChild(cgpaWrapper);
            }

            schoolElement.appendChild(groupElement);

            return schoolElement;
        }

        fulfiller(ajax) {
            let educationElement = document.getElementById('education');

            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            const label = this.etiedeken.element('h2', ['text-center'], [], 'Education');
            let schools = this.etiedeken.element('ul', ['education'], []);

            ajax.education.reverse();

            for (let i = ajax.education.length; i > 0; --i)
                schools.appendChild(this.school(ajax.education[i-1]));

            container.appendChild(label);
            container.appendChild(schools);
            educationElement.appendChild(container);
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
                load.ajax('/javascripts/education/source.json');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
