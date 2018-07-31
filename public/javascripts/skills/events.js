((window, document) => {
    class Events {
        constructor(main) {
            this.containers = document.querySelectorAll(main + ' ul');
            this.activators = document.querySelectorAll(main + ' .h3');
            this.timeout = undefined;
            this.time = 350
        }

        getHeight(element) {
            const height = element.clientHeight;
            return height;
        }
        zeroHeight(container, activator) {
            this.removeAnimation(container, this);
            container.setAttribute('aria-expanded', 'false');
            activator.setAttribute('aria-expanded', 'false');
            const tmp = this.getHeight(container);
            container.style.height = tmp + 'px';
            this.getHeight(container);
            this.addAnimation(container);
            container.style.height = 0;
            container.classList.add('closed');
            this.timeout = setTimeout(this.removeAnimation, this.time, container, this);
        }
        removeAnimation(container, self) {
            container.classList.remove('animating');
            container.style.height = null;
            clearTimeout(self.timeout);
            self.timeout = undefined;
        }
        addAnimation(container) {
            container.classList.add('animating');
        }
        setHeight(container, activator) {
            this.removeAnimation(container, this);
            container.setAttribute('aria-expanded', 'true');
            activator.setAttribute('aria-expanded', 'true');
            container.classList.remove('closed');
            const tmp = this.getHeight(container);
            container.style.height = 0;
            this.getHeight(container);
            this.addAnimation(container);
            container.style.height = tmp + 'px';
            this.timeout = setTimeout(this.removeAnimation, this.time, container, this);
        }
        toggle(container, activator) {
            if(this.timeout)
                return;
            (container.clientHeight > 0) ?
                this.zeroHeight(container, activator) :
                this.setHeight(container, activator);
        }
        setButton(element) {
            let self = this;
            const container = element.nextElementSibling;
            element.addEventListener('click', (e) => {
                e.preventDefault();
                self.toggle(container, element);
            });
        }
        load() {
            for (let i = this.activators.length; i > 0; --i)
                this.setButton(this.activators[i-1]);
        }
    }

    let events = new Events('#skills');
    events.load();
})(window, document);
