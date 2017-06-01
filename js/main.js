var cgts = {};

/* ==========================================================================
  cgts.homepageSnap
========================================================================== */

cgts.homepageSnap = function() {
  if ( $('.home').length ) {
    $.scrollify({
        section : ".snap",
        interstitialSection : ".page-footer",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: false,
        overflowScroll: true,
        updateHash: false,
        touchScroll:true,
        before:function(i, panels) {
          cgts.homepageAnimation(i, panels);
        },
        after:function() {},
        afterResize:function() {},
        afterRender:function(i, panels) {
          cgts.homepageAnimation(i, panels);
        }
    });
  }
};

/* ==========================================================================
  cgts.homepageSnapSwitch
========================================================================== */

cgts.homepageSnapSwitch = function() {
  if($(window).width() >= 1024) {
    if ($.scrollify) {
      $.scrollify.destroy();
    }
    cgts.homepageSnap();
  } else {
    if ($.scrollify) {
      $.scrollify.destroy();
    }
  }
};

/* ==========================================================================
  cgts.homepageAnimation()
   ========================================================================== */

cgts.homepageAnimation = function(i, panels) {

  if (('undefined' !== typeof i) && ('undefined' !== typeof panels)) {
    var ref = panels[i].attr("data-section-name");

    if(ref == "teachers") {
      $('.teachers .hide').removeClass('hide');
      $('.teachers .move').removeClass('move');
    }
    if(ref == "schools") {
      $('.schools .hide').removeClass('hide');
      $('.schools .move').removeClass('move');
    }
    if(ref == "legal") {
      $('.legal .hide').removeClass('hide');
      $('.legal .move').removeClass('move');

      $('.sign-up .hide').delay( 5000 ).removeClass('hide')
    }
  } else {
    $('.introduction .hide').removeClass('hide');
    $('.introduction .move').removeClass('move');
  }

};

/* ==========================================================================
  ctgs.pageAnimations()
   ========================================================================== */

cgts.pageAnimations = function() {
  $('.page-hero .hide').removeClass('hide');
  $('.page-hero .move').removeClass('move');
};

/* ==========================================================================
  cgts.menuListeners()
========================================================================== */
cgts.menuListeners = function() {
    $('.hamburger').click(function() {
        $('.page-header').addClass('open');
    });

    $('.close').click(function() {
        $('.page-header').removeClass('open');
    });

    $(document).keyup(function(event) {
        if (event.keyCode === 27) {
            $('.page-header').removeClass('open');
        }
    });
};

/* ==========================================================================
  cgts.showPassword
   ========================================================================== */

cgts.showPassword = function() {
    $('.show').on('click', function() {
        $password = $(this).parent('.field-group').find('.password')

        if ($password.hasClass('hide')) {
            $password.prop('type', 'text');
            $password.removeClass('hide').addClass('shown');
        } else {
            $password.prop('type', 'password');
            $password.removeClass('shown').addClass('hide');
        }
    })
};

/* ==========================================================================
  cgts.notificationToggle
   ========================================================================== */

cgts.notificationToggle = function() {
    $('.notifications-open').click(function() {
        $('.notifications').addClass('open');
        $('.fade').addClass('on');
    });

    $('.notifications .close').click(function() {
        $('.notifications').removeClass('open');
        $('.fade').removeClass('on');
    });
};

/* ==========================================================================
  cgts.closemodal
   ========================================================================== */

cgts.closemodal = function() {
  $('.close-modal').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.modal').removeClass('open');
    $('.fade').removeClass('on');
  });
};

/* ==========================================================================
  cgts.openmodal
   ========================================================================== */

cgts.openmodal = function() {
  $('.open-modal').on('click', function(event) {
    event.preventDefault();
    modal = $(this).data('modal');

    $('.' + modal).addClass('open');
    $('.fade').addClass('on');
  });
};

/* ==========================================================================
  cgts.tableDeatils
========================================================================== */

cgts.jobBoard = function() {
  if( $('.job-board').length > 0 ) {
    $('.expand').on('click', function() {
      expand = $(this);
      details_panel = '.details-' + $(this).data('details');

      if ( expand.hasClass('open') ) {
        $(details_panel).hide();
        expand.removeClass("open");
      } else {
        expand.addClass("open");

        $(details_panel).show();
        $(details_panel + ' .close').unbind().on('click', function() {
          $(details_panel).hide();
          expand.removeClass("open");
        })
      }
    });

    $('.respond').on('click', function() {
      job = '.job-' + $(this).data('job');

      $('.fade').addClass('on');
      $('.modal').addClass('open');

      id = $(job + ' .id').html();
      vacnGuid = $(job + ' #VACN_GUID').val();
      distance = $(job + ' .distance').html();
      loc = $(job + ' .location').html();
      length = $(job + ' .length').html();
      date = $(job + ' .date').html();
      ks = $(job + ' .ks').html();
      sen = $(job + ' .sen').html();

      $('.modal h2').html(id);
      $('.modal-job-board .tbody .distance').html(distance);
      $('.modal-job-board .tbody .location').html(loc);
      $('.modal-job-board .tbody .length').html(length);
      $('.modal-job-board .tbody .date').html(date);
      $('.modal-job-board .tbody .ks').html(ks);
      $('.modal-job-board .tbody .sen').html(sen);

      $('.modal .vac-id').attr('value', vacnGuid);

      // Validate checkboxes are ticked in intrested pressed
      $('#interested-submit').on('click', function(e) {
        e.preventDefault();
        valid = true;

        if($('input#available').prop('checked') == false) {
          valid = false;
          $("input#available").next('label').effect( "shake" ).css('margin', '0');
        }

        if ($('input#free').prop('checked') == false) {
          valid = false;
          $("input#free").next('label').effect( "shake" ).css('margin', '0');
        }

        if (valid == true) {
          $(this).parent('form').submit();
        }

      });
    });

    // $('select[name="status"]').on('change', function() {
    //   $('.fade').addClass('on');
    //   $('.modal').addClass('open');
    // });
  }
};

/* ==========================================================================
  cgts.expeirenceSelect()
   ========================================================================== */

cgts.expeirenceSelect = function() {
  if( $('.experience-select').length > 0 ) {
    keyStageCount = $('.experience-select label').length

    $('.experience-select label').each(function(i) {
      $(this).attr('data-ks', i);
    });

    $('.experience-select label').on('click', function() {

      if($(this).attr('data-ks') >= 3) {
        if($(this).prev('input').is(":checked")) {
          othersChecked = false;
          selected = $(this).attr('data-ks');

          $('.experience-select input').each(function(i) {
            if($(this).is(":checked") && $(this).next('label').attr('data-ks') >= 3 && $(this).next('label').attr('data-ks') != selected) {
              othersChecked = true;
            }
          });

          if (othersChecked === false) {
            $('.subjects').hide();
            $('.subjects input').prop('checked', false);
          }
        } else {
          $('.subjects').show();
        }
      }
    });
  }
};

/* ==========================================================================
  Main - Runs at load
   ========================================================================== */
$(document).ready(function() {
    cgts.menuListeners();
    cgts.showPassword();
    cgts.notificationToggle();
    cgts.closemodal();
    cgts.openmodal();
    cgts.pageAnimations();
    cgts.jobBoard();
    cgts.expeirenceSelect();

    $(window).resize(function() {
      cgts.homepageSnapSwitch();
    });

    $('.empty').on('change', function() {
      $(this).removeClass('empty');
    });

    $('.profile-pic.empty').unbind().on('change', function() {
      $('#profile-pic-upload').submit();
    });
});

$(window).load(function() {
  cgts.homepageSnapSwitch();
});
