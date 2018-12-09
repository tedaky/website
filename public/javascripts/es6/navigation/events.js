/* jshint esversion: 6 */
((window, document) => {
    class Events {
        constructor(button, menu, submenu, close) {
            this.button = button;
            this.menu = menu;
            this.submenu = submenu;
            this.close = close;

            this.aria = ['aria-expanded', 'true', 'false'];

            this.navigation = ['navigation-menu-open', 'navigation-menu-close', 'menu-open', 'menu-close', 'submenu-open', 'submenu-close'];
            this.scrollTimeout = undefined;
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
            menu.classList.remove(this.navigation[3]);
            menu.classList.add(this.navigation[2]);

            navbar.setAttribute(this.aria[0], this.aria[1]);
            button.setAttribute(this.aria[0], this.aria[1]);

            document.body.classList.remove(this.navigation[1]);
            document.body.classList.add(this.navigation[0]);

            const scrollbarWidth = this.scrollbar() + 'px';
            document.body.style.paddingRight = scrollbarWidth;
            menu.style.paddingRight = scrollbarWidth;
        }
        closeMenu(menu, button, navbar) {
            menu.classList.remove(this.navigation[2]);
            menu.classList.add(this.navigation[3]);

            navbar.setAttribute(this.aria[0], this.aria[2]);
            button.setAttribute(this.aria[0], this.aria[2]);

            document.body.classList.remove(this.navigation[0]);
            document.body.classList.add(this.navigation[1]);

            menu.style.paddingRight = null;
            document.body.style.paddingRight = null;
        }
        toggleMenu() {
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');

            if (menu.classList.contains(this.navigation[2])) {
                this.closeSubmenu();
                this.closeMenu(menu, button, navbar);
            } else {
                this.openMenu(menu, button, navbar);
            }
        }

        openSubmenu(button, menu) {
            this.closeSubmenu();

            menu.classList.remove(this.navigation[5]);
            menu.classList.add(this.navigation[4]);

            button.setAttribute(this.aria[0], this.aria[1]);
        }
        closeSubmenu() {
            let submenus = document.querySelectorAll(this.menu + ' ' + this.submenu);

            for (let i = submenus.length; i > 0; --i) {
                let menu = submenus[i-1];
                let button = menu.firstChild;

                menu.classList.remove(this.navigation[4]);
                menu.classList.add(this.navigation[5]);

                button.setAttribute(this.aria[0], this.aria[2]);
            }
        }
        submenuEvent(button, menu) {
            let self = this;
            button.addEventListener('click', (e) => {
                self.toggleSubmenu(button, menu);
            });
        }
        toggleSubmenu(button, menu) {
            if (menu.classList.contains(this.navigation[4]))
                this.closeSubmenu(button, menu);
            else
                this.openSubmenu(button, menu);
        }
        clickSubmenu() {
            let self = this;
            let submenus = document.querySelectorAll(this.menu + ' ' + this.submenu);

            for (let i = submenus.length; i > 0; --i) {
                let menu = submenus[i-1];
                let button = menu.firstChild;
                self.submenuEvent(button, menu);
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

        menuItemEvent(item, menu, button, navbar) {
            let self = this;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                self.closeSubmenu();
                self.closeMenu(menu, button, navbar);
                self.scrollingToCalculations(item);
            });
        }
        clickMenuItem() {
            let self = this;
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');

            let menuItem = document.querySelectorAll(this.menu + ' .container > .nav:last-child .nav-item:not(' + this.submenu + ') .nav-click[href^="#"]');

            for (let i = menuItem.length; i > 0; --i) {
                let item = menuItem[i-1];
                self.menuItemEvent(item, menu, button, navbar);
            }
        }

        scrollingToCalculations(menuItem) {
            if (this.scrollTimeOut)
                return;

            const pageTo = menuItem.getAttributeNode("href").value.replace('#', '');
            const pageToElement = document.getElementById(pageTo);
            const navbar = document.getElementById('navigation');
            const topPosition = window.pageYOffset || document.documentElement.scrollTop;
            const getOffsetTop = (elem) => {
                let offsetTop = 0;
                do
                    if (!isNaN(elem.offsetTop))
                        offsetTop += elem.offsetTop;
                while ((elem = elem.offsetParent));
                return offsetTop;
            };
            const navBarHeight = navbar.innerHeight || navbar.clientHeight;
            const toElementPos = getOffsetTop(pageToElement) - navBarHeight - 24;
            const leftPosition = window.pageXOffset || document.documentElement.scrollLeft;
            const startTime = new Date().getTime();
            const easInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const scroll = () => {
                const duration = 750;
                const currentTime = new Date().getTime();
                const time = Math.min(1, ((currentTime - startTime) / duration));
                const ease = easInOutQuad(time);
                if (window.pageYOffset != toElementPos) {
                    if ((currentTime - startTime) >= duration) {
                        clearTimeout(this.scrollTimeOut);
                        this.scrollTimeOut = undefined;
                        return;
                    }
                    window.scroll(leftPosition, Math.ceil((ease * (toElementPos - topPosition)) + topPosition));
                    this.scrollTimeOut = setTimeout(scroll, 5);
                } else {
                    clearTimeout(this.scrollTimeOut);
                    this.scrollTimeOut = undefined;
                }
            };
            scroll();
        }

        scrolling() {
            const topPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (topPosition > 70)
                document.body.classList.add('top-scroll');
            else
                document.body.classList.remove('top-scroll');
        }

        window() {
            let self = this;
            let menu = document.querySelector(this.menu);
            let button = document.querySelector(this.button);
            let navbar = document.getElementById('navbar');

            window.addEventListener('keydown', (e) => {
                let openSubmenus = document.querySelectorAll(self.menu + ' .' + self.navigation[4]);
                if (e.keyCode === 27)
                    if (openSubmenus.length)
                        self.closeSubmenu();
                    else
                        if (menu.classList.contains('menu-open'))
                            self.closeMenu(menu, button, navbar);
            });
            window.addEventListener('scroll', (e) => {
                self.scrolling();
            });
        }
    }

    let events = new Events('.navigation .container > .nav:first-child button', '.navigation', '.sub-nav', '.close-navigation');
    events.clickMenu();
    events.clickSubmenu();
    events.window();
    events.clickMenuItem();
    events.scrolling();
})(window, document);
