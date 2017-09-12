const nine = {
  sticky: false,
  fullscreen: false,
  // Scolling Related
  currentPageIndex: null,
  currentPage: null,
  canScroll: true,
  scrollDuration: 750,
  scrollContainer: document.getElementById('fullpage'),
  pages: document.querySelectorAll('.section'),
  scrollDirection: null,
  prevTime: new Date().getTime(),
  scrollHistory: [],
  fullScreenEnableFrom: 768,
  supports3d: false
};

/* ==========================================================================
    Polyfils
   ========================================================================== */

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    }

    return this.indexOf(search, start) !== -1;
  };
}

/* ==========================================================================
  nine.supports3D()
   ========================================================================== */
/**
* Checks for translate3d support
* @return boolean
* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
*/

nine.support3d = () => {
  return false;
  const el = document.createElement('p');
  let has3d;
  const transforms = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);

  for (const t in transforms) {
    if (el.style[t] !== undefined) {
      el.style[t] = 'translate3d(1px,1px,1px)';
      has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
    }
  }

  document.body.removeChild(el);

  return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
};

/* ==========================================================================
  nine.checkFullscreen()
   ========================================================================== */

nine.checkFullscreen = () => {
  let fullscreen = true;

  const windowHeight = nine.windowSize().h;
  const windowWidth = nine.windowSize().w;

  if (windowWidth >= nine.fullScreenEnableFrom) {
    // If any section is longer the window height disable fullscreen
    nine.pages.forEach(el => {
      if (el.offsetHeight > windowHeight) {
        fullscreen = false;
      }
    });
  } else {
    fullscreen = false;
  }

  return fullscreen;
};

/* ==========================================================================
  enableFullscreen()
  - Enable fullscreen mode if checkFullscreen passes
   ========================================================================== */

nine.enableFullscreen = () => {
  if (nine.checkFullscreen()) {
    nine.fullscreen = true;
    document.body.classList.add('fullscreen');
  } else {
    nine.fullscreen = false;
    document.body.classList.remove('fullscreen');
  }
};

/* ==========================================================================
  nine.checkSticky() - http://trialstravails.bspot.co.uk/2016/06/detecting-css-position-sticky-support.html
   ========================================================================== */

nine.checkSticky = () => {
  const el = document.createElement('a');
  const mStyle = el.style;

  mStyle.cssText = 'position:sticky;position:-webkit-sticky;position:-ms-sticky;';
  let sticky = mStyle.position.indexOf('sticky') !== -1;

  sticky = false; // Return false to DISABLED.
  return sticky;
};

/* ==========================================================================
  enableSticky()
  - Enable Sticky
   ========================================================================== */

nine.enableSticky = () => {
  if (nine.checkSticky() && nine.checkFullscreen()) {
    nine.sticky = true;
    nine.fullscreen = true;
    document.body.classList.add('sticky-enabled');
  } else {
    nine.sticky = false;
    document.body.classList.remove('sticky-enabled');
  }
};

/* ==========================================================================
  nine.changeHeaderClass
   ========================================================================== */

nine.changeHeaderClass = className => {
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
      let hidden = document.querySelectorAll('.hide-left');
      Array.prototype.forEach.call(hidden, el => {
        el.classList.remove('hide-left');
      });

      hidden = document.querySelectorAll('.hide-down');
      Array.prototype.forEach.call(hidden, el => {
        el.classList.remove('hide-down');
      });
    }, 1000);
  }, 1000);
};

/* ==========================================================================
  nine.animatePortrait()
   ========================================================================== */

// nine.animatePortrait = () => {
//   const portrait = document.querySelector('.portrait .faded');
//
//   if (portrait) {
//     nine.scrollContainer.addEventListener('scroll', () => {
//       nine.portraitChange();
//     });
//   }
// };
//
// nine.portraitChange = () => {
//   const page = document.getElementById('about');
//   let offsetTop = page.offsetTop;
//   let startPoint = 0.98;
//
//   const portrait = document.querySelector('.portrait .faded');
//   const scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
//
//   if (nine.windowSize().w > 1280) {
//     startPoint = 0.5;
//   } else if (nine.windowSize().w < 1024) {
//     offsetTop = page.offsetHeight + document.getElementById('intro').offsetHeight - portrait.offsetHeight;
//   }
//
//   if (scrollPosition > offsetTop * startPoint) {
//     if (portrait.style.opacity === 0) {
//       portrait.style.opacity = 1;
//     }
//   } else if (portrait.style.opacity === 1) {
//     portrait.style.opacity = 0;
//   }
// };

