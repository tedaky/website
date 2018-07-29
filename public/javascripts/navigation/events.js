((window, document) => {
    class Navigation {
        constructor(button, menu, submenu, close) {
            this.button = button;
            this.menu = menu;
            this.submenu = submenu;
            this.close = close;
        }

        scrollbar() {
            let scrollElement = document.createElement('div');
            scrollElement.classList.add('scrollbar');
            document.body.appendChild(scrollElement);
            const result = scrollElement.offsetWidth - scrollElement.clientWidth;
            document.body.removeChild(scrollElement);
            return result;
        }

        openMenu(menu, button, navbar) {
            menu.classList.remove('menu-close');
            menu.classList.add('menu-open');

            navbar.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-expanded', 'true');

            document.body.classList.remove('navigation-menu-close');
            document.body.classList.add('navigation-menu-open');

            const scrollbarWidth = this.scrollbar() + 'px';
            document.body.style.paddingRight = scrollbarWidth;
            menu.style.paddingRight = scrollbarWidth;
        }
        closeMenu(menu, button, navbar) {
            menu.classList.remove('menu-open');
            menu.classList.add('menu-close');

            navbar.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-expanded', 'false');

            document.body.classList.remove('navigation-menu-open');
            document.body.classList.add('navigation-menu-close');

            menu.style.paddingRight = null;
            document.body.style.paddingRight = null;
        }
        toggleMenu() {
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');

            if (menu.classList.contains('menu-open')) {
                this.closeMenu(menu, button, navbar);
            } else {
                this.openMenu(menu, button, navbar);
            }
        }

        openSubmenu(button, menu) {
            menu.classList.remove('submenu-close');
            menu.classList.add('submenu-open');

            button.setAttribute('aria-expanded', 'true');
        }
        closeSubmenu(button, menu) {
            menu.classList.remove('submenu-open');
            menu.classList.add('submenu-close');

            button.setAttribute('aria-expanded', 'false');
        }
        toggleSubmenu(button, menu) {
            (menu.classList.contains('submenu-open')) ?
                this.closeSubmenu(button, menu) :
                this.openSubmenu(button, menu);
        }

        clickSubmenu() {
            let self = this;
            let submenus = document.querySelectorAll(this.menu + ' ' + this.submenu);

            for (let i = submenus.length; i > 0; --i) {
                let parent = submenus[i-1];
                let button = parent.firstChild;
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    self.toggleSubmenu(button, parent);
                });
            }
        }

        clickMenu() {
            let self = this;
            document.querySelector(this.button).addEventListener('click', (e) => {
                self.toggleMenu();
            });
            document.querySelector(this.close).addEventListener('click', (e) => {
                self.toggleMenu();
            });
        }

        window() {
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');

            window.addEventListener('keydown', (e) => {
                if (e.keyCode === 27)
                    this.closeMenu(menu, button, navbar);
            })
        }
    }

    let navigation = new Navigation('.navigation .nav:first-child button', '.navigation', '.sub-nav', '.close-navigation');
    navigation.clickMenu();
    navigation.clickSubmenu();
    navigation.window();
})(window, document);