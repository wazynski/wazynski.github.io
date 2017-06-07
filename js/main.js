var nine = {};

/* ==========================================================================
  cgts.homepageSnap
========================================================================== */

nine.scrollSpy = () => {
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
          nine.changeHeaderClass('dark');
        } else {
          nine.changeHeaderClass('light');
        }
      }
    }
  };
}

nine.changeHeaderClass = (className) => {
  document.querySelector('.header').setAttribute('class', `header ${className}`);
}

document.addEventListener("DOMContentLoaded", function() {
  nine.scrollSpy();
});
