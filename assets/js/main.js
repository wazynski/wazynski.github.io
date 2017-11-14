"use strict";var _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return void 0===e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":_typeof2(e)},nine={fullscreen:!1,currentPageIndex:null,currentPage:null,canScroll:!0,scrollDuration:750,scrollContainer:document.getElementById("fullpage"),pages:document.querySelectorAll(".section"),scrollDirection:null,prevTime:(new Date).getTime(),scrollHistory:[],fullScreenWidthEnableFrom:0,fullScreenHeightEnableFrom:0,supports3d:!1,isTouchDevice:navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),isTouch:"ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,touchStartY:0,touchEndY:0,touchSensitivity:5,circles:document.querySelector(".circles"),prevBackground:null};if(nine.support3d=function(){if(navigator.userAgent.toLowerCase().indexOf("edge")>-1)return!1;var e=document.createElement("p"),n=void 0,t={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(e,null);for(var i in t)void 0!==e.style[i]&&(e.style[i]="translate3d(1px,1px,1px)",n=window.getComputedStyle(e).getPropertyValue(t[i]));return document.body.removeChild(e),void 0!==n&&n.length>0&&"none"!==n},nine.checkFullscreen=function(){var e=nine.windowSize().h,n=nine.windowSize().w;return!nine.hasClass(document.body,"page")&&e>=nine.fullScreenHeightEnableFrom&&n>=nine.fullScreenWidthEnableFrom},nine.enableFullscreen=function(){var e=document.getElementsByTagName("html")[0];if(nine.checkFullscreen()){nine.fullscreen=!0,nine.addClass(document.body,"fullscreen"),nine.css(e,{overflow:"hidden"}),!1===nine.supports3d&&nine.addClass(document.body,"no-css3");var n=nine.windowSize().h+"px";Array.prototype.forEach.call(nine.pages,function(e){e.style.height=n,e.style.minHeight=n})}else nine.fullscreen=!1,nine.removeClass(document.body,"fullscreen"),nine.css(e,{overflow:"auto"}),nine.removeClass(document.body,"no-css3")},nine.contactScroll=function(){var e=document.getElementById("contact-link");e&&(e.onclick=function(){if(nine.fullscreen)return nine.scrollToSection("contact"),!1})},nine.animateLoad=function(){window.setTimeout(function(){document.body.classList.add("faded-in")},1e3)},nine.pageTransisition=function(e){document.body.classList.add("faded-out"),setTimeout(function(){window.location.href=e},600)},nine.animateLinks=function(){var e=document.getElementsByTagName("a");Array.prototype.forEach.call(e,function(e){e.onclick=function(){return nine.pageTransisition(e.href),!1}})},nine.fullscreenMode=function(e){if(nine.checkFullscreen()&&!1===nine.fullscreen?(nine.enableFullscreen(),nine.hashChangeLisener(),nine.addFullscreenNav(),nine.addBackgrounds(),nine.addKeyboardNav(),nine.addScrollInput(),nine.setCurrentPage(),nine.enableTouch()):!1===nine.checkFullscreen()&&!0===nine.fullscreen&&(nine.enableFullscreen(),nine.removeFullscreenNav(),nine.removeKeyboardNav(),nine.removeScrollInput(),nine.disableTouch()),e)nine.resetPosition();else{var n=nine.debounce(function(){nine.fullscreenMode(!0)},250);window.addEventListener("resize",n)}},nine.setCurrentPage=function(){var e=nine.getHash();if(e){var n=document.getElementById(e);n&&(nine.updateCurrent(n),nine.scrollStart(n),nine.scrollToSection(n.id,0))}else nine.updateCurrent(document.querySelectorAll(".section")[0])},nine.updateHash=function(e){window.location.hash=e},nine.hashChangeLisener=function(){document.addEventListener?window.addEventListener("hashchange",nine.hashChangeHandler,!1):window.attachEvent("onhashchange",nine.hashChangeHandler)},nine.hashChangeHandler=function(){var e=nine.getHash();e&&e!==nine.currentPage&&nine.scrollToSection(e)},nine.scrollToSection=function(e,n){var t=document.getElementById(e);if(null!==t){null!==n&&void 0!==n||(n=nine.scrollDuration);var i=nine.getSectionIndex(t);i>nine.currentPageIndex?nine.scrollDirection="down":i<nine.currentPageIndex&&(nine.scrollDirection="up");var o=t.offsetTop;nine.supports3d?nine.translateScroll(o,t,n):nine.animateScroll(o,t,n)}},nine.translateScroll=function(e,n,t){var i="translate3d(0px, -"+e+"px, 0px)";if(t>0){var o="all "+t+"ms ease-in-out";nine.removeClass(nine.scrollContainer,"notransition"),nine.css(nine.scrollContainer,{"-webkit-transition":o,transition:o})}else nine.addClass(nine.scrollContainer,"notransition");nine.scrollStart(n),nine.canScroll=!1,nine.setTransforms(nine.scrollContainer,i),setTimeout(function(){nine.canScroll=!0,nine.scrollEnd(n)},t),setTimeout(function(){nine.removeClass(nine.scrollContainer,"notransition")},10)},nine.animateScroll=function(e,n,t){function i(){nine.canScroll=!1;var e="now"in window.performance?window.performance.now():(new Date).getTime(),s=Math.min(1,(e-r)/t),c=a(s),u=Math.ceil(c*(l-o)+o);if(nine.scrollContainer.scrollTop!==u&&(nine.scrollContainer.scrollTop=u),u===l)return nine.canScroll=!0,nine.scrollDirection=null,void nine.scrollEnd(n);window.requestAnimationFrame(i)}null===t&&(t=nine.scrollDuration);var o=nine.getScrolledPosition(),r="now"in window.performance?window.performance.now():(new Date).getTime(),a=function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},l=e;nine.scrollStart(n),i()},nine.scrollStart=function(e){setTimeout(function(){var n=document.querySelectorAll(".bgs li");nine.removeClass(document.querySelector(".bgs li.previous"),"previous"),nine.prevBackground=document.querySelector(".bgs li.active"),nine.addClass(nine.prevBackground,"previous"),nine.removeClass(nine.prevBackground,"active"),nine.addClass(n[nine.getSectionIndex(e)],"active");var t=document.querySelector(".section.active");t&&(nine.removeClass(t,"active"),nine.removeClass(document.body,t.id+"-active"),nine.addClass(document.body,e.id+"-active")),nine.addClass(e,"active"),nine.updateControls(nine.getSectionIndex(e))},.33*nine.scrollDuration)},nine.scrollEnd=function(e){null!==e&&(nine.updateHash(e.id),nine.updateCurrent(e),nine.removeClass(nine.prevBackground,"previous"),nine.updateControls())},nine.updateCurrent=function(e){nine.currentPage=e.id,nine.currentPageIndex=nine.getSectionIndex(e)},nine.getScrolledPosition=function(){return document.documentElement.scrollTop||nine.scrollContainer.scrollTop||document.body.scrollTop},nine.resetPosition=function(){if(!0===nine.fullscreen){var e=void 0;null===nine.currentPage?(e=document.querySelectorAll(".sections")[0],nine.currentPage=e.id,nine.currentPageIndex=0):e=document.getElementById(nine.currentPage);var n=nine.windowSize().h+"px";Array.prototype.forEach.call(nine.pages,function(e){e.style.height=n,e.style.minHeight=n});var t=e.offsetTop;nine.supports3d?nine.translateScroll(t,e,0):nine.animateScroll(t,e,0)}},nine.addBackgrounds=function(){var e=document.querySelector(".bgs");Array.prototype.forEach.call(nine.pages,function(n,t){var i=document.createElement("li");e.appendChild(i)}),document.querySelector(".bgs li").classList.add("active")},nine.addFullscreenNav=function(){var e=document.querySelector(".controls");if(null!=e){e.classList.add("on");var n=document.querySelector(".dots");n&&(Array.prototype.forEach.call(nine.pages,function(e,t){var i=document.createElement("li");i.setAttribute("data-page",t),n.appendChild(i),i.addEventListener("click",function(e){return nine.dotClick(e)})}),document.querySelector(".dots li").classList.add("active"),document.querySelector(".next").addEventListener("click",nine.arrowNextClickHandler),document.querySelector(".prev").addEventListener("click",nine.arrowPrevClickHandler),nine.updateControls())}},nine.removeFullscreenNav=function(){var e=document.querySelector(".controls");if(e){e.classList.remove("on");var n=document.querySelector(".dots"),t=document.querySelectorAll(".dots li");n&&t&&(Array.prototype.forEach.call(t,function(e){e.parentNode.removeChild(e)}),document.querySelector(".next").removeEventListener("click",nine.arrowNextClickHandler),document.querySelector(".prev").removeEventListener("click",nine.arrowPrevClickHandler))}},nine.arrowNextClickHandler=function(){nine.nextPage()},nine.arrowPrevClickHandler=function(){nine.prevPage()},nine.dotClick=function(e,n){null===n&&(n=!1),document.querySelector(".dots li.active").classList.remove("active");var t=e.target.getAttribute("data-page");document.querySelectorAll(".dots li")[t].classList.add("active");var i=nine.pages[t].id;nine.canScroll?nine.scrollToSection(i):!1===n&&setTimeout(function(){nine.dotClick(e,!0)},nine.scrollDuration)},nine.updateControls=function(e){null!=document.querySelector(".dots")&&(void 0===e&&(e=null),null===e&&null===nine.currentPageIndex?e=0:null===e&&null!==nine.currentPageIndex&&(e=nine.currentPageIndex),document.querySelector(".dots li.active")&&document.querySelector(".dots li.active").classList.remove("active"),document.querySelectorAll(".dots li")[e].classList.add("active"),document.querySelector(".next").classList.remove("disabled"),document.querySelector(".prev").classList.remove("disabled"),0===e&&document.querySelector(".prev").classList.add("disabled"),e===nine.pages.length-1&&document.querySelector(".next").classList.add("disabled"))},nine.nextPage=function(e){if(null===e&&(e=!1),nine.currentPageIndex+1<nine.pages.length&&nine.canScroll){var n=nine.pages[nine.currentPageIndex+1].id;return nine.scrollToSection(n),!0}return nine.currentPageIndex+1<nine.pages.length&&!1===e&&setTimeout(function(){nine.nextPage(!0)},nine.scrollDuration),!1},nine.prevPage=function(e){if(null===e&&(e=!1),nine.currentPageIndex-1>=0&&nine.canScroll){var n=nine.pages[nine.currentPageIndex-1].id;return nine.scrollToSection(n),!0}return nine.currentPageIndex-1>=0&&!1===e&&setTimeout(function(){nine.prevPage(!0)},nine.scrollDuration),!1},nine.addKeyboardNav=function(){document.onkeydown=function(e){e||(e=window.event);var n=e.keyCode;switch(e.charCode&&0===n&&(n=e.charCode),n){case 38:e.preventDefault(),nine.prevPage();break;case 40:case 32:e.preventDefault(),nine.nextPage();break;case 33:e.preventDefault(),nine.prevPage();break;case 34:e.preventDefault(),nine.nextPage()}}},nine.removeKeyboardNav=function(){document.onkeydown=null},nine.addScrollInput=function(){var e=window;e.addEventListener?(e.addEventListener("mousewheel",nine.mouseWheelHandler,!1),e.addEventListener("wheel",nine.mouseWheelHandler,!1)):e.attachEvent("onmousewheel",nine.mouseWheelHandler)},nine.removeScrollInput=function(){var e=window;e.addEventListener?(e.removeEventListener("mousewheel",nine.mouseWheelHandler,!1),e.removeEventListener("wheel",nine.mouseWheelHandler,!1)):e.detachEvent("onmousewheel",nine.mouseWheelHandler)},nine.mouseWheelHandler=function(e){function n(e,n){for(var t=0,i=e.slice(Math.max(e.length-n,1)),o=0;o<i.length;o++)t+=i[o];return Math.ceil(t/n)}nine.preventDefault(e);var t=(new Date).getTime(),i=(e=window.event||e||e.originalEvent).wheelDelta||-e.deltaY||-e.detail,o=Math.max(-1,Math.min(1,i));nine.scrollHistory.length>149&&nine.scrollHistory.shift(),nine.scrollHistory.push(Math.abs(i));var r=t-nine.prevTime;return nine.prevTime=t,r>200&&(nine.scrollHistory=[]),nine.canScroll&&n(nine.scrollHistory,10)>=n(nine.scrollHistory,70)&&(o<0?nine.nextPage():nine.prevPage()),!1},nine.enableTouch=function(){(nine.isTouchDevice||nine.isTouch)&&(window.addEventListener("touchstart",nine.touchStartHandler,{passive:!1}),window.addEventListener("touchmove",nine.touchMoveHandler,{passive:!1}))},nine.disableTouch=function(){(nine.isTouchDevice||nine.isTouch)&&(window.removeEventListener("touchstart",nine.touchStartHandler,{passive:!1}),window.removeEventListener("touchmove",nine.touchMoveHandler,{passive:!1}))},nine.touchStartHandler=function(e){var n=window.event||e||e.originalEvent;if(nine.isReallyTouch(n)){var t=nine.getEventsPage(n);nine.touchStartY=t.y,nine.touchStartX=t.x}},nine.touchMoveHandler=function(e){var n=window.event||e||e.originalEvent;if(nine.isReallyTouch(n)){nine.preventDefault(e);var t=nine.getEventsPage(n);nine.canScroll&&(nine.touchEndY=t.y,Math.abs(nine.touchStartY-nine.touchEndY)>nine.windowSize().h/100*nine.touchSensitivity&&(nine.touchStartY>nine.touchEndY?nine.nextPage():nine.touchEndY>nine.touchStartY&&nine.prevPage()))}},nine.isReallyTouch=function(e){return void 0===e.pointerType||"mouse"!==e.pointerType},nine.getEventsPage=function(e){var n=[];return n.y=void 0!==e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x=void 0!==e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,n},nine.getHash=function(){return window.location.hash.replace("#","").split("/")[0]},nine.addClass=function(e,n){e&&!nine.hasClass(e,n)&&e.classList.add(n)},nine.removeClass=function(e,n){e&&nine.hasClass(e,n)&&e.classList.remove(n)},nine.hasClass=function(e,n){return e.classList.contains(n)},nine.getSectionIndex=function(e){var n=void 0;return Array.prototype.forEach.call(nine.pages,function(t,i){t===e&&(n=i)}),n},nine.windowSize=function(e){if(null!==(e=e||window).innerWidth)return{w:e.innerWidth,h:e.innerHeight};var n=e.document;return"CSS1Compat"===document.compatMode?{w:n.documentElement.clientWidth,h:n.documentElement.clientHeight}:{w:n.body.clientWidth,h:n.body.clientHeight}},nine.debounce=function(e,n,t){var i=void 0;return function(){var o=this,r=arguments,a=t&&!i;clearTimeout(i),i=setTimeout(function(){i=null,t||e.apply(o,r)},n),a&&e.apply(o,r)}},nine.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},nine.setTransforms=function(e,n){nine.css(e,{"-webkit-transform":n,"-moz-transform":n,"-ms-transform":n,transform:n})},nine.css=function(e,n){var t=void 0;for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&null!==t&&(e.style[t]=n[t]);return e},nine.supports3d=nine.support3d(),nine.animateLinks(),nine.fullscreenMode(),nine.contactScroll(),nine.animateLoad(),String.prototype.includes||(String.prototype.includes=function(e,n){return"number"!=typeof n&&(n=0),!(n+e.length>this.length)&&-1!==this.indexOf(e,n)}),"objectFit"in document.documentElement.style==0)for(var container=document.getElementsByClassName("object-fit"),i=0;i<container.length;i++){var imageSource=container[i].querySelector("img").getAttribute("data-src");container[i].classList.add("on"),container[i].querySelector("img").style.display="none",container[i].style.backgroundSize="cover",container[i].style.backgroundImage="url("+imageSource+")",container[i].style.backgroundPosition="center center"}!function(e,n){var t=n(e,e.document);e.lazySizes=t,"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports&&(module.exports=t)}(window,function(e,n){if(n.getElementsByClassName){var t,i,o=n.documentElement,r=e.Date,a=e.HTMLPictureElement,l="addEventListener",s="getAttribute",c=e[l],u=e.setTimeout,d=e.requestAnimationFrame||u,f=e.requestIdleCallback,m=/^picture$/i,p=["load","error","lazyincluded","_lazyloaded"],v={},g=Array.prototype.forEach,h=function(e,n){return v[n]||(v[n]=new RegExp("(\\s|^)"+n+"(\\s|$)")),v[n].test(e[s]("class")||"")&&v[n]},y=function(e,n){h(e,n)||e.setAttribute("class",(e[s]("class")||"").trim()+" "+n)},w=function(e,n){var t;(t=h(e,n))&&e.setAttribute("class",(e[s]("class")||"").replace(t," "))},b=function e(n,t,i){var o=i?l:"removeEventListener";i&&e(n,t),p.forEach(function(e){n[o](e,t)})},S=function(e,i,o,r,a){var l=n.createEvent("CustomEvent");return o||(o={}),o.instance=t,l.initCustomEvent(i,!r,!a,o),e.dispatchEvent(l),l},E=function(n,t){var o;!a&&(o=e.picturefill||i.pf)?o({reevaluate:!0,elements:[n]}):t&&t.src&&(n.src=t.src)},C=function(e,n){return(getComputedStyle(e,null)||{})[n]},z=function(e,n,t){for(t=t||e.offsetWidth;t<i.minSize&&n&&!e._lazysizesWidth;)t=n.offsetWidth,n=n.parentNode;return t},T=function(){var e,t,i=[],o=[],r=i,a=function(){var n=r;for(r=i.length?o:i,e=!0,t=!1;n.length;)n.shift()();e=!1},l=function(i,o){e&&!o?i.apply(this,arguments):(r.push(i),t||(t=!0,(n.hidden?u:d)(a)))};return l._lsFlush=a,l}(),A=function(e,n){return n?function(){T(e)}:function(){var n=this,t=arguments;T(function(){e.apply(n,t)})}},x=function(e){var n,t=0,o=i.ricTimeout,a=function(){n=!1,t=r.now(),e()},l=f&&i.ricTimeout?function(){f(a,{timeout:o}),o!==i.ricTimeout&&(o=i.ricTimeout)}:A(function(){u(a)},!0);return function(e){var i;(e=!0===e)&&(o=33),n||(n=!0,0>(i=125-(r.now()-t))&&(i=0),e||9>i&&f?l():u(l,i))}},P=function(e){var n,t,i=function(){n=null,e()},o=function e(){var n=r.now()-t;99>n?u(e,99-n):(f||i)(i)};return function(){t=r.now(),n||(n=u(o,99))}};!function(){var n,t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:300};i=e.lazySizesConfig||e.lazysizesConfig||{};for(n in t)n in i||(i[n]=t[n]);e.lazySizesConfig=i,u(function(){i.init&&M()})}();var L=function(){var a,d,f,p,v,z,L,M,H,N,q,I,_,R,B=/^img$/i,D=/^iframe$/i,W="onscroll"in e&&!/glebot/.test(navigator.userAgent),F=0,$=0,Y=-1,O=function e(n){$--,n&&n.target&&b(n.target,e),(!n||0>$||!n.target)&&($=0)},j=function(e,t){var i,r=e,a="hidden"==C(n.body,"visibility")||"hidden"!=C(e,"visibility");for(M-=t,q+=t,H-=t,N+=t;a&&(r=r.offsetParent)&&r!=n.body&&r!=o;)(a=(C(r,"opacity")||1)>0)&&"visible"!=C(r,"overflow")&&(i=r.getBoundingClientRect(),a=N>i.left&&H<i.right&&q>i.top-1&&M<i.bottom+1);return a},X=function(){var e,r,l,c,u,f,m,v,g,h=t.elements;if((p=i.loadMode)&&8>$&&(e=h.length)){r=0,Y++,null==_&&("expand"in i||(i.expand=o.clientHeight>500&&o.clientWidth>500?500:370),I=i.expand,_=I*i.expFactor),_>F&&1>$&&Y>2&&p>2&&!n.hidden?(F=_,Y=0):F=p>1&&Y>1&&6>$?I:0;for(;e>r;r++)if(h[r]&&!h[r]._lazyRace)if(W)if((v=h[r][s]("data-expand"))&&(f=1*v)||(f=F),g!==f&&(z=innerWidth+f*R,L=innerHeight+f,m=-1*f,g=f),l=h[r].getBoundingClientRect(),(q=l.bottom)>=m&&(M=l.top)<=L&&(N=l.right)>=m*R&&(H=l.left)<=z&&(q||N||H||M)&&(i.loadHidden||"hidden"!=C(h[r],"visibility"))&&(d&&3>$&&!v&&(3>p||4>Y)||j(h[r],f))){if(ee(h[r]),u=!0,$>9)break}else!u&&d&&!c&&4>$&&4>Y&&p>2&&(a[0]||i.preloadAfterLoad)&&(a[0]||!v&&(q||N||H||M||"auto"!=h[r][s](i.sizesAttr)))&&(c=a[0]||h[r]);else ee(h[r]);c&&!u&&ee(c)}},U=x(X),K=function(e){y(e.target,i.loadedClass),w(e.target,i.loadingClass),b(e.target,Q),S(e.target,"lazyloaded")},V=A(K),Q=function(e){V({target:e.target})},Z=function(e,n){try{e.contentWindow.location.replace(n)}catch(t){e.src=n}},G=function(e){var n,t=e[s](i.srcsetAttr);(n=i.customMedia[e[s]("data-media")||e[s]("media")])&&e.setAttribute("media",n),t&&e.setAttribute("srcset",t)},J=A(function(e,n,t,o,r){var a,l,c,d,p,v;(p=S(e,"lazybeforeunveil",n)).defaultPrevented||(o&&(t?y(e,i.autosizesClass):e.setAttribute("sizes",o)),l=e[s](i.srcsetAttr),a=e[s](i.srcAttr),r&&(c=e.parentNode,d=c&&m.test(c.nodeName||"")),v=n.firesLoad||"src"in e&&(l||a||d),p={target:e},v&&(b(e,O,!0),clearTimeout(f),f=u(O,2500),y(e,i.loadingClass),b(e,Q,!0)),d&&g.call(c.getElementsByTagName("source"),G),l?e.setAttribute("srcset",l):a&&!d&&(D.test(e.nodeName)?Z(e,a):e.src=a),r&&(l||d)&&E(e,{src:a})),e._lazyRace&&delete e._lazyRace,w(e,i.lazyClass),T(function(){(!v||e.complete&&e.naturalWidth>1)&&(v?O(p):$--,K(p))},!0)}),ee=function(e){var n,t=B.test(e.nodeName),o=t&&(e[s](i.sizesAttr)||e[s]("sizes")),r="auto"==o;(!r&&d||!t||!e[s]("src")&&!e.srcset||e.complete||h(e,i.errorClass)||!h(e,i.lazyClass))&&(n=S(e,"lazyunveilread").detail,r&&k.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,$++,J(e,n,r,o,t))},ne=function e(){if(!d){if(r.now()-v<999)return void u(e,999);var n=P(function(){i.loadMode=3,U()});d=!0,i.loadMode=3,U(),c("scroll",function(){3==i.loadMode&&(i.loadMode=2),n()},!0)}};return{_:function(){v=r.now(),t.elements=n.getElementsByClassName(i.lazyClass),a=n.getElementsByClassName(i.lazyClass+" "+i.preloadClass),R=i.hFac,c("scroll",U,!0),c("resize",U,!0),e.MutationObserver?new MutationObserver(U).observe(o,{childList:!0,subtree:!0,attributes:!0}):(o[l]("DOMNodeInserted",U,!0),o[l]("DOMAttrModified",U,!0),setInterval(U,999)),c("hashchange",U,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(e){n[l](e,U,!0)}),/d$|^c/.test(n.readyState)?ne():(c("load",ne),n[l]("DOMContentLoaded",U),u(ne,2e4)),t.elements.length?(X(),T._lsFlush()):U()},checkElems:U,unveil:ee}}(),k=function(){var e,t=A(function(e,n,t,i){var o,r,a;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),m.test(n.nodeName||""))for(o=n.getElementsByTagName("source"),r=0,a=o.length;a>r;r++)o[r].setAttribute("sizes",i);t.detail.dataAttr||E(e,t.detail)}),o=function(e,n,i){var o,r=e.parentNode;r&&(i=z(e,r,i),(o=S(e,"lazybeforesizes",{width:i,dataAttr:!!n})).defaultPrevented||(i=o.detail.width)&&i!==e._lazysizesWidth&&t(e,r,o,i))},r=P(function(){var n,t=e.length;if(t)for(n=0;t>n;n++)o(e[n])});return{_:function(){e=n.getElementsByClassName(i.autosizesClass),c("resize",r)},checkElems:r,updateElem:o}}(),M=function e(){e.i||(e.i=!0,k._(),L._())};return t={cfg:i,autoSizer:k,loader:L,init:M,uP:E,aC:y,rC:w,hC:h,fire:S,gW:z,rAF:T}}}),function(e,n){var t=function t(){n(e.lazySizes),e.removeEventListener("lazyunveilread",t,!0)};n=n.bind(null,e,e.document),"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?n(require("lazysizes")):e.lazySizes?t():e.addEventListener("lazyunveilread",t,!0)}(window,function(e,n,t){function i(){this.ratioElems=n.getElementsByClassName("lazyaspectratio"),this._setupEvents(),this.processImages()}if(e.addEventListener){var o,r,a,l=Array.prototype.forEach,s=/^picture$/i,c=function(n){return e.matchMedia?(c=function(e){return!e||(matchMedia(e)||{}).matches})(n):e.Modernizr&&Modernizr.mq?!n||Modernizr.mq(n):!n},u=t.aC,d=t.rC,f=t.cfg;i.prototype={_setupEvents:function(){var e=this,t=function(n){n.naturalWidth<36?e.addAspectRatio(n,!0):e.removeAspectRatio(n,!0)},i=function(){e.processImages()};n.addEventListener("load",function(e){e.target.getAttribute&&e.target.getAttribute("data-aspectratio")&&t(e.target)},!0),addEventListener("resize",function(){var n,i=function(){l.call(e.ratioElems,t)};return function(){clearTimeout(n),n=setTimeout(i,99)}}()),n.addEventListener("DOMContentLoaded",i),addEventListener("load",i)},processImages:function(e){var t,i;e||(e=n),t="length"in e&&!e.nodeName?e:e.querySelectorAll("img[data-aspectratio]");for(i=0;i<t.length;i++)t[i].naturalWidth>36?this.removeAspectRatio(t[i]):this.addAspectRatio(t[i])},getSelectedRatio:function(e){var n,t,i,o,r,a=e.parentNode;if(a&&s.test(a.nodeName||""))for(n=0,t=(i=a.getElementsByTagName("source")).length;n<t;n++)if(o=i[n].getAttribute("data-media")||i[n].getAttribute("media"),f.customMedia[o]&&(o=f.customMedia[o]),c(o)){r=i[n].getAttribute("data-aspectratio");break}return r||e.getAttribute("data-aspectratio")||""},parseRatio:function(){var e=/^\s*([+\d\.]+)(\s*[\/x]\s*([+\d\.]+))?\s*$/,n={};return function(t){return!n[t]&&t.match(e)&&(RegExp.$3?n[t]=RegExp.$1/RegExp.$3:n[t]=1*RegExp.$1),n[t]}}(),addAspectRatio:function(n,t){var i,o=n.offsetWidth,r=n.offsetHeight;t||u(n,"lazyaspectratio"),o<36&&r<=0?(o||r&&e.console)&&console.log("Define width or height of image, so we can calculate the other dimension"):(i=this.getSelectedRatio(n),(i=this.parseRatio(i))&&(o?n.style.height=o/i+"px":n.style.width=r*i+"px"))},removeAspectRatio:function(e){d(e,"lazyaspectratio"),e.style.height="",e.style.width="",e.removeAttribute("data-aspectratio")}},(r=function(){(a=e.jQuery||e.Zepto||e.shoestring||e.$)&&a.fn&&!a.fn.imageRatio&&a.fn.filter&&a.fn.add&&a.fn.find?a.fn.imageRatio=function(){return o.processImages(this.find("img[data-aspectratio]").add(this.filter("img[data-aspectratio]"))),this}:a=!1})(),setTimeout(r),o=new i,e.imageRatio=o,"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o)}}),function(e,n){var t=function t(){n(e.lazySizes),e.removeEventListener("lazyunveilread",t,!0)};n=n.bind(null,e,e.document),"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?n(require("lazysizes"),require("../fix-ios-sizes/fix-ios-sizes")):e.lazySizes?t():e.addEventListener("lazyunveilread",t,!0)}(window,function(e,n,t){var i,o=t&&t.cfg||e.lazySizesConfig,r=n.createElement("img"),a="sizes"in r&&"srcset"in r,l=/\s+\d+h/g,s=function(){var e=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,t=Array.prototype.forEach;return function(i){var o=n.createElement("img"),r=function(n){var t,i=n.getAttribute(lazySizesConfig.srcsetAttr);i&&(i.match(e)&&(t="w"==RegExp.$2?RegExp.$1/RegExp.$3:RegExp.$3/RegExp.$1)&&n.setAttribute("data-aspectratio",t),n.setAttribute(lazySizesConfig.srcsetAttr,i.replace(l,"")))},a=function(e){var n=e.target.parentNode;n&&"PICTURE"==n.nodeName&&t.call(n.getElementsByTagName("source"),r),r(e.target)},s=function(){o.currentSrc&&n.removeEventListener("lazybeforeunveil",a)};i[1]&&(n.addEventListener("lazybeforeunveil",a),o.onload=s,o.onerror=s,o.srcset="data:,a 1w 1h",o.complete&&s())}}();if(o||(o={},e.lazySizesConfig=o),o.supportsType||(o.supportsType=function(e){return!e}),!e.picturefill&&!o.pf){if(e.HTMLPictureElement&&a)return n.msElementsFromPoint&&s(navigator.userAgent.match(/Edge\/(\d+)/)),void(o.pf=function(){});o.pf=function(n){var t,o;if(!e.picturefill)for(t=0,o=n.elements.length;t<o;t++)i(n.elements[t])},i=function(){var r=function(e,n){return e.w-n.w},s=/^\s*\d+\.*\d*px\s*$/,c=function(e){var n,t,i=e.length,o=e[i-1],r=0;for(r;r<i;r++)if(o=e[r],o.d=o.w/e.w,o.d>=e.d){!o.cached&&(n=e[r-1])&&n.d>e.d-.13*Math.pow(e.d,2.2)&&(t=Math.pow(n.d-.6,1.6),n.cached&&(n.d+=.15*t),n.d+(o.d-e.d)*t>e.d&&(o=n));break}return o},u=function(){var e,n=/(([^,\s].[^\s]+)\s+(\d+)w)/g,t=/\s/,i=function(n,t,i,o){e.push({c:t,u:i,w:1*o})};return function(o){return e=[],(o=o.trim()).replace(l,"").replace(n,i),e.length||!o||t.test(o)||e.push({c:o,u:o,w:99}),e}}(),d=function e(){e.init||(e.init=!0,addEventListener("resize",function(){var e,t=n.getElementsByClassName("lazymatchmedia"),o=function(){var e,n;for(e=0,n=t.length;e<n;e++)i(t[e])};return function(){clearTimeout(e),e=setTimeout(o,66)}}()))},f=function(n,i){var r,a=n.getAttribute("srcset")||n.getAttribute(o.srcsetAttr);!a&&i&&(a=n._lazypolyfill?n._lazypolyfill._set:n.getAttribute(o.srcAttr)||n.getAttribute("src")),n._lazypolyfill&&n._lazypolyfill._set==a||(r=u(a||""),i&&n.parentNode&&(r.isPicture="PICTURE"==n.parentNode.nodeName.toUpperCase(),r.isPicture&&e.matchMedia&&(t.aC(n,"lazymatchmedia"),d())),r._set=a,Object.defineProperty(n,"_lazypolyfill",{value:r,writable:!0}))},m=function(n){var i=e.devicePixelRatio||1,o=t.getX&&t.getX(n);return Math.min(o||i,2.5,i)},p=function(n){return e.matchMedia?(p=function(e){return!e||(matchMedia(e)||{}).matches})(n):!n},v=function(e){var n,i,a,l,u,d,v;if(l=e,f(l,!0),(u=l._lazypolyfill).isPicture)for(i=0,a=(n=e.parentNode.getElementsByTagName("source")).length;i<a;i++)if(o.supportsType(n[i].getAttribute("type"),e)&&p(n[i].getAttribute("media"))){l=n[i],f(l),u=l._lazypolyfill;break}return u.length>1?(v=l.getAttribute("sizes")||"",v=s.test(v)&&parseInt(v,10)||t.gW(e,e.parentNode),u.d=m(e),!u.src||!u.w||u.w<v?(u.w=v,d=c(u.sort(r)),u.src=d):d=u.src):d=u[0],d},g=function(e){if(!a||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var n=v(e);n&&n.u&&e._lazypolyfill.cur!=n.u&&(e._lazypolyfill.cur=n.u,n.cached=!0,e.setAttribute(o.srcAttr,n.u),e.setAttribute("src",n.u))}};return g.parse=u,g}(),o.loadedClass&&o.loadingClass&&function(){var e=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(n){e.push(n+o.loadedClass),e.push(n+o.loadingClass)}),o.pf({elements:n.querySelectorAll(e.join(", "))})}()}});