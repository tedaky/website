/* jshint esversion: 6 */
(function (window, document) {
    var Events = /** @class */ (function () {
        function Events(button, menu, submenu, close) {
            this.button = button;
            this.menu = menu;
            this.submenu = submenu;
            this.close = close;
            this.aria = ['aria-expanded', 'true', 'false'];
            this.navigation = ['navigation-menu-open', 'navigation-menu-close', 'menu-open', 'menu-close', 'submenu-open', 'submenu-close'];
            this.scrollTimeout = undefined;
        }
        Events.prototype.scrollbar = function () {
            var scrollElement = document.createElement('div');
            scrollElement.classList.add('scrollbar');
            document.body.appendChild(scrollElement);
            var result = scrollElement.offsetWidth - scrollElement.clientWidth;
            document.body.removeChild(scrollElement);
            return result;
        };
        Events.prototype.openMenu = function (menu, button, navbar) {
            menu.classList.remove(this.navigation[3]);
            menu.classList.add(this.navigation[2]);
            navbar.setAttribute(this.aria[0], this.aria[1]);
            button.setAttribute(this.aria[0], this.aria[1]);
            document.body.classList.remove(this.navigation[1]);
            document.body.classList.add(this.navigation[0]);
            var scrollbarWidth = this.scrollbar() + 'px';
            document.body.style.paddingRight = scrollbarWidth;
            menu.style.paddingRight = scrollbarWidth;
        };
        Events.prototype.closeMenu = function (menu, button, navbar) {
            menu.classList.remove(this.navigation[2]);
            menu.classList.add(this.navigation[3]);
            navbar.setAttribute(this.aria[0], this.aria[2]);
            button.setAttribute(this.aria[0], this.aria[2]);
            document.body.classList.remove(this.navigation[0]);
            document.body.classList.add(this.navigation[1]);
            menu.style.paddingRight = null;
            document.body.style.paddingRight = null;
        };
        Events.prototype.toggleMenu = function () {
            var menu = document.querySelector(this.menu);
            var button = document.querySelector(this.button);
            var navbar = document.getElementById('navbar');
            if (menu.classList.contains(this.navigation[2])) {
                this.closeSubmenu();
                this.closeMenu(menu, button, navbar);
            }
            else {
                this.openMenu(menu, button, navbar);
            }
        };
        Events.prototype.openSubmenu = function (button, menu) {
            this.closeSubmenu();
            menu.classList.remove(this.navigation[5]);
            menu.classList.add(this.navigation[4]);
            button.setAttribute(this.aria[0], this.aria[1]);
        };
        Events.prototype.closeSubmenu = function () {
            var submenus = document.querySelectorAll(this.menu + ' ' + this.submenu);
            for (var i = submenus.length; i > 0; --i) {
                var menu = submenus[i - 1];
                var button = menu.firstChild;
                menu.classList.remove(this.navigation[4]);
                menu.classList.add(this.navigation[5]);
                button.setAttribute(this.aria[0], this.aria[2]);
            }
        };
        Events.prototype.submenuEvent = function (button, menu) {
            var self = this;
            button.addEventListener('click', function (e) {
                self.toggleSubmenu(button, menu);
            });
        };
        Events.prototype.toggleSubmenu = function (button, menu) {
            if (menu.classList.contains(this.navigation[4]))
                this.closeSubmenu(button, menu);
            else
                this.openSubmenu(button, menu);
        };
        Events.prototype.clickSubmenu = function () {
            var self = this;
            var submenus = document.querySelectorAll(this.menu + ' ' + this.submenu);
            for (var i = submenus.length; i > 0; --i) {
                var menu = submenus[i - 1];
                var button = menu.firstChild;
                self.submenuEvent(button, menu);
            }
        };
        Events.prototype.clickMenu = function () {
            var self = this;
            document.querySelector(this.button).addEventListener('click', function (e) {
                self.toggleMenu();
            });
            document.querySelector(this.close).addEventListener('click', function (e) {
                self.toggleMenu();
            });
        };
        Events.prototype.menuItemEvent = function (item, menu, button, navbar) {
            var self = this;
            item.addEventListener('click', function (e) {
                e.preventDefault();
                self.closeSubmenu();
                self.closeMenu(menu, button, navbar);
                self.scrollingToCalculations(item);
            });
        };
        Events.prototype.clickMenuItem = function () {
            var self = this;
            var menu = document.querySelector(this.menu);
            var button = document.querySelector(this.button);
            var navbar = document.getElementById('navbar');
            var menuItem = document.querySelectorAll(this.menu + ' .container > .nav:last-child .nav-item:not(' + this.submenu + ') .nav-click[href^="#"]');
            for (var i = menuItem.length; i > 0; --i) {
                var item = menuItem[i - 1];
                self.menuItemEvent(item, menu, button, navbar);
            }
        };
        Events.prototype.scrollingToCalculations = function (menuItem) {
            var _this = this;
            if (this.scrollTimeOut)
                return;
            var pageTo = menuItem.getAttributeNode("href").value.replace('#', '');
            var pageToElement = document.getElementById(pageTo);
            var navbar = document.getElementById('navigation');
            var topPosition = window.pageYOffset || document.documentElement.scrollTop;
            var getOffsetTop = function (elem) {
                var offsetTop = 0;
                do
                    if (!isNaN(elem.offsetTop))
                        offsetTop += elem.offsetTop;
                while ((elem = elem.offsetParent));
                return offsetTop;
            };
            var navBarHeight = navbar.innerHeight || navbar.clientHeight;
            var toElementPos = getOffsetTop(pageToElement) - navBarHeight - 24;
            var leftPosition = window.pageXOffset || document.documentElement.scrollLeft;
            var startTime = new Date().getTime();
            var easInOutQuad = function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; };
            var scroll = function () {
                var duration = 750;
                var currentTime = new Date().getTime();
                var time = Math.min(1, ((currentTime - startTime) / duration));
                var ease = easInOutQuad(time);
                if (window.pageYOffset != toElementPos) {
                    if ((currentTime - startTime) >= duration) {
                        clearTimeout(_this.scrollTimeOut);
                        _this.scrollTimeOut = undefined;
                        return;
                    }
                    window.scroll(leftPosition, Math.ceil((ease * (toElementPos - topPosition)) + topPosition));
                    _this.scrollTimeOut = setTimeout(scroll, 5);
                }
                else {
                    clearTimeout(_this.scrollTimeOut);
                    _this.scrollTimeOut = undefined;
                }
            };
            scroll();
        };
        Events.prototype.scrolling = function () {
            var topPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (topPosition > 70)
                document.body.classList.add('top-scroll');
            else
                document.body.classList.remove('top-scroll');
        };
        Events.prototype.window = function () {
            var self = this;
            var menu = document.querySelector(this.menu);
            var button = document.querySelector(this.button);
            var navbar = document.getElementById('navbar');
            window.addEventListener('keydown', function (e) {
                var openSubmenus = document.querySelectorAll(self.menu + ' .' + self.navigation[4]);
                if (e.keyCode === 27)
                    if (openSubmenus.length)
                        self.closeSubmenu();
                    else if (menu.classList.contains('menu-open'))
                        self.closeMenu(menu, button, navbar);
            });
            window.addEventListener('scroll', function (e) {
                self.scrolling();
            });
        };
        return Events;
    }());
    var events = new Events('.navigation .container > .nav:first-child button', '.navigation', '.sub-nav', '.close-navigation');
    events.clickMenu();
    events.clickSubmenu();
    events.window();
    events.clickMenuItem();
    events.scrolling();
})(window, document);
