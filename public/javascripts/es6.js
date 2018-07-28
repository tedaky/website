((window, document) => {

  const jsfiles = [
    '/javascripts/script',
    '/javascripts/navigation',
    '/javascripts/about',
    '/javascripts/versions',
    '/javascripts/skills',
    '/javascripts/education',
    '/javascripts/social'
  ];

  const downloadjs = (script) => {
    let element = document.createElement('script');
    element.src = script + '.js';
    element.async = true;
    document.body.appendChild(element);
  };

  const loadjs = (i) => {
    if (i < jsfiles.length) {
      downloadjs(jsfiles[i]);
      window.requestAnimationFrame(() => {
        loadjs(++i);
      });
    }
  };

  const cssfiles = [
    '/stylesheets/style'
  ];

  const downloadstyles = (style) => {
    let element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = style + '.css';
    document.head.appendChild(element);
  };

  const loadcss = (i) => {
    if (i < cssfiles.length) {
      downloadstyles(cssfiles[i]);
      window.requestAnimationFrame(() => {
        loadcss(++i);
      });
    }
  };

  const atOnload = () => {
    let outOfDate = document.getElementById('out-of-date');
    document.body.removeChild(outOfDate);
    loadjs(0);
    loadcss(0);
  };

  window.requestAnimationFrame(() => {
    window.addEventListener('DOMContentLoaded', atOnload(), false);
  });
})(window, document);