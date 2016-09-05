(function(win) {
  'use strict';

  var rootElement = document.documentElement;
  var mStyle = document.createElement('style');
  var setRemTrans = function() {
    var clientWidth = rootElement.clientWidth;
    var stylePostfix = "}";

    if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && clientWidth > 1024) {
      clientWidth = 640;
      stylePostfix = ';max-width:" + clientWidth + "px;margin-right:auto!important;margin-left:auto!important;}'
    }

    win.rem = clientWidth / 7.5;

    /ZTE U930_TD/.test(navigator.userAgent) && (win.rem = 1.13 * win.rem);
    /Android\s+4\.4\.4;\s+M351\s/.test(navigator.userAgent) && (win.rem = win.rem / 1.05);
    /Android\s+5\.0\.1;\s+MX4\s/.test(navigator.userAgent) && (win.rem = 1.06382 * win.rem);

    mStyle.innerHTML = 'html{font-size:' + win.rem + 'px!important;}body{font-size:' + 12 * (clientWidth / 320) + 'px' + stylePostfix;
  };

  rootElement.firstElementChild.appendChild(mStyle);

  win.addEventListener('resize', function() {
    setRemTrans();
  }, !1);

  win.addEventListener('pageshow', function(e) {
    e.persisted && setRemTrans();
  }, !1);

  setRemTrans();
})(window);

(function() {
  'use strict';

  var doc = document;
  var win = window;

  if (win.devicePixelRatio && devicePixelRatio >= 2) {
    var docElem = doc.documentElement;
    var testElem = doc.createElement('div');
    var fakeBody = doc.createElement('body');
    var refNode = docElem.firstElementChild || docElem.firstChild;

    testElem.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElem);
    docElem.insertBefore(fakeBody, refNode);

    if (testElem.offsetHeight >= 1) {
      doc.querySelector('html').classList.add('hairlines');
    }

    docElem.removeChild(fakeBody);
  }

})();