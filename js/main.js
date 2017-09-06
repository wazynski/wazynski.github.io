var nine = {
  sticky: false,
  fullscreen: false,
  // Scolling Related
  currentPageIndex: null,
  currentPage: null,
  canScroll: true,
  scrollDuration: 750,
  scrollContainer: document.getElementById('scroll'),
  pages: document.querySelectorAll(".section"),
  scrollDirection: null,
  prevTime: new Date().getTime(),
  scrollHistory: [],
  windowHeight: null,
};

/* ==========================================================================
    Polyfils
   ========================================================================== */

if (!String.prototype.includes) {
   String.prototype.includes = function(search, start) {
     if (typeof start !== 'number') {
       start = 0;
     }

     if (start + search.length > this.length) {
       return false;
     } else {
       return this.indexOf(search, start) !== -1;
     }
   };
 }

/* ==========================================================================
  nine.scrollSpy()
========================================================================== */

// nine.scrollSpy = () => {
//   var sections = {};
//   var i = 0;
//
//   Array.prototype.forEach.call(nine.pages, function(el, i) {
//     sections[i] = {
//       classes: el.className.replace('section', '').trim(),
//       top: el.offsetTop,
//       bottom: el.offsetTop + el.offsetHeight,
//       height: el.offsetHeight,
//     }
//   });
//
//   nine.scrollContainer.addEventListener('scroll', function(event) {
//
//     var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
//
//     for (i in sections) {
//       if (scrollPosition >= sections[i].top  && scrollPosition <= sections[i].bottom) {
//         var activeSections = document.querySelector('.section.active');
//
//         if (activeSections) {
//           activeSections.classList.remove('active');
//         }
//
//         var currentPage = document.querySelectorAll('.section')[parseInt(i)];
//
//         if (currentPage) {
//           currentPage.classList.add('active')
//         }
//
//         if (nine.currentPage != i) {
//           // TODO: rethink how things work with hash nav
//           // Causeing browser jumping
//           // window.location.hash=currentPage.id;
//         }
//
//         if (sections[i].classes.includes('light')) {
//           nine.changeHeaderClass('dark');
//         } else {
//           nine.changeHeaderClass('light');
//         }
//       }
//
//       // Count as being in next page if 25% scrolled into it.
//       var scrollOffset = 0.75;
//
//       if ((scrollPosition >= sections[i].top - (sections[i].height * scrollOffset)) && scrollPosition <= sections[i].bottom) {
//         if (nine.currentPage != i) {
//           nine.currentPage = parseInt(i);
//           nine.updateControls();
//         }
//       }
//     }
//   });
// };

/* ==========================================================================
  nine.scrollTo()
  ========================================================================== */
//
// nine.scrollTo = (startLocation, endLocation) => {
//   nine.canScroll = false;
//
//   // Calculate how far to scroll
//   // var startLocation = viewStart;
//   // var endLocation = pageStart;
//   var distance = endLocation - startLocation;
//
//   var runAnimation;
//
//   // Set the animation variables to 0/undefined.
//   var timeLapsed = 0;
//   var percentage, position;
//
//   var easing = function (progress) {
//    return progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1; // acceleration until halfway, then deceleration
//   };
//
//   function stopAnimationIfRequired(pos) {
//    if (pos == endLocation) {
//      cancelAnimationFrame(runAnimation);
//      finishedScroll();
//    }
//   }
//
//   function finishedScroll() {
//     nine.canScroll = true;
//     nine.scrollDirection = null;
//   }
//
//   var animate = function () {
//    timeLapsed += 16;
//    percentage = timeLapsed / nine.scrollDuration;
//    if (percentage > 1) {
//      percentage = 1;
//      position = endLocation;
//    } else {
//      position = startLocation + distance * easing(percentage);
//    }
//    nine.scrollContainer.scrollTop = position;
//    runAnimation = requestAnimationFrame(animate);
//    stopAnimationIfRequired(position);
//   };
//
//   // Loop the animation function
//   runAnimation = requestAnimationFrame(animate);
// }

/* ==========================================================================
  nine.scrollHandler()
  ========================================================================== */
