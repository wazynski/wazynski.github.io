var nine = {
  canScroll: true,
  duration: 1000,
  scrollContainer: document.getElementById('scroll'),
  scrollStart: 0,
  pages: document.querySelectorAll(".section"),
  currentPage: 0,
  scrollDirection: null,
  sticky: false,
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
      top: el.offsetTop,
      bottom: el.offsetTop + el.offsetHeight,
      height: el.offsetHeight,
    }
  });

  nine.scrollContainer.addEventListener('scroll', function(event) {

    var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;

    for (i in sections) {
      if (scrollPosition >= sections[i].top  && scrollPosition <= sections[i].bottom) {

        if (sections[i].classes.includes('light')) {
          nine.changeHeaderClass('dark');
        } else {
          nine.changeHeaderClass('light');
        }
      }

      // Count as being in next page if 25% scrolled into it.
      if ((scrollPosition >= sections[i].top - (sections[i].height * 0.75))  && scrollPosition <= sections[i].bottom) {
        if (nine.currentPage != i) {
          nine.currentPage = parseInt(i);
          nine.updateControls();
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
  nine.scrollTo()
  ========================================================================== */

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
     finishedScroll();
   }
  }

  function finishedScroll() {
    nine.canScroll = true;
    nine.scrollDirection = null;
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

    if (timeout !== null) {
        event.preventDefault();
        return false;
    }

    if (nine.canScroll) {
      timeout = setTimeout(function(){ timeout = null; }, nine.duration * 3);

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

/* ==========================================================================
  nine.scrollToPage()
   ========================================================================== */

nine.scrollToPage = (pageID, offset) => {
  // Get current scroll location and where the page starts
  nine.scrollStart = nine.scrollContainer.scrollTop;

  if(typeof offset === "undefined") {
    offset = 0;
  }

  var pageStart;

  if (nine.scrollDirection === "up" && nine.sticky === true) {
    pageStart = document.getElementById(pageID).offsetTop - document.getElementById(pageID).offsetHeight - offset;
  } else {
    pageStart = document.getElementById(pageID).offsetTop - offset;
  }

  nine.scrollTo(nine.scrollStart, pageStart);
}

/* ==========================================================================
  nine.keyboardNav()
   ========================================================================== */

nine.keyboardNav = () => {
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
        event.preventDefault();
        nine.prevPage();
        break;
      case 40: // Down
        event.preventDefault();
        nine.nextPage();
      break;
    }

  };

}

/* ==========================================================================
  nine.nextPage()
   ========================================================================== */

nine.nextPage = () => {
  if (nine.currentPage + 1 < nine.pages.length && nine.canScroll) {
    nine.scrollDirection = 'down';
    var nextPage = nine.pages[nine.currentPage + 1].id;

    nine.scrollToPage(nextPage);
    return true;
  }
  return false;
}

/* ==========================================================================
  nine.prevPage()
   ========================================================================== */

nine.prevPage = () => {
  if (nine.currentPage - 1 >= 0 && nine.canScroll) {
    nine.scrollDirection = 'up';
    var prevPage = nine.pages[nine.currentPage - 1].id;
    var offset = 0;

   // If user has manuall scrolled part way onto next one there will be an offset to account for.
   if (nine.sticky) {
      if (nine.currentPage + 1 < nine.pages.length) {
        var nextPageOffset = document.getElementById(nine.pages[nine.currentPage + 1].id).offsetTop
        var prevPageEl = document.getElementById(prevPage);
        var prevPageOffsetBottom = prevPageEl.offsetTop + prevPageEl.offsetHeight;

        console.log(nextPageOffset);
        console.log(prevPageOffsetBottom);

        if (nextPageOffset != prevPageOffsetBottom) {
          offset = prevPageOffsetBottom - nextPageOffset;
        }
      } else {
        var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
        var currentPageOffset = document.getElementById(nine.pages[nine.currentPage].id).offsetTop;

        if (scrollPosition != currentPageOffset) {
          offset = scrollPosition - currentPageOffset;
        }
      }
    }

    nine.scrollToPage(prevPage, offset);
    return true;
  }
  return false;
}

function debounce(fn, delay) {
    var timeout;

    return function () {
        var context = this,
            args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(context, args);
        }, delay || 250);
    };
}

/* ==========================================================================
  nine.controls()
   ========================================================================== */

nine.controls = () => {
  Array.prototype.forEach.call(nine.pages, function(el) {
    document.querySelector('.dots').appendChild(document.createElement('li'));
  });

  document.querySelector('.dots li').classList.add('active')

  document.querySelector('.next').addEventListener('click', () => nine.nextPage());
  document.querySelector('.prev').addEventListener('click', () => nine.prevPage());

  nine.updateControls();
}

/* ==========================================================================
  nine.updateControls()
   ========================================================================== */

nine.updateControls = () => {
  document.querySelector('.dots li.active').classList.remove('active');
  document.querySelectorAll('.dots li')[nine.currentPage].classList.add('active');

  document.querySelector('.next').classList.remove('disabled');
  document.querySelector('.prev').classList.remove('disabled');

  if (nine.currentPage == 0) {
    document.querySelector('.prev').classList.add('disabled');
  }

  if (nine.currentPage == nine.pages.length - 1) {
    document.querySelector('.next').classList.add('disabled');
  }
}

/* ==========================================================================
  nine.checkSticky()
   ========================================================================== */

nine.checkSticky = () => {
  return false; // turn stick off
  var el = document.createElement('a'),
    mStyle = el.style;
    mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;";
  return mStyle.position.indexOf('sticky')!==-1;
}

/* ==========================================================================
  nine.swipeScroll()
   ========================================================================== */

nine.swipeScroll = () => {
  Array.prototype.forEach.call(nine.pages, function(el) {
    new nine.scrollHandler(el.id);
  });
}

/* ==========================================================================
  Document Load
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  nine.scrollSpy();
  nine.sticky = nine.checkSticky();

  // nine.swipeScroll();
  nine.keyboardNav();
  nine.controls();
});

/* ==========================================================================
  Window Load
   ========================================================================== */

window.onload = () => {
  nine.animateLoad();
};
