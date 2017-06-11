var nine = {};

/* ==========================================================================
  nine.scrollSpy()
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
  var scrolled = document.getElementById('scroll');

  scrolled.addEventListener('scroll', function(event) {

    var scrollPosition = document.documentElement.scrollTop || scrolled.scrollTop;

    for (i in sections) {
      if (sections[i].top <= scrollPosition) {
        if (sections[i].classes.includes('light')) {
          nine.changeHeaderClass('dark');
        } else {
          nine.changeHeaderClass('light');
        }
      }
    }
  });
};

/* ==========================================================================
  nine.chnageHeaderClass
   ========================================================================== */

nine.changeHeaderClass = (className) => {
  document.querySelector('.header').setAttribute('class', `header ${className}`);
};

/* ==========================================================================
  nine.animatation()
   ========================================================================== */

 nine.animateLoad = () => {
   document.body.className = '';

   window.setTimeout(() => {
     var hidden = document.querySelectorAll(".hide-left");
     Array.prototype.forEach.call(hidden, function(el, i) {
       el.classList.remove('hide-left');
     });

     var hidden = document.querySelectorAll(".hide-down");
     Array.prototype.forEach.call(hidden, function(el, i) {
       el.classList.remove('hide-down');
     });
   }, 1000)
 };

 /* ==========================================================================
  nine.scrollHandler()
   ========================================================================== */

// Constructor cannot be ES6 arrow
nine.scrollHandler = function(pageId) {
  var page = document.getElementById(pageId);
  var pageStart = page.offsetTop;
  var canScroll = true;
  var viewStart;
  var duration = 1000;
  var scrolled = document.getElementById('scroll');
  var timeout = null;

  function scrollToPage() {
    canScroll = false;

    // Calculate how far to scroll
    var startLocation = viewStart;
    var endLocation = pageStart;
    var distance = endLocation - startLocation;

    var runAnimation;

    // Set the animation variables to 0/undefined.
    var timeLapsed = 0;
    var percentage, position;

    var easing = function (progress) {
      return progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1; // acceleration until halfway, then deceleration
    };

    function stopAnimationIfRequired(pos) {
      if (pos == endLocation) {
        cancelAnimationFrame(runAnimation);
        canScroll = true;
      }
    }

    var animate = function () {
      timeLapsed += 16;
      percentage = timeLapsed / duration;
      if (percentage > 1) {
        percentage = 1;
        position = endLocation;
      } else {
        position = startLocation + distance * easing(percentage);
      }
      scrolled.scrollTop = position;
      runAnimation = requestAnimationFrame(animate);
      stopAnimationIfRequired(position);
    };

    // Loop the animation function
    runAnimation = requestAnimationFrame(animate);
  }

  window.addEventListener('wheel', function(event) {
    if (timeout !== null) {
        event.preventDefault();
        return false;
    }

    //Get the top of the scroll start
    viewStart = scrolled.scrollTop;

    if (canScroll) {
      timeout = setTimeout(function(){ timeout = null; }, duration * 1.5);

      var pageHeight = page.scrollHeight;
      var pageStopPortion = pageHeight / 2;
      var viewHeight = window.innerHeight;

      var viewEnd = viewStart + viewHeight;
      var pageStartPart = viewEnd - pageStart;
      var pageEndPart = (pageStart + pageHeight) - viewStart;

      var canJumpDown = pageStartPart >= 0;
      var stopJumpDown = pageStartPart > pageStopPortion;

      var canJumpUp = pageEndPart >= 0;
      var stopJumpUp = pageEndPart > pageStopPortion;

      var scrollingForward = event.deltaY > 0;

      if (  ( scrollingForward && canJumpDown && !stopJumpDown)
         || (!scrollingForward && canJumpUp   && !stopJumpUp)) {
        event.preventDefault();
        scrollToPage();
      }
    } else {
     event.preventDefault();
    }
  });
}


/* ==========================================================================
  Document Load
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  nine.scrollSpy();

  new nine.scrollHandler('one');
  new nine.scrollHandler('two');
  new nine.scrollHandler('three');
  new nine.scrollHandler('four');
});


/* ==========================================================================
  Window Load
   ========================================================================== */

window.onload = () => {
  nine.animateLoad();
};
