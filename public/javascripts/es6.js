((window, document) => {
  class loader {
    constructor(jsfiles, cssfiles) {
      this.jsfiles = jsfiles;
      this.cssfiles = cssfiles;
    }

    downloadjs(script) {
      let element = document.createElement('script');
      element.src = script + '.js';
      element.async = true;
      document.body.appendChild(element);
    }

    loadjs(i) {
      if (i < this.jsfiles.length) {
        this.downloadjs(this.jsfiles[i]);
        window.requestAnimationFrame(() => {
          this.loadjs(++i);
        });
      }
    };

    downloadstyles(style) {
      let element = document.createElement('link');
      element.rel = 'stylesheet';
      element.href = style + '.css';
      document.head.appendChild(element);
    };

    loadcss(i) {
      if (i < this.cssfiles.length) {
        this.downloadstyles(this.cssfiles[i]);
        window.requestAnimationFrame(() => {
          this.loadcss(++i);
        });
      }
    };

    load() {
      let outOfDate = document.getElementById('out-of-date');
      document.body.removeChild(outOfDate);
      this.loadjs(0);
      this.loadcss(0);
    };
  }

  const jsfiles = [
    '/javascripts/script',
    '/javascripts/navigation',
    '/javascripts/about',
    '/javascripts/versions',
    '/javascripts/skills',
    '/javascripts/education',
    '/javascripts/social'
  ];

  const cssfiles = [
    '/stylesheets/style'
  ];

  window.requestAnimationFrame(() => {
    let atOnload = new loader(jsfiles, cssfiles);
    window.addEventListener('DOMContentLoaded', atOnload.load(), false);
  });
})(window, document);