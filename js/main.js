var nine = {};

/* ==========================================================================
  cgts.homepageSnap
========================================================================== */

nine.scrollSpy = () => {
  var section = document.querySelectorAll(".section");
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function(el, i) {
    sections[i] = {
      classes: el.className.replace('section', '').trim(),
      top: el.offsetTop - 50,
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

document.addEventListener("DOMContentLoaded", () => {
  nine.scrollSpy();
});

window.onload = () => {
  document.body.className = '';


  window.setTimeout(() => {
    var hidden = document.querySelectorAll(".hide-left");
    Array.prototype.forEach.call(hidden, function(el, i) {
      console.log(el);
      el.classList.remove('hide-left');
    });

    var hidden = document.querySelectorAll(".hide-down");
    Array.prototype.forEach.call(hidden, function(el, i) {
      console.log(el);
      el.classList.remove('hide-down');
    });
  }, 1000)
};