//
// // Constructor cannot be ES6 arrow
// nine.scrollHandler = function(pageId) {
//   var page = document.getElementById(pageId);
//   var pageStart = page.offsetTop;
//   nine.canScroll = true;
//   var timeout = null;
//
//   nine.scrollListener = window.addEventListener('wheel', function(event) {
//     nine.scrollStart = nine.scrollContainer.scrollTop;
//
//     if (timeout !== null) {
//         event.preventDefault();
//         return false;
//     }
//
//     if (nine.canScroll) {
//       timeout = setTimeout(function(){ timeout = null; }, nine.scrollDuration * 3);
//
//       var pageHeight = page.scrollHeight;
//       var pageStopPortion = pageHeight / 2;
//       var viewHeight = window.innerHeight;
//
//       var viewEnd = nine.scrollStart + viewHeight;
//       var pageStartPart = viewEnd - pageStart;
//       var pageEndPart = (pageStart + pageHeight) - nine.scrollStart;
//
//       var canJumpDown = pageStartPart >= 0;
//       var stopJumpDown = pageStartPart > pageStopPortion;
//
//       var canJumpUp = pageEndPart >= 0;
//       var stopJumpUp = pageEndPart > pageStopPortion;
//
//       var scrollingForward = event.deltaY > 0;
//
//       if (  ( scrollingForward && canJumpDown && !stopJumpDown)
//          || (!scrollingForward && canJumpUp   && !stopJumpUp)) {
//         event.preventDefault();
//         nine.scrollTo(nine.scrollStart, pageStart);
//       }
//     } else {
//      event.preventDefault();
//     }
//   });
// }

/* ==========================================================================
  nine.scrollToPage()
   ========================================================================== */
//
// nine.scrollToPage = (pageID, offset) => {
//   // Get current scroll location and where the page starts
//   nine.scrollStart = nine.scrollContainer.scrollTop;
//
//   if (typeof offset === "undefined") {
//     offset = 0;
//   }
//
//   var pageStart;
//
//   if (nine.scrollDirection === "up" && nine.sticky === true) {
//     pageStart = document.getElementById(pageID).offsetTop - document.getElementById(pageID).offsetHeight - offset;
//   } else {
//     pageStart = document.getElementById(pageID).offsetTop - offset;
//   }
//
//   nine.scrollTo(nine.scrollStart, pageStart);
// }

/* ==========================================================================
  nine.keyboardNav()
   ========================================================================== */
//
// nine.keyboardNav = () => {
//   document.onkeydown = function(event) {
//     if (!event) {
//       event = window.event;
//     }
//
//     var code = event.keyCode;
//
//     if (event.charCode && code == 0) {
//       code = event.charCode;
//     }
//
//     switch(code) {
//       case 38: // Up
//         event.preventDefault();
//         nine.prevPage();
//         break;
//       case 40: // Down
//         event.preventDefault();
//         nine.nextPage();
//       break;
//     }
//
//   };
// }

/* ==========================================================================
  nine.calculateOffset()
   ========================================================================== */
//
// nine.calculateOffset = () => {
//   var prevPage = nine.pages[nine.currentPage - 1].id;
//   var offset = 0;
//
//   // If user has manuall scrolled part way onto next one there will be an offset to account for.
//   if (nine.sticky) {
//      if (nine.currentPage + 1 < nine.pages.length) {
//        var nextPageOffset = document.getElementById(nine.pages[nine.currentPage + 1].id).offsetTop
//        var prevPageEl = document.getElementById(prevPage);
//        var prevPageOffsetBottom = prevPageEl.offsetTop + prevPageEl.offsetHeight;
//
//        if (nextPageOffset != prevPageOffsetBottom) {
//          offset = prevPageOffsetBottom - nextPageOffset;
//        }
//      } else {
//        var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
//        var currentPageOffset = document.getElementById(nine.pages[nine.currentPage].id).offsetTop;
//
//        if (scrollPosition != currentPageOffset) {
//          offset = scrollPosition - currentPageOffset;
//        }
//      }
//      return offset;
//    } else {
//      return 0;
//    }
// };

/* ==========================================================================
  nine.nextPage()
   ========================================================================== */
//
// nine.nextPage = () => {
//   if (nine.currentPage + 1 < nine.pages.length && nine.canScroll) {
//     nine.scrollDirection = 'down';
//     var nextPage = nine.pages[nine.currentPage + 1].id;
//     nine.scrollToPage(nextPage);
//     return true;
//   }
//   return false;
// }

/* ==========================================================================
  nine.prevPage()
   ========================================================================== */
//
// nine.prevPage = () => {
//   if (nine.currentPage - 1 >= 0 && nine.canScroll) {
//     nine.scrollDirection = 'up';
//     var prevPage = nine.pages[nine.currentPage - 1].id;
//     nine.scrollToPage(prevPage, nine.calculateOffset());
//     return true;
//   }
//   return false;
// }


/* ==========================================================================
  nine.controls()
   ========================================================================== */
