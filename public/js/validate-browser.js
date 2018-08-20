/* 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

(function () {
    let outDateBrowserLang = 'en';
    let language = navigator.language || navigator.userLanguage; 
    if ('zh-TW' === language) {
        outDateBrowserLang = 'zh-tw';
    } else if ('zh-CN' === language) {
        outDateBrowserLang = 'zh-cn';
    }
    
    addLoadEvent(function(){
        outdatedBrowser({
            bgColor: '#00a0e6',
            color: '#ffffff',
            lowerThan: 'object-fit',
            languagePath: 'public/lib/outdatedbrowser/lang/' + outDateBrowserLang + '.html'
        })
    });
}());