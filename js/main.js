var nine = {
  canScroll: true,
  duration: 1000,
  scrollContainer: document.getElementById('scroll'),
  scrollStart: 0,
  pages: document.querySelectorAll(".section"),
  currentPage: 0,
};

/* ==========================================================================
  nine.scrollSpy()
========================================================================== */

nine.scrollSpy = () => {
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(nine.pages, function(el, i) {
    sections[i] = {
      classes: el.className.replace('section', '').trim(),
      top: el.offsetTop - 50,
    }
  });

  console.log(sections);

  nine.scrollContainer.addEventListener('scroll', function(event) {

    var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;

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

nine.scrollTo = (startLocation, endLocation) => {
  nine.canScroll = false;

  // Calculate how far to scroll
  // var startLocation = viewStart;
  // var endLocation = pageStart;
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
     nine.canScroll = true;
   }
  }

  var animate = function () {
   timeLapsed += 16;
   percentage = timeLapsed / nine.duration;
   if (percentage > 1) {
     percentage = 1;
     position = endLocation;
   } else {
     position = startLocation + distance * easing(percentage);
   }
   nine.scrollContainer.scrollTop = position;
   runAnimation = requestAnimationFrame(animate);
   stopAnimationIfRequired(position);
  };

  // Loop the animation function
  runAnimation = requestAnimationFrame(animate);
}

 /* ==========================================================================
  nine.scrollHandler()
   ========================================================================== */

// Constructor cannot be ES6 arrow
nine.scrollHandler = function(pageId) {
  var page = document.getElementById(pageId);
  var pageStart = page.offsetTop;
  nine.canScroll = true;
  var timeout = null;



  window.addEventListener('wheel', function(event) {
    nine.scrollStart = nine.scrollContainer.scrollTop;

    console.log(nine.scrollStart);

    if (timeout !== null) {
        console.log('timout in progress');
        event.preventDefault();
        return false;
    }

    if (nine.canScroll) {
      timeout = setTimeout(function(){ timeout = null; }, nine.duration * 1.5);

      var pageHeight = page.scrollHeight;
      var pageStopPortion = pageHeight / 2;
      var viewHeight = window.innerHeight;

      var viewEnd = nine.scrollStart + viewHeight;
      var pageStartPart = viewEnd - pageStart;
      var pageEndPart = (pageStart + pageHeight) - nine.scrollStart;

      var canJumpDown = pageStartPart >= 0;
      var stopJumpDown = pageStartPart > pageStopPortion;

      var canJumpUp = pageEndPart >= 0;
      var stopJumpUp = pageEndPart > pageStopPortion;

      var scrollingForward = event.deltaY > 0;

      if (  ( scrollingForward && canJumpDown && !stopJumpDown)
         || (!scrollingForward && canJumpUp   && !stopJumpUp)) {
        event.preventDefault();
        nine.scrollTo(nine.scrollStart, pageStart);
      }
    } else {
     event.preventDefault();
    }
  });
}

nine.scrollToPage = (pageID) => {
  // Get current scroll location and where the page starts
  nine.scrollStart = nine.scrollContainer.scrollTop;
  var pageStart = document.getElementById(pageID).offsetTop;
  nine.scrollTo(nine.scrollStart, pageStart);
}

nine.keyboardNav = () => {
  console.log('here');

  document.onkeydown = function(event) {
    if (!event) {
      event = window.event;
    }

    var code = event.keyCode;

    if (event.charCode && code == 0) {
      code = event.charCode;
    }

    switch(code) {
      case 38: // Up
        var prevPage = nine.pages[nine.currentPage - 1].id;
        nine.currentPage -= 1;

        nine.scrollToPage(prevPage);
        break;
      case 40: // Down
        var nextPage = nine.pages[nine.currentPage + 1].id;
        nine.currentPage += 1;

        nine.scrollToPage(nextPage);
      break;
    }
    event.preventDefault();
  };

}


/* ==========================================================================
  Document Load
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  nine.scrollSpy();

  console.log(nine.scrollStart);

  Array.prototype.forEach.call(nine.pages, function(el) {
    new nine.scrollHandler(el.id);
  });

  nine.keyboardNav();
});


/* ==========================================================================
  Window Load
   ========================================================================== */

window.onload = () => {
  nine.animateLoad();
};
