((window, document) => {
    const setUpEtiedeken = (etiedeken) => {
        const third = (element, classname, items) => {
            let wrapper = etiedeken.element(element, classname, []);

            items.reverse();

            for (let i = items.length; i > 0; --i) {
                wrapper.appendChild(etiedeken.textElement('span', [], [], items[i-1]));
            }

            return wrapper;
        };

        const school = (education) => {
            let schoolElement = etiedeken.element('li', ['school'], []);

            let groupElement = etiedeken.element('div', ['group'], []);

            const studyElement = third('h3', ['study'], [education.study.degree, ' - ', education.study.college]);
            groupElement.appendChild(studyElement);

            const nameElement = etiedeken.textElement('p', ['school-name'], [], education.school);
            groupElement.appendChild(nameElement);

            const timeElement = third('div', ['time'], [education.time.start.toString(), ' - ', education.time.end.toString()]);
            groupElement.appendChild(timeElement);

            if (education.cgpa) {
                const cgpaWrapper = third('div', ['cgpa'], ['CGPA:', ' ', education.cgpa.toString()]);
                groupElement.appendChild(cgpaWrapper);
            }

            schoolElement.appendChild(groupElement);

            return schoolElement;
        };

        etiedeken.ajax('GET', '/javascripts/education.json', function() {
            let educationElement = document.getElementById('education');

            let container = etiedeken.element('div', ['container', 'no-bg'], []);
            const label = etiedeken.textElement('h2', ['text-center'], [], 'Education');
            let schools = etiedeken.element('ul', ['education'], []);

            this.education.reverse();

            for (let i = this.education.length; i > 0; --i) {
                schools.appendChild(school(this.education[i-1]));
            }
            container.appendChild(label);
            container.appendChild(schools);
            educationElement.appendChild(container);
        });

        etiedeken.loadDeferredStyles('/stylesheets/education.css');
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