//
// nine.controls = () => {
//   var pageIndex = 0;
//
//   var dots = document.querySelector('.dots')
//   if (dots) {
//     Array.prototype.forEach.call(nine.pages, function(el) {
//       var dot = document.createElement('li');
//       dot.setAttribute('data-page', pageIndex);
//       dots.appendChild(dot);
//       dot.addEventListener('click', (e) => nine.dotClick(e));
//
//       pageIndex++;
//     });
//
//     document.querySelector('.dots li').classList.add('active')
//
//     document.querySelector('.next').addEventListener('click', () => nine.nextPage());
//     document.querySelector('.prev').addEventListener('click', () => nine.prevPage());
//
//     nine.updateControls();
//   }
// }

/* ==========================================================================
  nine.dotClick()
   ========================================================================== */
//
// nine.dotClick = (e) => {
//   var pageIndex = e.target.getAttribute('data-page');
//   var pageId = nine.pages[pageIndex].id
//   var offset = 0;
//   if (pageIndex > nine.currentPage) {
//     nine.scrollDirection = 'down';
//   } else if (pageIndex < nine.currentPage) {
//     nine.scrollDirection = 'up';
//     if (nine.sticky) {
//       var gap = nine.currentPage - 1 - pageIndex;
//
//       for (var i = 1; i <= gap; i++) {
//         var id = nine.pages[nine.currentPage - i].id
//
//         offset += document.getElementById(id).offsetHeight;
//       }
//       offset += nine.calculateOffset();
//     }
//   }
//
//   nine.scrollToPage(pageId, offset);
// };

/* ==========================================================================
  nine.updateControls()
   ========================================================================== */
//
// nine.updateControls = () => {
//   document.querySelector('.dots li.active').classList.remove('active');
//   document.querySelectorAll('.dots li')[nine.currentPage].classList.add('active');
//
//   document.querySelector('.next').classList.remove('disabled');
//   document.querySelector('.prev').classList.remove('disabled');
//
//   if (nine.currentPage == 0) {
//     document.querySelector('.prev').classList.add('disabled');
//   }
//
//   if (nine.currentPage == nine.pages.length - 1) {
//     document.querySelector('.next').classList.add('disabled');
//   }
// }

/* ==========================================================================
  nine.checkFullscreen()
   ========================================================================== */

nine.checkFullscreen = () => {
  // return false; // turn fullscreen off
  var fullscreen = true;

  var windowHeight = nine.windowSize().h;

  // if any section is longer the window height disable fullscreen
  nine.pages.forEach(function(el) {
    if (el.offsetHeight > windowHeight) {
      fullscreen = false;
    }
  });

  return fullscreen;
}

/* ==========================================================================
  enableFullscreen()
  - Enable fullscreen mode if checkFullscreen passes
   ========================================================================== */

nine.enableFullscreen = (debounced) => {
  if (nine.checkFullscreen()) {
    nine.fullscreen = true;
    document.body.classList.add("fullscreen");
    nine.windowHeight = nine.windowSize().h; // Used to help with resize
  } else {
    nine.fullscreen = false;
    document.body.classList.remove("fullscreen");
    nine.windowHeight = nine.windowSize().h; // Used to help with resize
  }
};

/* ==========================================================================
  nine.checkSticky() - http://trialstravails.bspot.co.uk/2016/06/detecting-css-position-sticky-support.html
   ========================================================================== */

nine.checkSticky = () => {
  // return false; // turn stick off
  var el = document.createElement('a');
  var mStyle = el.style;

  mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;";
  var sticky = mStyle.position.indexOf('sticky')!==-1;

  var windowHeight = nine.windowSize().h;

  return sticky;
}

/* ==========================================================================
  enableSticky()
  - Enable Sticky
   ========================================================================== */

nine.enableSticky = (debounced) => {
  if (nine.checkSticky() && nine.checkFullscreen()) {
    nine.sticky = true;
    nine.fullscreen = true;
    document.body.classList.add("sticky-enabled");
  } else {
    nine.sticky = false;
    document.body.classList.remove("sticky-enabled");
  }
};

/* ==========================================================================
  nine.changeHeaderClass
   ========================================================================== */

nine.changeHeaderClass = (className) => {
  document.querySelector('.header').setAttribute('class', `header ${className}`);
};

/* ==========================================================================
  nine.animatation()
   ========================================================================== */

nine.animateLoad = () => {
  window.setTimeout(() => {
    document.body.classList.add('faded-in');
    nine.masonaryHeight();

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
  }, 1000);
};

/* ==========================================================================
  nine.animatePortrait()
   ========================================================================== */