/* ==========================================================================
  nine.pageTransisition()
   ========================================================================== */

nine.pageTransisition = (href, bg) => {
  if (!bg) {
    bg = '#E6E6E4';
  }

  document.body.style.backgroundColor = bg;
  document.body.classList.add('faded-out');

  setTimeout(() => {
    window.location.href = href;
  }, 600);
};

/* ==========================================================================
  nine.aboutHeight
   ========================================================================== */

nine.masonaryHeight = () => {
  const masonary = document.querySelector('.masonary');
  let lheight = 0;
  let rheight = 0;

  if (masonary) {
    if (nine.windowSize().w >= 1024) {
      const lblocks = document.querySelectorAll('.block.left');
      const rblocks = document.querySelectorAll('.block.right');

      Array.prototype.forEach.call(lblocks, el => {
        lheight += el.offsetHeight;
      });

      Array.prototype.forEach.call(rblocks, el => {
        rheight += el.offsetHeight;
      });

      let height;

      if (lheight >= rheight) {
        height = lheight;
      } else {
        height = rheight + 200;
      }

      height += 1;
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
  const anchorElements = document.getElementsByTagName('a');
  Array.prototype.forEach.call(anchorElements, el => {
    el.onclick = () => {
      nine.pageTransisition(this.href, el.getAttribute('data-bg'), el.getAttribute('data-slide'));
      return false;
    };
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
  const section = nine.getHash();

  if (section) {
    const element = document.getElementById(section);

    if (element) {
      nine.updateCurrent(element);
      nine.scrollStart(element); // Simulate start of scroll to set all calsses correctly.
      // nine.scrollToSection(element.id); // Make sure we are definley at the correct section.
      nine.silentScrollToSection(element.id);
    }
  } else {
    nine.updateCurrent(document.querySelectorAll('.section')[0]);
  }
};

/* ==========================================================================
    nine.updateHash(url)
    - Updates the hash in the url to the value of url.
  ========================================================================== */

nine.updateHash = url => {
  window.location.hash = url;
};

/* ==========================================================================
  nine.hashChangeLisener()
  ========================================================================== */

nine.hashChangeLisener = () => {
  if (document.addEventListener) {
    window.addEventListener('hashchange', nine.hashChangeHandler, false); // IE9, Chrome, Safari, Oper
  } else {
    window.attachEvent('onhashchange', nine.hashChangeHandler); // IE 6/7/8
  }
};

/* ==========================================================================
  nine.hashChangeHandler()
  - Listens to chnages on the hash when back button is used.
   ========================================================================== */

nine.hashChangeHandler = () => {
  const section = nine.getHash();

  if (section && section !== nine.currentPage) {
    nine.scrollToSection(section);
  }
};

/* ==========================================================================
  nine.scrollToSection(destiny)
  - scroll to the a section using ID
   ========================================================================== */

nine.scrollToSection = (elementId, offset) => {
  const element = document.getElementById(elementId);

  if (element === null) {
    return;
  } // No element

  // If there is a gap between slides increase the duration by the gap.
  // var gap = Math.abs(nine.currentPageIndex - nine.getSectionIndex(element));
  // var duration = nine.scrollDuration * gap;
  const duration = nine.scrollDuration;

  const destiny = nine.calculateDestiny(element, offset);

  if (nine.supports3d) {
    nine.translateScroll(destiny, element, duration);
  } else {
    nine.animateScroll(destiny, element, duration);
  }
};

/* ==========================================================================
  nine.silentScrollToSection(destiny)
  - scroll to the a section using ID with duration 0
   ========================================================================== */

nine.silentScrollToSection = (elementId, offset) => {
  const element = document.getElementById(elementId);

  if (element === null) {
    return;
  } // No element

  // If there is a gap between slides increase the duration by the gap.
  // var gap = Math.abs(nine.currentPageIndex - nine.getSectionIndex(element));
  // var duration = nine.scrollDuration * gap;
  const duration = 0;

  const destiny = nine.calculateDestiny(element, offset);

  if (nine.supports3d) {
    nine.translateScroll(destiny, element, duration);
  } else {
    nine.animateScroll(destiny, element, duration);
  }
};

/* ==========================================================================
  nine.calculateOffset
  - If a user has scroled half way onto a section there will be an offset
    if position is sticky.
  - Returns offset in pixels.
   ========================================================================== */

nine.calculateOffset = () => {
  let offset = 0;

  // If user has manuall scrolled part way onto next one there will be an offset to account for.
  if (nine.sticky) {
    if (nine.currentPageIndex + 1 < nine.pages.length) {
      const nextPageOffset = document.getElementById(nine.pages[nine.currentPageIndex + 1].id).offsetTop;
      let prevPage;

      if (nine.currentPageIndex - 1 >= 0) {
        prevPage = nine.pages[nine.currentPageIndex - 1].id;
      } else {
        prevPage = nine.pages[nine.currentPageIndex].id;
      }

      const prevPageEl = document.getElementById(prevPage);
      const prevPageOffsetBottom = prevPageEl.offsetTop + prevPageEl.offsetHeight;

      if (nextPageOffset !== prevPageOffsetBottom) {
        offset = prevPageOffsetBottom - nextPageOffset;
      }
    } else {
      const scrollPosition = document.documentElement.scrollTop || nine.scrollContainer.scrollTop;
      const currentPageOffset = document.getElementById(nine.pages[nine.currentPageIndex].id).offsetTop;

      if (scrollPosition !== currentPageOffset) {
        offset = scrollPosition - currentPageOffset;
      }
    }
    return offset;
  }
  return 0;
};

/* ==========================================================================
  nine.calculateGap(newIndex)
   ========================================================================== */

nine.calculateGap = (newIndex, element, offset) => {
  const gap = Math.abs(nine.currentPageIndex - newIndex) - 1;

  for (let i = 1; i <= gap; i++) {
    offset += element.offsetHeight;
  }

  offset += nine.calculateOffset();

  return offset;
};

/* ==========================================================================
  nine.calculateDestiny()
  - Works out direction and depending on sticky corrects offset.
  - Returns the destiny in pixels.
   ========================================================================== */

nine.calculateDestiny = (element, offset) => {
  let destiny;

  if (typeof offset === 'undefined') {
    offset = 0;
  }

  const newIndex = nine.getSectionIndex(element);
  if (newIndex > nine.currentPageIndex) {
    nine.scrollDirection = 'down';
  } else if (newIndex < nine.currentPageIndex) {
    nine.scrollDirection = 'up';
    if (nine.sticky) {
      offset = nine.calculateGap(newIndex, element, offset);
    }
  }

  // Calculate the pixel position of the element, using offset if required
  if (nine.scrollDirection === 'up' && nine.sticky === true) {
    destiny = element.offsetTop - element.offsetHeight - offset;
  } else {
    destiny = element.offsetTop - offset;
  }

  return destiny;
};

/* ==========================================================================
  nine.translateScroll()
  - animate the scrolling of the page
  ========================================================================== */

nine.translateScroll = (endLocation, element, duration) => {
  const translate3d = 'translate3d(0px, -' + endLocation + 'px, 0px)';

  if (duration > 0) {
    const transition = 'all ' + duration + 'ms ease';

    nine.removeClass(nine.scrollContainer, 'notransition');

    nine.css(nine.scrollContainer, {
      '-webkit-transition': transition,
      transition
    });
  } else {
    nine.addClass(nine.scrollContainer, 'notransition');
  }

  nine.scrollStart(element);
  nine.canScroll = false;

  nine.translatePortrait(endLocation, duration);
  nine.setTransforms(nine.scrollContainer, translate3d);

  setTimeout(() => {
    nine.canScroll = true;
    nine.scrollEnd(element);
  }, duration);

  // Syncronously removing the class after the animation has been applied.
  setTimeout(() => {
    nine.removeClass(nine.scrollContainer, 'notransition');
  }, 10);
};

nine.translatePortrait = endLocation => {
  const portrait = document.querySelector('.portrait');
  const portraitPosition = 'translate3d(0px, ' + endLocation + 'px, 0px)';
  nine.setTransforms(portrait, portraitPosition);
};

/* ==========================================================================
  nine.animateScroll()
  - animate the scrolling of the page
  ========================================================================== */

nine.animateScroll = (endLocation, element, duration) => {
  console.log('here');
  if (endLocation === null) {
    return;
  }

  const startLocation = nine.getScrolledPosition();
  nine.canScroll = false;

  if (duration === null) {
    duration = nine.scrollDuration;
  }

  // Calculate how far to scroll
  const distance = endLocation - startLocation;

  let runAnimation;

  // Set the animation variables to 0/undefined.
  let timeLapsed = 0;
  let percentage;
  let position;

  const easing = function (progress) {
    return progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1; // Acceleration until halfway, then deceleration
  };

  function stopAnimationIfRequired(pos) {
    if (pos === endLocation) {
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

  const animate = function () {
    timeLapsed += 16;
    percentage = timeLapsed / duration;
    if (percentage > 1) {
      percentage = 1;
      position = endLocation;
    } else {
      position = (startLocation + distance) * easing(percentage);
    }
    nine.scrollContainer.scrollTop = position;
    runAnimation = requestAnimationFrame(animate);
    stopAnimationIfRequired(position);
  };

  nine.scrollStart(element);

  // Loop the animation function
  runAnimation = requestAnimationFrame(animate);
};

/* ==========================================================================
  nine.scrollStart()
  - Called just before scrolling starts
   ========================================================================== */

nine.scrollStart = element => {
  // Change header class - duration is same as slide duration for natural feel.
  if (element.classList.value.includes('light')) {
    nine.changeHeaderClass('dark');
  } else {
    nine.changeHeaderClass('light');
  }

  // Change menu colours dependent on slide
  const header = document.querySelector('.header');
  if (element.id === 'services') {
    nine.addClass(header, 'menu-alt');
  } else {
    nine.removeClass(header, 'menu-alt');
  }

  // Delay until part way through scroll to chnages make feel smooth.
  setTimeout(() => {
    // Remove other active classes
    const activePages = document.querySelector('.section.active');
    if (activePages) {
      nine.removeClass(activePages, 'active');
      nine.removeClass(document.body, activePages.id + '-active');
    }
    nine.addClass(element, 'active');
    nine.updateControls(nine.getSectionIndex(element));
  }, nine.scrollDuration * 0.33);
};

/* ==========================================================================
  nine.scrollEnd()
  - Called after an element has been scrolled to.
   ========================================================================== */

nine.scrollEnd = element => {
  if (element === null) {
    return;
  } // No element

  // Update to new state.
  nine.updateHash(element.id);
  nine.updateCurrent(element);
  nine.addClass(document.body, element.id + '-active');
  nine.updateControls();
};

/* ==========================================================================
  nine.updateCurrent
  - Updates globals to current values
   ========================================================================== */

nine.updateCurrent = element => {
  nine.currentPage = element.id;
  nine.currentPageIndex = nine.getSectionIndex(element);
};

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
  if (nine.fullscreen === true) {
    let section;
    let destiny;

    if (nine.currentPage === null) {
      section = document.querySelectorAll('.sections')[0];
      nine.currentPage = section.id;
      nine.currentPageIndex = 0;
    } else {
      section = document.getElementById(nine.currentPage);
    }

    const offset = nine.calculateOffset();

    if (nine.sticky && offset > 0) {
      destiny = section.offsetTop - offset;
    } else {
      destiny = section.offsetTop;
    }

    if (nine.supports3d) {
      nine.translateScroll(destiny, section, 0);
    } else {
      nine.animateScroll(destiny, section, 0);
    }
  }
};

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
  const controls = document.querySelector('.controls');

  if (controls) {
    controls.classList.add('on');

    const nav = document.querySelector('.dots');

    if (nav) {
      Array.prototype.forEach.call(nine.pages, (el, i) => {
        const dot = document.createElement('li');
        dot.setAttribute('data-page', i);
        nav.appendChild(dot);
        dot.addEventListener('click', element => nine.dotClick(element));
      });

      document.querySelector('.dots li').classList.add('active');

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
  const controls = document.querySelector('.controls');

  if (controls) {
    controls.classList.remove('on');

    const nav = document.querySelector('.dots');
    const dots = document.querySelectorAll('.dots li');

    if (nav && dots) {
      Array.prototype.forEach.call(dots, el => {
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
  if (repeat === null) {
    repeat = false;
  }

  document.querySelector('.dots li.active').classList.remove('active');
  const newPageIndex = element.target.getAttribute('data-page');
  document.querySelectorAll('.dots li')[newPageIndex].classList.add('active');

  const section = nine.pages[newPageIndex].id;

  if (nine.canScroll) {
    nine.scrollToSection(section);
  } else if (repeat === false) {
    // Is currently scrolling. Try again after duration.
    setTimeout(() => {
      nine.dotClick(element, true);
    }, nine.scrollDuration);
  }
};

 /* ==========================================================================
   nine.updateControls()
   - Update controls to latest section
    ========================================================================== */

nine.updateControls = newIndex => {
  if (newIndex === undefined) {
    newIndex = null;
  }

  if (newIndex === null && nine.currentPageIndex === null) {
    newIndex = 0;
  } else if (newIndex === null && nine.currentPageIndex !== null) {
    newIndex = nine.currentPageIndex;
  }

  const active = document.querySelector('.dots li.active');

  if (active) {
    document.querySelector('.dots li.active').classList.remove('active');
  }

  document.querySelectorAll('.dots li')[newIndex].classList.add('active');

  document.querySelector('.next').classList.remove('disabled');
  document.querySelector('.prev').classList.remove('disabled');

  if (newIndex === 0) {
    document.querySelector('.prev').classList.add('disabled');
  }

  if (newIndex === nine.pages.length - 1) {
    document.querySelector('.next').classList.add('disabled');
  }
};

/* ==========================================================================
 nine.nextPage()
 - moves to the next slide
  ========================================================================== */

nine.nextPage = repeat => {
  if (repeat === null) {
    repeat = false;
  }

  if (nine.currentPageIndex + 1 < nine.pages.length && nine.canScroll) {
    const nextPage = nine.pages[nine.currentPageIndex + 1].id;
    nine.scrollToSection(nextPage);
    return true;
  } else if (nine.currentPageIndex + 1 < nine.pages.length && repeat === false) {
    setTimeout(() => {
      nine.nextPage(true);
    }, nine.scrollDuration);
  }
  return false;
};

/* ==========================================================================
 nine.prevPage()
 - moves to the previous slide
  ========================================================================== */

nine.prevPage = repeat => {
  if (repeat === null) {
    repeat = false;
  }

  if (nine.currentPageIndex - 1 >= 0 && nine.canScroll) {
    const prevPage = nine.pages[nine.currentPageIndex - 1].id;
    nine.scrollToSection(prevPage);
    return true;
  } else if (nine.currentPageIndex - 1 >= 0 && repeat === false) {
    setTimeout(() => {
      nine.prevPage(true);
    }, nine.scrollDuration);
  }
  return false;
};

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
  document.onkeydown = function (event) {
    if (!event) {
      event = window.event;
    }

    let code = event.keyCode;

    if (event.charCode && code === 0) {
      code = event.charCode;
    }

    switch (code) {
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
      default:
    }
  };
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
  const wrapper = window;

  if (wrapper.addEventListener) {
    wrapper.addEventListener('mousewheel', nine.mouseWheelHandler, false); // Ie9, chrome, safari, opera use mousewheel

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
  const wrapper = window;

  if (wrapper.addEventListener) {
    wrapper.removeEventListener('mousewheel', nine.mouseWheelHandler, false); // Ie9, chrome, safari, opera use mousewheel

    wrapper.removeEventListener('wheel', nine.mouseWheelHandler, false); // Firefox
  } else {
    wrapper.detachEvent('onmousewheel', nine.mouseWheelHandler); // IE 6/7/8 not really supported anyway
  }
};

/* ==========================================================================
  nine.mouseWheelHandler()
  - process scrolling
  - Line 1099: https://github.com/alvarotrigo/fullPage.js/blob/master/pure%20javascript%20(Alpha)/javascript.fullPage.js
  - https://www.sitepoint.com/html5-javascript-mouse-wheel/
   ========================================================================== */

nine.mouseWheelHandler = e => {
  nine.preventDefault(e); // Prevent normall scrolling

  const curTime = new Date().getTime();

  // Cross-browser wheel delta
  e = window.event || e || e.originalEvent;

  const value = e.wheelDelta || -e.deltaY || -e.detail;
  const delta = Math.max(-1, Math.min(1, value));

  // Limiting the array to 150 (lets not waist memory!)
  if (nine.scrollHistory.length > 149) {
    nine.scrollHistory.shift(); // Rmeoves first element
  }

  // Keeping record of the previous scrollings
  nine.scrollHistory.push(Math.abs(value));

  const timeDiff = curTime - nine.prevTime;
  nine.prevTime = curTime;

  // Haven't they scrolled in a while?
  // (enough to be consider a different scrolling action to scroll another section)
  if (timeDiff > 200) {
    // Emptying the array, we dont care about old scrollings for our averages
    nine.scrollHistory = [];
  }

  function getAverage(elements, number) {
    let sum = 0;

    // Taking `number` elements from the end to make the average, if there are not enought, 1
    const lastElements = elements.slice(Math.max(elements.length - number, 1));

    for (let i = 0; i < lastElements.length; i++) {
      sum += lastElements[i];
    }
    return Math.ceil(sum / number);
  }

  if (nine.canScroll) {
    const averageEnd = getAverage(nine.scrollHistory, 10);
    const averageMiddle = getAverage(nine.scrollHistory, 70);
    const isAccelerating = averageEnd >= averageMiddle;

    if (isAccelerating) {
      if (delta < 0) { // Scrolling down?
        nine.scrolling('down');
      } else { // Scrolling up?
        nine.scrolling('up');
      }
    }
  }

  return false;
};

nine.scrolling = type => {
  if (type === 'down') {
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
  const value = window.location.hash.replace('#', '').split('/');
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
};

/* ==========================================================================
  nine.removeClass(element, className)
  - Checks if element hasClass if it does removes it
   ========================================================================== */

nine.removeClass = (element, className) => {
  if (element && nine.hasClass(element, className)) {
    element.classList.remove(className);
  }
};

/* ==========================================================================
  nine.hasClass(element, className)
  - Checks if element has a class
  - Returns true or false
   ========================================================================== */

nine.hasClass = (element, className) => {
  return element.classList.contains(className);
};

/* ==========================================================================
  getSectionindex(section)
  - Finds out what the index of the element is in the list of sections
  - Returns index
   ========================================================================== */

nine.getSectionIndex = element => {
  let index;

  Array.prototype.forEach.call(nine.pages, (el, i) => {
    if (el === element) {
      index = i;
    }
  });

  return index;
};

/* ==========================================================================
  nine.windowWidth
  - Gets window size reliably
   ========================================================================== */

nine.windowSize = w => {
  // Use the specified window or the current window if no argument
  w = w || window;

  // This works for all browsers except IE8 and before
  if (w.innerWidth !== null) {
    return {w: w.innerWidth, h: w.innerHeight};
  }

  // For IE (or any browser) in Standards mode
  const d = w.document;
  if (document.compatMode === 'CSS1Compat') {
    return {w: d.documentElement.clientWidth,
      h: d.documentElement.clientHeight};
  }

  // For browsers in Quirks mode
  return {w: d.body.clientWidth, h: d.body.clientHeight};
};

/* ==========================================================================
  nine.debounce()
  - Debounces actions be with a timer.
 ========================================================================== */

nine.debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

/* ==========================================================================
  nine.preventDeafult(event)
   ========================================================================== */

nine.preventDefault = event => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};

/* ==========================================================================
  nine.setTransforms(el, translate3d)
  - sets tranlstaion on an element
  ========================================================================== */

nine.setTransforms = (element, translate3d) => {
  nine.css(element, {
    '-webkit-transform': translate3d,
    '-moz-transform': translate3d,
    '-ms-transform': translate3d,
    transform: translate3d
  });
};

/* ==========================================================================
  nine.css(el, props)
  - adds css to elements
  ========================================================================== */

nine.css = (el, props) => {
  let key;
  for (key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (key !== null) {
        el.style[key] = props[key];
      }
    }
  }
  return el;
};

// ##########################################################################

// ##########################################################################
/* ==========================================================================
  nine.fullscreenMode
  - will enable or sidable all methods required for fullscreen mode
   ========================================================================== */
nine.fullscreenMode = debounced => {
  if (nine.checkFullscreen() && nine.fullscreen === false) {
    nine.enableFullscreen();
    nine.enableSticky();
    nine.hashChangeLisener();
    nine.addFullscreenNav();
    nine.addKeyboardNav();
    nine.addScrollInput();
    nine.setCurrentPage();
  } else if (nine.checkFullscreen() === false && nine.fullscreen === true) { // Used to be on but now can't be so disable
    nine.enableFullscreen(); // Will toggle off due to failing test
    nine.enableSticky(); // Will toggle off due to failing fullscreen test
    nine.removeFullscreenNav();
    nine.removeKeyboardNav();
    nine.removeScrollInput();
  }

  if (debounced) {
    nine.resetPosition();
  } else {
    const fullscreenModeDebounced = nine.debounce(() => {
      nine.fullscreenMode(true);
    }, 250);

    window.addEventListener('resize', fullscreenModeDebounced);
  }
};

// ##########################################################################

// ##########################################################################
/* ==========================================================================
  Document Load
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  nine.supports3d = nine.support3d();

  nine.masonaryHeight();
  nine.animateLinks();

  window.addEventListener('resize', () => {
    nine.masonaryHeight();
  });

  nine.fullscreenMode();
});

/* ==========================================================================
  Window Load
   ========================================================================== */

window.onload = () => {
  nine.animateLoad();
  nine.masonaryHeight();
};

// ##########################################################################
