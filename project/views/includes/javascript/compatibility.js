/* jshint -W061 */
function checkCompatibility() {
  "use strict";
  if (typeof Symbol == "undefined") return false;
  try {
    eval("class Foo {}");
    eval("var bar = (x) => x+1");
  } catch (e) { return false; }
  return true;
}

var esScript = document.createElement('script');
if (checkCompatibility()) {
  esScript.src = '/javascripts/es6/global/es6.js';
  esScript.async = true;
} else {
  esScript.src = '/javascripts/es6/global/unsupported.js';
  esScript.async = true;
}
document.body.appendChild(esScript);
