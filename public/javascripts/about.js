((window, document) => {
    const setUpEtiedeken = (etiedeken) => {

        const profile = (about) => {
            let container = etiedeken.element('div', ['container'], []);
            let wrapper = etiedeken.element('div', ['profile-wrapper'], []);

            const image = (about) => {
                let container = etiedeken.element('div', ['image'], []);
                const image = etiedeken.image([], [], about.image, about.name);

                container.appendChild(image);

                return container;
            };

            wrapper.appendChild(image(about));

            const subtagline = (about) => {
                about = about.split(' ');
                let container = etiedeken.element('p', ['subtagline'], []);

                about.reverse();

                for (let i = about.length; i > 0; --i) {
                    let subtagline = etiedeken.textElement('span', [], [], about[i-1]);
                    let bullet = etiedeken.textElement('span', [], [], ' ● ');
                    container.appendChild(subtagline);
                    container.appendChild(bullet);
                }

                return container;
            }

            const me = (about) => {
                let container = etiedeken.element('div', ['greeting'], []);

                const name = etiedeken.textElement('h1', [], [], about.name);

                const tagline = etiedeken.textElement('p', ['tagline', 'h3'], [], about.tagline);

                const subtag = subtagline(about.subtagline);

                const divider = etiedeken.element('hr', [], []);

                container.appendChild(name);
                container.appendChild(tagline);
                container.appendChild(subtag);
                container.appendChild(divider);

                return container;
            };

            let greeting = me(about);

            const info = (about) => {
                let container = etiedeken.element('div', ['info'], []);

                for (let i in about) {
                    let row = etiedeken.element('p', [], []);
                    let property = etiedeken.textElement('label', [], [], i);
                    let value = etiedeken.textElement('span', [], [], about[i]);

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

        const resume = (about) => {
            let container = etiedeken.element('div', ['container', 'no-bg'], []);
            let resumeWrapper = etiedeken.element('p', ['resume-wrapper', 'text-center'], []);
            let resume = etiedeken.link(['btn', 'resume'], [], 'Download Resume', about.resume);

            resumeWrapper.appendChild(resume);
            container.appendChild(resumeWrapper);

            return container;
        };

        const about = (about) => {
            let container = etiedeken.element('div', ['container', 'no-bg'], []);
            let description = etiedeken.element('p', ['description', 'text-center'], []);
            description.innerHTML = about.description;

            container.appendChild(description);

            return container;
        };

        const sphere = () => {
            let ballWrapper = etiedeken.element('div', ['ball-wrapper'], []);
            let inner = etiedeken.element('div', ['inner'], []);
            let wrap = etiedeken.element('div', ['wrap'], []);
            let scene = etiedeken.element('div', ['scene'], []);
            let wrapper = etiedeken.element('div', ['wrapper'], []);
            let ball = etiedeken.element('ul', ['ball'], []);
            for (let i = 20; i > 0; --i) {
                let ring = etiedeken.element('li', ['ring'], []);
                ball.appendChild(ring);
            }

            wrapper.appendChild(ball);
            scene.appendChild(wrapper);
            wrap.appendChild(scene);
            inner.appendChild(wrap);
            ballWrapper.appendChild(inner);

            return ballWrapper;
        };

        etiedeken.ajax('GET', '/javascripts/about.json', function() {
            let profileWrapper = document.getElementById('profile');
            let aboutWrapper = document.getElementById('about');
            let background = etiedeken.element('div', ['background'], []);
            let sphereBackground = etiedeken.element('div', ['sphere'], []);

            profileWrapper.classList.add('profile');
            profileWrapper.appendChild(profile(this.about));
            aboutWrapper.appendChild(resume(this.about));
            aboutWrapper.appendChild(about(this.about));

            document.body.insertBefore(background, profileWrapper);
            sphereBackground.appendChild(sphere());
            document.body.insertBefore(sphereBackground, aboutWrapper);
        });

        etiedeken.loadDeferredStyles('/stylesheets/about.css');
        etiedeken.loadDeferredStyles('/stylesheets/background.css');
        etiedeken.loadDeferredStyles('/stylesheets/sphere.css');
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
    };

    window.requestAnimationFrame(() => {
        callEtiedeken(window);
    });
})(window, document);
