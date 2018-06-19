((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        const skill = (skill) => {
            const skillElement = etiedeken.element('li', ['skill'], []);

            const nameElement = etiedeken.textElement('span', ['h5'], [], skill.name);

            let levelContainer = etiedeken.element('div', ['line'], []);

            const levelElement = etiedeken.element('span', [], [{'width': skill.level + '%'}]);

            levelContainer.appendChild(levelElement);

            skillElement.appendChild(nameElement);
            skillElement.appendChild(levelContainer);

            return skillElement;
        };

        etiedeken.ajax('GET', '/javascripts/skills.json', function() {
            const label = etiedeken.textElement('h2', ['text-center'], [], 'Skills');

            let skillsWrapper = document.getElementById('skills');
            skillsWrapper.appendChild(label);

            this.skills.reverse();
            
            for (let i = this.skills.length; i > 0; --i) {
                let container = etiedeken.element('div', ['container'], []);
                container.id = this.skills[i-1].group.replace(' ', '-').toLowerCase();
                const group = etiedeken.textElement('h3', ['text-center'], [], this.skills[i-1].group);
                let skills = etiedeken.element('ul', ['skills'], []);
                this.skills[i-1].skill.reverse();
                for (let y = this.skills[i-1].skill.length; y > 0; --y) {
                    skills.appendChild(skill(this.skills[i-1].skill[y-1]));
                }
                container.appendChild(group);
                container.appendChild(skills);
                skillsWrapper.appendChild(container);
            }
        });
        
        etiedeken.loadDeferredStyles('/stylesheets/skills.css');
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