nine.animatePortrait = () => {
  var portrait = document.querySelector('.portrait .faded');

  if (portrait) {
    var page = document.getElementById('about');
    var offsetTop = page.offsetTop;
    var startPoint = 0.98;

    function portraitChange() {
      var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;

      if (nine.windowSize().w > 1280) {
        startPoint = 0.5;
      } else if (nine.windowSize().w < 1024) {
        offsetTop = page.offsetHeight + document.getElementById('intro').offsetHeight - portrait.offsetHeight;
      }

      if (scrollPosition > offsetTop * startPoint) {
        if (portrait.style.opacity == 0) {
          portrait.style.opacity = 1;
        }
      } else {
        if (portrait.style.opacity == 1) {
          portrait.style.opacity = 0;
        }
      }
    }

    nine.scrollContainer.addEventListener('scroll', function(event) {
      portraitChange();
    });
  }
};

/* ==========================================================================
  nine.pageTransisition()
   ========================================================================== */

nine.pageTransisition = (href, bg, slide) => {
  if (!bg) {
    bg = '#E6E6E4';
  }

  document.body.style.backgroundColor = bg;
  document.body.classList.add('faded-out');

  setTimeout(function(){
    window.location.href = href;
  }, 600);
};

/* ==========================================================================
  nine.aboutHeight
   ========================================================================== */

nine.masonaryHeight = () => {
  var masonary = document.querySelector('.masonary')
  let lheight = 0;
  let rheight = 0;
  if (masonary) {
    if (nine.windowSize().w >= 1024) {
      var lblocks = document.querySelectorAll('.block.left');
      var rblocks = document.querySelectorAll('.block.right');

      Array.prototype.forEach.call(lblocks, function(el, i) {
        lheight += el.offsetHeight;
      });

      Array.prototype.forEach.call(rblocks, function(el, i) {
        rheight += el.offsetHeight;
      });

      let height;

      if (lheight >= rheight) {
        height = lheight;
      } else {
        height = rheight;
      }

      height += 100;
      masonary.style.height = height + 'px';
    } else {
      masonary.style.height = 'auto';
    }
  }
};

/* ==========================================================================
  nine.animateLinks
   ========================================================================== */

nine.animateLinks = () => {
  var anchorElements = document.getElementsByTagName('a');
  Array.prototype.forEach.call(anchorElements, function(el, i) {
    el.onclick = function() {
      nine.pageTransisition(this.href, el.getAttribute('data-bg'), el.getAttribute('data-slide'));
      return false;
    }
  });
};

// ##########################################################################










// ##########################################################################
/* ==========================================================================
   Scrolling
   ==========================================================================
 // #########################################################################


 /* ==========================================================================
  setCurrentPage()
  - Sets the current page on load based off hash.
  ========================================================================== */

nine.setCurrentPage = () => {
  var section = nine.getHash();

  if(section) {
    var element = document.getElementById(section);

    if (element) {
      nine.updateCurrent(element);
      nine.scrollStart(element); // Simulate start of scroll to set all calsses correctly.
      nine.scrollToSection(element.id); // Make sure we are definley at the correct section.
    }
  } else {
    nine.updateCurrent(document.querySelectorAll(".section")[0]);
  }
};

/* ==========================================================================
    nine.updateHash(url)
    - Updates the hash in the url to the value of url.
  ========================================================================== */

nine.updateHash = (url) => {
  window.location.hash = url;
};

/* ==========================================================================
  nine.hashChangeLisener()
  ========================================================================== */

nine.hashChangeLisener = () => {
  if (document.addEventListener) {
    window.addEventListener('hashchange', nine.hashChangeHandler, false); //IE9, Chrome, Safari, Oper
  } else {
    window.attachEvent('onhashchange', nine.hashChangeHandler); //IE 6/7/8
  }
};

/* ==========================================================================
  nine.hashChangeHandler()
  - Listens to chnages on the hash when back button is used.
   ========================================================================== */

nine.hashChangeHandler = () => {
  var section = nine.getHash();

  if (section && section != nine.currentPage) {
    nine.scrollToSection(section);
  }
};

/* ==========================================================================
  nine.scrollToSection(destiny)
  - scroll to the a section using ID
   ========================================================================== */

nine.scrollToSection = (elementId, offset) => {
  var element = document.getElementById(elementId);

  if (element == null) { return ; } // No element

  // If there is a gap between slides increase the duration by the gap.
  // var gap = Math.abs(nine.currentPageIndex - nine.getSectionIndex(element));
  // var duration = nine.scrollDuration * gap;
  var duration = nine.scrollDuration;

  var destiny = nine.calculateDestiny(element, offset);

  nine.animateScoll(destiny, element, duration)
};

/* ==========================================================================
  nine.calculateOffset
  - If a user has scroled half way onto a section there will be an offset
    if position is sticky.
  - Returns offset in pixels.
   ========================================================================== */

