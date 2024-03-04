function get_browser() {
  let ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem != null) {
      return { name: 'Opera', version: tem[1] };
    }
  }
  if (window.navigator.userAgent.indexOf('Edge') > -1) {
    tem = ua.match(/\Edge\/(\d+)/);
    if (tem != null) {
      return { name: 'Edge', version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: +M[1],
  };
}

let browser = get_browser();

function isSupported(browser) {
  let supported = true;
  if (browser.name === 'MSIE' || browser.name === 'IE') {
    supported = false;
  }
  return supported;
}

if (!isSupported(browser)) {
  document.write('<h1>The app is not supported in IE. Please use other browsers!</h1>');
} else {
  let elem = document.createElement('app-root');
  document.body.appendChild(elem);
}
