var nine = {};

/* ==========================================================================
  cgts.homepageSnap
========================================================================== */

(function() {
  // 'use strict';

  var section = document.querySelectorAll(".section");
  var sections = {};
  var i = 0;

  console.log(section);

  Array.prototype.forEach.call(section, function(el, i) {
    console.log(el.className);
    console.log(el.offsetTop);
    sections[i] = {
      classes: el.className.replace('section', '').trim(),
      top: el.offsetTop,
    }
  });

  console.log(sections);

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i].top <= scrollPosition) {


        if (sections[i].classes.includes('light')) {
          console.log('menu dark');
          document.querySelector('.header').setAttribute('class', 'header dark');
        } else {
          console.log('menu light');
          document.querySelector('.header').setAttribute('class', 'header light');
        }
        //string.includes(substring); //ES6

        // document.querySelector('.active').setAttribute('class', ' ');
        // document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
      }
    }
  };
})();


document.addEventListener("DOMContentLoaded", function() {

});
