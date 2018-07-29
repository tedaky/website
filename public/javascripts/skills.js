((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        skill(skill) {
            const skillElement = this.etiedeken.element('li', ['skill'], []);

            const nameElement = this.etiedeken.element('span', ['h5'], [], skill.name);

            let levelContainer = this.etiedeken.accessibleElement('div', ['line'], [], [{'aria-label': skill.level + '%'}], []);

            const levelElement = this.etiedeken.element('span', [], [{'width': skill.level + '%'}]);

            levelContainer.appendChild(levelElement);

            skillElement.appendChild(nameElement);
            skillElement.appendChild(levelContainer);

            return skillElement;
        }

        fulfiller(ajax) {
            const label = this.etiedeken.element('h2', ['text-center'], [], 'Skills');

            let skillsWrapper = document.getElementById('skills');
            skillsWrapper.appendChild(label);

            ajax.skills.reverse();

            for (let i = ajax.skills.length; i > 0; --i) {
                let container = this.etiedeken.element('div', ['container'], []);
                container.id = ajax.skills[i-1].group.replace(' ', '-').toLowerCase();
                const group = this.etiedeken.element('h3', ['text-center'], [], ajax.skills[i-1].group);
                let skills = this.etiedeken.element('ul', ['skills'], []);
                ajax.skills[i-1].skill.reverse();

                for (let y = ajax.skills[i-1].skill.length; y > 0; --y)
                    skills.appendChild(this.skill(ajax.skills[i-1].skill[y-1]));

                container.appendChild(group);
                container.appendChild(skills);
                skillsWrapper.appendChild(container);
            }
        }

        ajax(ajax) {
            let self = this;
            this.etiedeken.ajax('GET', ajax, function() {
                self.fulfiller(this);
            });
        }

        style(style) {
            this.etiedeken.loadDeferredStyles(style);
        }
    }

    const check = (window) => {
        (window.etiedeken) ?
            window.requestAnimationFrame(() => {
                let load = new Setup(window.etiedeken);
                load.ajax('/javascripts/skills.json');
                load.style('/stylesheets/skills.css');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
