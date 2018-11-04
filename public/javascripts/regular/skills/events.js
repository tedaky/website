(function (window, document) {
    var Events = /** @class */ (function () {
        function Events(main) {
            this.containers = document.querySelectorAll(main + ' ul');
            this.activators = document.querySelectorAll(main + ' .h3');
            this.timeout = undefined;
            this.time = 350;
        }
        Events.prototype.getHeight = function (element) {
            var height = element.clientHeight;
            return height;
        };
        Events.prototype.zeroHeight = function (container, activator) {
            this.removeAnimation(container, this);
            container.setAttribute('aria-expanded', 'false');
            activator.setAttribute('aria-expanded', 'false');
            var tmp = this.getHeight(container);
            container.style.height = tmp + 'px';
            this.getHeight(container);
            this.addAnimation(container);
            container.style.height = 0;
            container.classList.add('closed');
            this.timeout = setTimeout(this.removeAnimation, this.time, container, this);
        };
        Events.prototype.removeAnimation = function (container, self) {
            container.classList.remove('animating');
            container.style.height = null;
            clearTimeout(self.timeout);
            self.timeout = undefined;
        };
        Events.prototype.addAnimation = function (container) {
            container.classList.add('animating');
        };
        Events.prototype.setHeight = function (container, activator) {
            this.removeAnimation(container, this);
            container.setAttribute('aria-expanded', 'true');
            activator.setAttribute('aria-expanded', 'true');
            container.classList.remove('closed');
            var tmp = this.getHeight(container);
            container.style.height = 0;
            this.getHeight(container);
            this.addAnimation(container);
            container.style.height = tmp + 'px';
            this.timeout = setTimeout(this.removeAnimation, this.time, container, this);
        };
        Events.prototype.toggle = function (container, activator) {
            if (this.timeout)
                return;
            if (container.clientHeight > 0)
                this.zeroHeight(container, activator);
            else
                this.setHeight(container, activator);
        };
        Events.prototype.setButton = function (element) {
            var self = this;
            var container = element.nextElementSibling;
            element.addEventListener('click', function (e) {
                e.preventDefault();
                self.toggle(container, element);
            });
        };
        Events.prototype.load = function () {
            for (var i = this.activators.length; i > 0; --i)
                this.setButton(this.activators[i - 1]);
        };
        return Events;
    }());
    var events = new Events('#skills');
    events.load();
})(window, document);
