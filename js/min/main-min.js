"use strict";function debounce(e,n){var t;return function(){var o=this,i=arguments;clearTimeout(t),t=setTimeout(function(){e.apply(o,i)},n||250)}}var nine={canScroll:!0,duration:1e3,scrollContainer:document.getElementById("scroll"),scrollStart:0,pages:document.querySelectorAll(".section"),currentPage:0,scrollDirection:null,sticky:!1};nine.scrollSpy=function(){var e={},n=0;Array.prototype.forEach.call(nine.pages,function(n,t){e[t]={classes:n.className.replace("section","").trim(),top:n.offsetTop,bottom:n.offsetTop+n.offsetHeight,height:n.offsetHeight}}),nine.scrollContainer.addEventListener("scroll",function(t){var o=document.documentElement.scrollTop||nine.scrollContainer.scrollTop;for(n in e)o>=e[n].top&&o<=e[n].bottom&&(e[n].classes.includes("light")?nine.changeHeaderClass("dark"):nine.changeHeaderClass("light")),o>=e[n].top-.75*e[n].height&&o<=e[n].bottom&&nine.currentPage!=n&&(nine.currentPage=parseInt(n),nine.updateControls())})},nine.changeHeaderClass=function(e){document.querySelector(".header").setAttribute("class","header "+e)},nine.animateLoad=function(){document.body.className="",window.setTimeout(function(){var e=document.querySelectorAll(".hide-left");Array.prototype.forEach.call(e,function(e,n){e.classList.remove("hide-left")});var e=document.querySelectorAll(".hide-down");Array.prototype.forEach.call(e,function(e,n){e.classList.remove("hide-down")})},1e3)},nine.scrollTo=function(e,n){function t(e){e==n&&(cancelAnimationFrame(r),o())}function o(){nine.canScroll=!0,nine.scrollDirection=null}nine.canScroll=!1;var i=n-e,r,c=0,l,a,s=function e(n){return n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1},u=function o(){c+=16,l=c/nine.duration,l>1?(l=1,a=n):a=e+i*s(l),nine.scrollContainer.scrollTop=a,r=requestAnimationFrame(o),t(a)};r=requestAnimationFrame(u)},nine.scrollHandler=function(e){var n=document.getElementById(e),t=n.offsetTop;nine.canScroll=!0;var o=null;window.addEventListener("wheel",function(e){if(nine.scrollStart=nine.scrollContainer.scrollTop,null!==o)return e.preventDefault(),!1;if(nine.canScroll){o=setTimeout(function(){o=null},3*nine.duration);var i=n.scrollHeight,r=i/2,c=window.innerHeight,l=nine.scrollStart+c,a=l-t,s=t+i-nine.scrollStart,u=a>=0,d=a>r,f=s>=0,p=s>r,m=e.deltaY>0;(m&&u&&!d||!m&&f&&!p)&&(e.preventDefault(),nine.scrollTo(nine.scrollStart,t))}else e.preventDefault()})},nine.scrollToPage=function(e,n){nine.scrollStart=nine.scrollContainer.scrollTop,void 0===n&&(n=0);var t;t="up"===nine.scrollDirection&&!0===nine.sticky?document.getElementById(e).offsetTop-document.getElementById(e).offsetHeight-n:document.getElementById(e).offsetTop-n,nine.scrollTo(nine.scrollStart,t)},nine.keyboardNav=function(){document.onkeydown=function(e){e||(e=window.event);var n=e.keyCode;switch(e.charCode&&0==n&&(n=e.charCode),n){case 38:e.preventDefault(),nine.prevPage();break;case 40:e.preventDefault(),nine.nextPage();break}}},nine.calculateOffset=function(){var e=nine.pages[nine.currentPage-1].id,n=0;if(nine.sticky){if(nine.currentPage+1<nine.pages.length){var t=document.getElementById(nine.pages[nine.currentPage+1].id).offsetTop,o=document.getElementById(e),i=o.offsetTop+o.offsetHeight;t!=i&&(n=i-t)}else{var r=document.documentElement.scrollTop||nine.scrollContainer.scrollTop,c=document.getElementById(nine.pages[nine.currentPage].id).offsetTop;r!=c&&(n=r-c)}return n}return 0},nine.nextPage=function(){if(nine.currentPage+1<nine.pages.length&&nine.canScroll){nine.scrollDirection="down";var e=nine.pages[nine.currentPage+1].id;return nine.scrollToPage(e),!0}return!1},nine.prevPage=function(){if(nine.currentPage-1>=0&&nine.canScroll){nine.scrollDirection="up";var e=nine.pages[nine.currentPage-1].id;return nine.scrollToPage(e,nine.calculateOffset()),!0}return!1},nine.controls=function(){var e=0;Array.prototype.forEach.call(nine.pages,function(n){var t=document.createElement("li");t.setAttribute("data-page",e),document.querySelector(".dots").appendChild(t),t.addEventListener("click",function(e){return nine.dotClick(e)}),e++}),document.querySelector(".dots li").classList.add("active"),document.querySelector(".next").addEventListener("click",function(){return nine.nextPage()}),document.querySelector(".prev").addEventListener("click",function(){return nine.prevPage()}),nine.updateControls()},nine.dotClick=function(e){var n=e.target.getAttribute("data-page"),t=nine.pages[n].id,o=0;if(n>nine.currentPage)nine.scrollDirection="down";else if(n<nine.currentPage&&(nine.scrollDirection="up",nine.sticky)){for(var i=nine.currentPage-1-n,r=1;r<=i;r++){var c=nine.pages[nine.currentPage-r].id;o+=document.getElementById(c).offsetHeight}o+=nine.calculateOffset()}nine.scrollToPage(t,o)},nine.updateControls=function(){document.querySelector(".dots li.active").classList.remove("active"),document.querySelectorAll(".dots li")[nine.currentPage].classList.add("active"),document.querySelector(".next").classList.remove("disabled"),document.querySelector(".prev").classList.remove("disabled"),0==nine.currentPage&&document.querySelector(".prev").classList.add("disabled"),nine.currentPage==nine.pages.length-1&&document.querySelector(".next").classList.add("disabled")},nine.checkSticky=function(){var e=document.createElement("a"),n=e.style;return n.cssText="position:sticky;position:-webkit-sticky;position:-ms-sticky;",-1!==n.position.indexOf("sticky")},nine.swipeScroll=function(){Array.prototype.forEach.call(nine.pages,function(e){new nine.scrollHandler(e.id)})},nine.animatePortrait=function(){var e=document.getElementById("two"),n=e.offsetTop,t=document.querySelector(".portrait .faded"),o=.85;nine.scrollContainer.addEventListener("scroll",function(i){var r=document.documentElement.scrollTop||nine.scrollContainer.scrollTop;e.offsetWidth>1280?(console.log("here"),o=.5):e.offsetWidth<1024&&(n=e.offsetHeight+document.getElementById("one").offsetHeight-t.offsetHeight),r>n*o?0==t.style.opacity&&(t.style.opacity=1):1==t.style.opacity&&(t.style.opacity=0)})},document.addEventListener("DOMContentLoaded",function(){nine.scrollSpy(),nine.sticky=nine.checkSticky(),nine.keyboardNav(),nine.controls()}),window.onload=function(){nine.animateLoad(),nine.animatePortrait()};
//# sourceMappingURL=./main-min.js.map