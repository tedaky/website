(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.skill = function (skill) {
            var skillElement = this.etiedeken.element('li', ['skill'], []);
            var nameElement = this.etiedeken.element('span', ['h5'], [], skill.name);
            var levelContainer = this.etiedeken.accessibleElement('div', ['line'], [], [{ 'aria-label': skill.level + '%' }], []);
            var levelElement = this.etiedeken.element('span', [], [{ 'width': skill.level + '%' }]);
            levelContainer.appendChild(levelElement);
            skillElement.appendChild(nameElement);
            skillElement.appendChild(levelContainer);
            return skillElement;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var label = this.etiedeken.element('h2', ['text-center'], [], 'Skills');
            var skillsWrapper = document.getElementById('skills');
            skillsWrapper.appendChild(label);
            ajax.skills.reverse();
            for (var i = ajax.skills.length; i > 0; --i) {
                var container = this.etiedeken.element('div', ['container'], []);
                container.id = ajax.skills[i - 1].group.replace(' ', '-').toLowerCase();
                var group = this.etiedeken.accessibleElement('button', ['text-center', 'h3'], [], [{ 'aria-expanded': 'true' }, { 'aria-controls': 'skills' + i }], ajax.skills[i - 1].group);
                var skills = this.etiedeken.accessibleElement('ul', ['skills'], [], [{ 'aria-expanded': 'true' }]);
                skills.id = 'skills' + i;
                ajax.skills[i - 1].skill.reverse();
                for (var y = ajax.skills[i - 1].skill.length; y > 0; --y)
                    skills.appendChild(this.skill(ajax.skills[i - 1].skill[y - 1]));
                container.appendChild(group);
                container.appendChild(skills);
                skillsWrapper.appendChild(container);
            }
            window.load.downloadjs('/javascripts/regular/skills/events');
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
                load.ajax('/javascripts/response/skills/source.json');
            }) :
            window.requestAnimationFrame(function () {
                check(window);
            });
    };
    window.requestAnimationFrame(function () {
        check(window);
    });
})(window, document);
