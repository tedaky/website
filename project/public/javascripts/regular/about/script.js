/* jshint esversion: 6 */
(function (window, document) {
    var Setup = /** @class */ (function () {
        function Setup(etiedeken) {
            this.etiedeken = etiedeken;
        }
        Setup.prototype.profile = function (about) {
            var _this = this;
            var container = this.etiedeken.element('div', ['container'], []);
            var wrapper = this.etiedeken.element('div', ['profile-wrapper'], []);
            var image = function (about) {
                var container = _this.etiedeken.element('div', ['image'], []);
                var image = _this.etiedeken.image([], [], about.image, about.name);
                container.appendChild(image);
                return container;
            };
            wrapper.appendChild(image(about));
            var subtagline = function (about) {
                about = about.split(' ');
                var container = _this.etiedeken.element('p', ['subtagline'], []);
                about.reverse();
                for (var i = about.length; i > 0; --i) {
                    var subtagline_1 = _this.etiedeken.element('span', [], [], about[i - 1]);
                    var bullet = _this.etiedeken.element('span', [], [], ' ● ');
                    container.appendChild(subtagline_1);
                    container.appendChild(bullet);
                }
                return container;
            };
            var me = function (about) {
                var container = _this.etiedeken.element('div', ['greeting'], []);
                var name = _this.etiedeken.element('h1', [], [], about.name);
                var tagline = _this.etiedeken.element('p', ['tagline', 'h3'], [], about.tagline);
                var subtag = subtagline(about.subtagline);
                var divider = _this.etiedeken.element('hr', [], []);
                container.appendChild(name);
                container.appendChild(tagline);
                container.appendChild(subtag);
                container.appendChild(divider);
                return container;
            };
            var greeting = me(about);
            var info = function (about) {
                var container = _this.etiedeken.element('div', ['info'], []);
                for (var i in about) {
                    var row = _this.etiedeken.element('p', [], []);
                    var property = _this.etiedeken.element('label', [], [], i);
                    var value = _this.etiedeken.element('span', [], [], about[i]);
                    row.appendChild(property);
                    row.appendChild(value);
                    container.appendChild(row);
                }
                return container;
            };
            wrapper.appendChild(greeting);
            wrapper.appendChild(info({
                "address": about.address,
                "age": about.age,
                "email": about.email,
                "phone": about.phone
            }));
            container.appendChild(wrapper);
            return container;
        };
        Setup.prototype.resume = function (about) {
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var resumeWrapper = this.etiedeken.element('p', ['resume-wrapper', 'text-center'], []);
            var resume = this.etiedeken.link(['btn', 'resume'], [], 'Download Resume', about.resume);
            resumeWrapper.appendChild(resume);
            container.appendChild(resumeWrapper);
            return container;
        };
        Setup.prototype.about = function (about) {
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var description = this.etiedeken.element('p', ['description', 'text-center'], []);
            description.innerHTML = about.description;
            container.appendChild(description);
            return container;
        };
        Setup.prototype.footer = function (footer) {
            var container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            var text = this.etiedeken.element('p', ['copyright', 'text-center'], [], footer);
            container.appendChild(text);
            return container;
        };
        Setup.prototype.sphere = function () {
            var ballWrapper = this.etiedeken.element('div', ['ball-wrapper'], []);
            var inner = this.etiedeken.element('div', ['inner'], []);
            var wrap = this.etiedeken.element('div', ['wrap'], []);
            var scene = this.etiedeken.element('div', ['scene'], []);
            var wrapper = this.etiedeken.element('div', ['wrapper'], []);
            var ball = this.etiedeken.element('ul', ['ball'], []);
            for (var i = 20; i > 0; --i) {
                var ring = this.etiedeken.element('li', ['ring'], []);
                ball.appendChild(ring);
            }
            wrapper.appendChild(ball);
            scene.appendChild(wrapper);
            wrap.appendChild(scene);
            inner.appendChild(wrap);
            ballWrapper.appendChild(inner);
            return ballWrapper;
        };
        Setup.prototype.fulfiller = function (ajax) {
            var profileWrapper = document.getElementById('profile');
            var aboutWrapper = document.getElementById('about');
            var background = this.etiedeken.element('div', ['background'], []);
            var sphereBackground = this.etiedeken.element('div', ['sphere'], []);
            var footer = document.getElementById('footer');
            profileWrapper.classList.add('profile');
            profileWrapper.appendChild(this.profile(ajax.about));
            aboutWrapper.appendChild(this.resume(ajax.about));
            aboutWrapper.appendChild(this.about(ajax.about));
            footer.appendChild(this.footer(ajax.about.footer));
            document.body.insertBefore(background, profileWrapper);
            sphereBackground.appendChild(this.sphere());
            document.body.insertBefore(sphereBackground, aboutWrapper);
            aboutWrapper.classList.add('about');
            footer.classList.add('footer');
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
                load.ajax('/javascripts/response/about/source.json');
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