nine.calculateOffset = () => {
  var offset = 0;

  // If user has manuall scrolled part way onto next one there will be an offset to account for.
  if (nine.sticky) {
    if (nine.currentPageIndex + 1 < nine.pages.length) {
      var nextPageOffset = document.getElementById(nine.pages[nine.currentPageIndex + 1].id).offsetTop
      var prevPage;

      if (nine.currentPageIndex -1 >= 0) {
        prevPage = nine.pages[nine.currentPageIndex - 1].id;
      } else {
        prevPage = nine.pages[nine.currentPageIndex].id;
      }

      var prevPageEl = document.getElementById(prevPage);
      var prevPageOffsetBottom = prevPageEl.offsetTop + prevPageEl.offsetHeight;

      if (nextPageOffset != prevPageOffsetBottom) {
        offset = prevPageOffsetBottom - nextPageOffset;
      }
     } else {
      var scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
      var currentPageOffset = document.getElementById(nine.pages[nine.currentPageIndex].id).offsetTop;

      if (scrollPosition != currentPageOffset) {
        offset = scrollPosition - currentPageOffset;
      }
    }
    return offset;
   } else {
     return 0;
   }
};

/* ==========================================================================
  nine.calculateGap(newIndex)
   ========================================================================== */

nine.calculateGap = (newIndex, element, offset) => {
  var gap = Math.abs(nine.currentPageIndex - newIndex) -1;

  for (var i = 1; i <= gap; i++) {
    var id = nine.pages[nine.currentPageIndex - i].id

    offset += element.offsetHeight;
  }
  return offset += nine.calculateOffset();
};

/* ==========================================================================
  nine.calculateDestiny()
  - Works out direction and depending on sticky corrects offset.
  - Returns the destiny in pixels.
   ========================================================================== */

nine.calculateDestiny = (element, offset) => {
  var destiny;

  if (typeof offset === "undefined") {
    offset = 0;
  }

  var newIndex = nine.getSectionIndex(element);
  if (newIndex > nine.currentPageIndex) {
    nine.scrollDirection = "down";
  } else if (newIndex < nine.currentPageIndex) {
    nine.scrollDirection = "up";
    if (nine.sticky) {
      offset = nine.calculateGap(newIndex, element, offset);
    }
  }

  // Calculate the pixel position of the element, using offset if required
  if (nine.scrollDirection === "up" && nine.sticky === true) {
    destiny = element.offsetTop - element.offsetHeight - offset;
  } else {
    destiny = element.offsetTop - offset;
  }

  return destiny;
}

/* ==========================================================================
  nine.animateScoll()
  - animate the scrolling of the page
  ========================================================================== */

nine.animateScoll = (endLocation, element, duration) => {
  if (endLocation == null) { return; }

  var startLocation = nine.getScrolledPosition();
  nine.canScroll = false;

  if (duration == null) {
    duration = nine.scrollDuration;
  }

  // Calculate how far to scroll
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
    // Remove active status from all
    nine.canScroll = true;
    nine.scrollDirection = null;
    nine.scrollEnd(element);
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
   nine.scrollContainer.scrollTop = position;
   runAnimation = requestAnimationFrame(animate);
   stopAnimationIfRequired(position);
  };

  nine.scrollStart(element);

  // Loop the animation function
  runAnimation = requestAnimationFrame(animate);
}

/* ==========================================================================
  nine.scrollStart()
  - Called just before scrolling starts
   ========================================================================== */

nine.scrollStart = (element) => {
  // Change header class - duration is same as slide duration for natural feel.
  if (element.classList.value.includes('light')) {
    nine.changeHeaderClass('dark');
  } else {
    nine.changeHeaderClass('light');
  }

  // Delay until part way through scroll to chnages make feel smooth.
  setTimeout(function() {
    // Remove other active classes
    var activePages = document.querySelector('.section.active');
    if (activePages) {
      nine.removeClass(activePages, 'active');
      nine.removeClass(document.body, activePages.id + '-active')
    }
    nine.addClass(element, 'active');
    nine.updateControls(nine.getSectionIndex(element));
  }, nine.scrollDuration * 0.33);
};

/* ==========================================================================
  nine.scrollEnd()
  - Called after an element has been scrolled to.
   ========================================================================== */

nine.scrollEnd = (element) => {
  if (element == null) { return ; } // No element

  // Update to new state.
  nine.updateHash(element.id);
  nine.updateCurrent(element);
  nine.updateControls();
  nine.addClass(document.body, element.id + '-active');
};

/* ==========================================================================
  nine.updateCurrent
  - Updates globals to current values
   ========================================================================== */

nine.updateCurrent = (element) => {
  nine.currentPage = element.id;
  nine.currentPageIndex = nine.getSectionIndex(element);
}

