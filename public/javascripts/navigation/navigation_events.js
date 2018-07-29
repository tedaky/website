((window, document) => {
    class Navigation {
        constructor(button, menu, close) {
            this.button = button;
            this.menu = menu;
            this.close = close;
        }

        toggle() {
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');
            if (menu.classList.contains('menu-open')) {
                menu.classList.remove('menu-open');
                menu.classList.add('menu-close');

                navbar.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-expanded', 'false');

                document.body.classList.remove('navigation-menu-open');
                document.body.classList.add('navigation-menu-close');
                menu.style.paddingRight = null;
                document.body.style.paddingRight = null;
            } else {
                menu.classList.add('menu-open');
                menu.classList.remove('menu-close');

                navbar.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-expanded', 'true');

                document.body.classList.add('navigation-menu-open');
                document.body.classList.remove('navigation-menu-close');
                const scrollbarWidth = this.scrollbar() + 'px';
                document.body.style.paddingRight = scrollbarWidth;
                menu.style.paddingRight = scrollbarWidth;
            }
        }

        scrollbar() {
            let scrollElement = document.createElement('div');
            scrollElement.classList.add('scrollbar');
            document.body.appendChild(scrollElement);
            const result = scrollElement.offsetWidth - scrollElement.clientWidth;
            document.body.removeChild(scrollElement);
            return result;
        }

        click() {
            let self = this;
            document.querySelector(this.button).addEventListener('click', (e) => {
                self.toggle();
            });
            document.querySelector(this.close).addEventListener('click', (e) => {
                self.toggle();
            });
        }
    }

    let navigation = new Navigation('.navigation .nav:first-child button', '.navigation', '.close-navigation');
    navigation.click();
})(window, document);