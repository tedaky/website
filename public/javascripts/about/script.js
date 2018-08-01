((window, document) => {
    class Setup {
        constructor(etiedeken) {
            this.etiedeken = etiedeken;
        }

        profile(about) {
            let container = this.etiedeken.element('div', ['container'], []);
            let wrapper = this.etiedeken.element('div', ['profile-wrapper'], []);

            const image = (about) => {
                let container = this.etiedeken.element('div', ['image'], []);
                const image = this.etiedeken.image([], [], about.image, about.name);

                container.appendChild(image);

                return container;
            };

            wrapper.appendChild(image(about));

            const subtagline = (about) => {
                about = about.split(' ');
                let container = this.etiedeken.element('p', ['subtagline'], []);

                about.reverse();

                for (let i = about.length; i > 0; --i) {
                    let subtagline = this.etiedeken.element('span', [], [], about[i-1]);
                    let bullet = this.etiedeken.element('span', [], [], ' ● ');
                    container.appendChild(subtagline);
                    container.appendChild(bullet);
                }

                return container;
            }

            const me = (about) => {
                let container = this.etiedeken.element('div', ['greeting'], []);

                const name = this.etiedeken.element('h1', [], [], about.name);

                const tagline = this.etiedeken.element('p', ['tagline', 'h3'], [], about.tagline);

                const subtag = subtagline(about.subtagline);

                const divider = this.etiedeken.element('hr', [], []);

                container.appendChild(name);
                container.appendChild(tagline);
                container.appendChild(subtag);
                container.appendChild(divider);

                return container;
            };

            let greeting = me(about);

            const info = (about) => {
                let container = this.etiedeken.element('div', ['info'], []);

                for (let i in about) {
                    let row = this.etiedeken.element('p', [], []);
                    let property = this.etiedeken.element('label', [], [], i);
                    let value = this.etiedeken.element('span', [], [], about[i]);

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
        }

        resume(about) {
            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            let resumeWrapper = this.etiedeken.element('p', ['resume-wrapper', 'text-center'], []);
            const resume = this.etiedeken.link(['btn', 'resume'], [], 'Download Resume', about.resume);

            resumeWrapper.appendChild(resume);
            container.appendChild(resumeWrapper);

            return container;
        }

        about(about) {
            let container = this.etiedeken.element('div', ['container', 'no-bg'], []);
            let description = this.etiedeken.element('p', ['description', 'text-center'], []);
            description.innerHTML = about.description;

            container.appendChild(description);

            return container;
        }

        sphere() {
            let ballWrapper = this.etiedeken.element('div', ['ball-wrapper'], []);
            let inner = this.etiedeken.element('div', ['inner'], []);
            let wrap = this.etiedeken.element('div', ['wrap'], []);
            let scene = this.etiedeken.element('div', ['scene'], []);
            let wrapper = this.etiedeken.element('div', ['wrapper'], []);
            let ball = this.etiedeken.element('ul', ['ball'], []);
            for (let i = 20; i > 0; --i) {
                let ring = this.etiedeken.element('li', ['ring'], []);
                ball.appendChild(ring);
            }

            wrapper.appendChild(ball);
            scene.appendChild(wrapper);
            wrap.appendChild(scene);
            inner.appendChild(wrap);
            ballWrapper.appendChild(inner);

            return ballWrapper;
        }

        fulfiller(ajax) {
            let profileWrapper = document.getElementById('profile');
            let aboutWrapper = document.getElementById('about');
            let background = this.etiedeken.element('div', ['background'], []);
            let sphereBackground = this.etiedeken.element('div', ['sphere'], []);

            profileWrapper.classList.add('profile');
            profileWrapper.appendChild(this.profile(ajax.about));
            aboutWrapper.appendChild(this.resume(ajax.about));
            aboutWrapper.appendChild(this.about(ajax.about));

            document.body.insertBefore(background, profileWrapper);
            sphereBackground.appendChild(this.sphere());
            document.body.insertBefore(sphereBackground, aboutWrapper);
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
                load.ajax('/javascripts/about/source.json');
            }) :
            window.requestAnimationFrame(() => {
                check(window);
            });
    };

    window.requestAnimationFrame(() => {
        check(window);
    });
})(window, document);