/* ==========================================================================
  nine.getScrolledPosition()
  - Returns position of scroll in the window in pixels.
   ========================================================================== */

nine.getScrolledPosition = () => {
  return document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
};

/* ==========================================================================
  nine.resetPosition()
  - Handles rezise events when fullscreen is one to make
    sure slide is positioned correctly.
   ========================================================================== */

nine.resetPosition = () => {
  if (nine.fullscreen == true) {
    var section,
        destiny;

    if (nine.currentPage != null) {
      var section = document.getElementById(nine.currentPage);
    } else {
      var section = document.querySelectorAll('.sections')[0];
      nine.currentPage = section.id;
      nine.currentPageIndex = 0;
    }

    var offset = nine.calculateOffset();

    if (nine.sticky && offset > 0) {
      destiny = section.offsetTop - offset;
    } else {
      destiny = section.offsetTop;
    }

    nine.animateScoll(destiny, section, 0);
  }
}

// ##########################################################################








// ##########################################################################
/* ==========================================================================
   Controls
   ==========================================================================
// ##########################################################################

/* ==========================================================================
  nine.addFullscreenNav()
  - adds dots and next & prev controls to site
  =========================================================================== */

nine.addFullscreenNav = () => {
  var controls = document.querySelector('.controls');

  if (controls) {
    controls.classList.add('on');

    var nav = document.querySelector('.dots')

    if (nav) {
      Array.prototype.forEach.call(nine.pages, function(el, i) {
        var dot = document.createElement('li');
        dot.setAttribute('data-page', i);
        nav.appendChild(dot);
        dot.addEventListener('click', (element) => nine.dotClick(element));
      });

      document.querySelector('.dots li').classList.add('active')

      document.querySelector('.next').addEventListener('click', nine.arrowNextClickHandler);
      document.querySelector('.prev').addEventListener('click', nine.arrowPrevClickHandler);

      nine.updateControls();
    }
  }
};

/* ==========================================================================
  nine.removeFullscreenNav()
  - remove dots and next & prev controls to site
  =========================================================================== */

nine.removeFullscreenNav = () => {
  var controls = document.querySelector('.controls');

  if (controls) {
    controls.classList.remove('on');

    var nav = document.querySelector('.dots')
    var dots = document.querySelectorAll('.dots li');

    if (nav && dots) {
      Array.prototype.forEach.call(dots, function(el, i) {
        el.parentNode.removeChild(el);
      });

      document.querySelector('.next').removeEventListener('click', nine.arrowNextClickHandler);
      document.querySelector('.prev').removeEventListener('click', nine.arrowPrevClickHandler);
    }
  }
};

/* ==========================================================================
   nine.arrowNextClickHandler()
   - click handler for next arrow
   ========================================================================== */

nine.arrowNextClickHandler = () => {
  nine.nextPage();
};

/* ==========================================================================
   nine.arrowPrevClickHandler()
   - click handler for prev arrow
   ========================================================================== */

nine.arrowPrevClickHandler = () => {
  nine.prevPage();
};

 /* ==========================================================================
   nine.dotClick()
   - handles when use clicks on a dot
    ========================================================================== */

nine.dotClick = (element, repeat) => {
  if (repeat == null) {
    repeat = false;
  }

  document.querySelector('.dots li.active').classList.remove('active');
  var newPageIndex = element.target.getAttribute('data-page');
  document.querySelectorAll('.dots li')[newPageIndex].classList.add('active');

  var section = nine.pages[newPageIndex].id;

  if (nine.canScroll) {
    nine.scrollToSection(section);
  } else if (repeat == false) {
    // Is currently scrolling. Try again after duration.
    setTimeout(function(){
      nine.dotClick(element, true);
    }, nine.scrollDuration);
   }
};

 /* ==========================================================================
   nine.updateControls()
   - Update controls to latest section
    ========================================================================== */

nine.updateControls = (newIndex) => {
  if (newIndex == null && nine.currentPageIndex == null) {
    newIndex = 0;
  }  else {
    newIndex = nine.currentPageIndex;
  }

  var active = document.querySelector('.dots li.active')

  if (active) {
    document.querySelector('.dots li.active').classList.remove('active');
  }

  document.querySelectorAll('.dots li')[newIndex].classList.add('active');

  document.querySelector('.next').classList.remove('disabled');
  document.querySelector('.prev').classList.remove('disabled');

  if (newIndex == 0) {
    document.querySelector('.prev').classList.add('disabled');
  }

  if (newIndex == nine.pages.length - 1) {
    document.querySelector('.next').classList.add('disabled');
  }
}

/* ==========================================================================
 nine.nextPage()
 - moves to the next slide
  ========================================================================== */

nine.nextPage = (repeat) => {
  if (repeat == null) {
    repeat = false;
  }

  if (nine.currentPageIndex + 1 < nine.pages.length && nine.canScroll) {
    var nextPage = nine.pages[nine.currentPageIndex + 1].id;
    nine.scrollToSection(nextPage);
    return true;
  } else if (nine.currentPageIndex + 1 < nine.pages.length && repeat == false) {
    setTimeout(function(){
      nine.nextPage(true);
    }, nine.scrollDuration);
  }
  return false;
}

/* ==========================================================================
 nine.prevPage()
 - moves to the previous slide
  ========================================================================== */

nine.prevPage = (repeat) => {
  if (repeat == null) {
    repeat = false;
  }

  if (nine.currentPageIndex - 1 >= 0 && nine.canScroll) {
    var prevPage = nine.pages[nine.currentPageIndex - 1].id;
    nine.scrollToSection(prevPage);
    return true;
  } else if (nine.currentPageIndex - 1 >= 0 && repeat == false) {
    setTimeout(function(){
      nine.prevPage(true);
    }, nine.scrollDuration);
  }
  return false;
}

 // ##########################################################################









 // ##########################################################################
 /* ==========================================================================
    Inputs
    ==========================================================================
 // ##########################################################################
 /* ==========================================================================
   nine.addKeyboardNav()
   - enables up and down to be used to navigate slides
    ========================================================================== */

nine.addKeyboardNav = () => {
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
      case 32: // Space
        event.preventDefault();
        nine.nextPage();
        break;
      case 33: // Page up
        event.preventDefault();
        nine.prevPage();
        break;
      case 34: // Page down
        event.preventDefault();
        nine.nextPage();
        break;
    }
  }
};

/* ==========================================================================
  nine.removeKeyboardNav()
  - enables up and down to be used to navigate slides
   ========================================================================== */

nine.removeKeyboardNav = () => {
 document.onkeydown = null;
};

/* ==========================================================================
  nine.addScrollInput()
  - Add listeners for scroll
   ========================================================================== */

nine.addScrollInput = () => {
  var wrapper = window;

  if(wrapper.addEventListener) {
    wrapper.addEventListener('mousewheel', nine.mouseWheelHandler, false); // ie9, chrome, safari, opera use mousewheel

    // wrapper.addEventListener('wheel', nine.mouseWheelHandler, false); // firefox
  } else {
    wrapper.attachEvent('onmousewheel', nine.mouseWheelHandler); // IE 6/7/8 not really supported anyway
  }
};

/* ==========================================================================
  nine.removeScrollInput()
  - Remove listeners for scroll
   ========================================================================== */

nine.removeScrollInput = () => {
  var wrapper = window;

  if(wrapper.addEventListener) {
    wrapper.removeEventListener('mousewheel', nine.mouseWheelHandler, false); // ie9, chrome, safari, opera use mousewheel

    wrapper.removeEventListener('wheel', nine.mouseWheelHandler, false); // firefox
  } else {
    wrapper.detachEvent('onmousewheel', nine.mouseWheelHandler); // IE 6/7/8 not really supported anyway
  }
}

/* ==========================================================================
  nine.mouseWheelHandler()
  - process scrolling
  - Line 1099: https://github.com/alvarotrigo/fullPage.js/blob/master/pure%20javascript%20(Alpha)/javascript.fullPage.js
  - https://www.sitepoint.com/html5-javascript-mouse-wheel/
   ========================================================================== */

nine.mouseWheelHandler = (e) => {
  nine.preventDefault(e); // prevent normall scrolling

  var curTime = new Date().getTime();

  // cross-browser wheel delta
  e = window.event || e || e.originalEvent;

  var value = e.wheelDelta || -e.deltaY || -e.detail;
  var delta = Math.max(-1, Math.min(1, value));

  //Limiting the array to 150 (lets not waist memory!)
  if(nine.scrollHistory.length > 149){
      nine.scrollHistory.shift(); // rmeoves first element
  }

  //keeping record of the previous scrollings
  nine.scrollHistory.push(Math.abs(value));

  var timeDiff = curTime - nine.prevTime;
  nine.prevTime = curTime;

  // haven't they scrolled in a while?
  // (enough to be consider a different scrolling action to scroll another section)
  if(timeDiff > 200){
    // emptying the array, we dont care about old scrollings for our averages
    nine.scrollHistory = [];
  }

  function getAverage(elements, number) {
    var sum = 0;

    //taking `number` elements from the end to make the average, if there are not enought, 1
    var lastElements = elements.slice(Math.max(elements.length - number, 1));

    for(var i = 0; i < lastElements.length; i++){
        sum = sum + lastElements[i];
    }
    return Math.ceil(sum/number);
  }

  if(nine.canScroll){
    var averageEnd = getAverage(nine.scrollHistory, 10);
    var averageMiddle = getAverage(nine.scrollHistory, 70);
    var isAccelerating = averageEnd >= averageMiddle;

    if(isAccelerating){
      if (delta < 0) { //scrolling down?
        nine.scrolling('down');
      }else { //scrolling up?
        nine.scrolling('up');
      }
    }
  }

  return false;
};


nine.scrolling = (type) => {
  if (type == 'down') {
    nine.nextPage();
  } else {
    nine.prevPage();
  }
};

 // ##########################################################################













// ##########################################################################
/* ==========================================================================
   Helpers
   ==========================================================================
// ##########################################################################

 /* ==========================================================================
   nine.getHash()
   - Gets current url hash
   ========================================================================== */

 nine.getHash = () => {
   var value =  window.location.hash.replace('#', '').split('/');
   return value[0];
 };
/* ==========================================================================
  nine.addClass(element, className)
  - Checks if element hasClass if not adds it
   ========================================================================== */

nine.addClass = (element, className) => {
  if (element && !nine.hasClass(element, className)) {
    element.classList.add(className);
  }
}

/* ==========================================================================
  nine.removeClass(element, className)
  - Checks if element hasClass if it does removes it
   ========================================================================== */

nine.removeClass = (element, className) => {
  if (element && nine.hasClass(element, className)) {
    element.classList.remove(className);
  }
}

/* ==========================================================================
  nine.hasClass(element, className)
  - Checks if element has a class
  - Returns true or false
   ========================================================================== */

nine.hasClass = (element, className) => {
  return element.classList.contains(className);
}

/* ==========================================================================
  getSectionindex(section)
  - Finds out what the index of the element is in the list of sections
  - Returns index
   ========================================================================== */

nine.getSectionIndex = (element) => {
 var i = 0;
 var index;

 Array.prototype.forEach.call(nine.pages, function(el, i) {
  if (el == element) {
    index = i;
  }
 });

 return index;
};

/* ==========================================================================
  nine.windowWidth
  - Gets window size reliably
   ========================================================================== */

nine.windowSize = (w) => {

  // Use the specified window or the current window if no argument
  w = w || window;

  // This works for all browsers except IE8 and before
  if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };

  // For IE (or any browser) in Standards mode
  var d = w.document;
  if (document.compatMode == "CSS1Compat")
      return { w: d.documentElement.clientWidth,
         h: d.documentElement.clientHeight };

  // For browsers in Quirks mode
  return { w: d.body.clientWidth, h: d.body.clientHeight };
};

/* ==========================================================================
  nine.debounce()
  - Debounces actions be with a timer.
 ========================================================================== */

nine.debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/* ==========================================================================
  nine.preventDeafult(event)
   ========================================================================== */

nine.preventDefault = (event) => {
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
}

// ##########################################################################





// ##########################################################################
/* ==========================================================================
  nine.fullscreenMode
  - will enable or sidable all methods required for fullscreen mode
   ========================================================================== */
nine.fullscreenMode = (debounced) => {

  //TODO: reset position when chaning between the two modes.

  if (nine.checkFullscreen() && nine.fullscreen == false) {
    nine.enableFullscreen();
    nine.enableSticky();
    nine.hashChangeLisener();
    nine.addFullscreenNav();
    nine.addKeyboardNav();
    nine.addScrollInput();
    nine.setCurrentPage();
  } else if (nine.checkFullscreen() == false && nine.fullscreen == true) { // Used to be on but now can't be so disable
    nine.enableFullscreen(); // Will toggle off due to failing test
    nine.enableSticky(); // Will toggle off due to failing fullscreen test
    nine.removeFullscreenNav();
    nine.removeKeyboardNav();
    nine.removeScrollInput();
  }

  if (!debounced) {
    var fullscreenModeDebounced = nine.debounce(function() {
      nine.fullscreenMode(true);
    }, 250);

    window.addEventListener('resize', fullscreenModeDebounced);
  } else {
    nine.resetPosition();
    // nine.setCurrentPage();
  }
};

// ##########################################################################




// ##########################################################################
/* ==========================================================================
  Document Load
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  nine.masonaryHeight();
  nine.animateLinks();

  window.addEventListener('resize', function() {
    nine.masonaryHeight();
  });

  nine.fullscreenMode();
});

/* ==========================================================================
  Window Load
   ========================================================================== */

window.onload = () => {
  nine.animateLoad();
  // nine.animatePortrait();
  nine.masonaryHeight();
};

// ##########################################################################
