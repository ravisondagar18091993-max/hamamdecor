/**
 * Hamam Decor — Slick slider initialization
 */
(function () {
  'use strict';

  var MAX_RETRIES = 50;

  function get$() {
    return window.jQuery;
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function destroyInRoot(root) {
    var $ = get$();
    if (!$ || !$.fn.slick) return;

    root.querySelectorAll('.hamam-slick[data-hamam-slick]').forEach(function (el) {
      if ($(el).hasClass('slick-initialized')) {
        $(el).slick('unslick');
      }
    });
  }

  function slideCount($el) {
    return $el.children().not('.slick-cloned').length;
  }

  function initHero($root) {
    var $ = get$();
    $root.find('.hamam-hero-slider[data-hamam-slick="hero"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      var count = slideCount($el);
      if (count < 1) return;

      var autoplay = $el.data('autoplay') === true || $el.data('autoplay') === 'true';
      var speed = parseInt($el.data('speed'), 10) || 6000;
      var infinite = count > 1;

      $el.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        speed: 800,
        autoplay: autoplay && infinite,
        autoplaySpeed: speed,
        pauseOnHover: true,
        infinite: infinite,
      });

      bindHeroSegments($el);
    });
  }

  function bindHeroSegments($slider) {
    var section = $slider.closest('[data-hero-section]');
    if (!section.length) return;

    var segments = section.find('[data-hero-segment]');

    function setActive(index) {
      segments.removeClass('is-active');
      segments.filter('[data-hero-segment="' + index + '"]').addClass('is-active');
    }

    $slider.on('init afterChange', function (_event, _slick, currentSlide) {
      var idx = typeof currentSlide === 'number' ? currentSlide : 0;
      setActive(idx);
    });

    segments.on('click', function () {
      var index = parseInt(this.getAttribute('data-hero-segment'), 10);
      if (!Number.isNaN(index)) {
        $slider.slick('slickGoTo', index);
      }
    });

    setActive(0);
  }

  function initProducts($root) {
    var $ = get$();
    $root.find('.hamam-product-slider[data-hamam-slick="products"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      var count = slideCount($el);
      if (count < 1) return;

      $el.slick({
        slidesToShow: Math.min(4, count),
        slidesToScroll: 1,
        arrows: count > 4,
        dots: false,
        infinite: false,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: Math.min(3, count), arrows: count > 3 } },
          { breakpoint: 768, settings: { slidesToShow: Math.min(2, count), arrows: false } },
          { breakpoint: 520, settings: { slidesToShow: 1, arrows: false } },
        ],
      });
    });
  }

  function initCollections($root) {
    var $ = get$();
    $root.find('.hamam-collection-slider[data-hamam-slick="collections"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      var count = slideCount($el);
      if (count < 1) return;

      var autoplayOn =
        $el.data('autoplay') === true ||
        $el.data('autoplay') === 'true' ||
        $el.data('autoplay') === 1 ||
        $el.data('autoplay') === '1';
      var autoplaySpeed = parseInt($el.data('autoplay-speed'), 10) || 4500;
      var desktopShow = Math.min(4, count);
      var canLoop = count > desktopShow;

      $el.slick({
        slidesToShow: desktopShow,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: canLoop,
        autoplay: autoplayOn && canLoop,
        autoplaySpeed: autoplaySpeed,
        speed: 650,
        pauseOnHover: true,
        pauseOnFocus: true,
        waitForAnimate: true,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: Math.min(3, count),
              infinite: count > Math.min(3, count),
              autoplay: autoplayOn && count > Math.min(3, count),
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              infinite: count > 1,
              autoplay: autoplayOn && count > 1,
            },
          },
        ],
      });

      bindCollectionArrows($el, canLoop);
    });
  }

  function bindCollectionArrows($slider, canLoop) {
    var $section = $slider.closest('.hamam-collections');
    if (!$section.length) return;

    var $arrows = $section.find('[data-hamam-collection-arrows]');
    var $prev = $section.find('[data-hamam-collection-prev]');
    var $next = $section.find('[data-hamam-collection-next]');

    $prev.off('click.hamamCollections');
    $next.off('click.hamamCollections');

    if (!canLoop) {
      $arrows.attr('hidden', '');
      return;
    }

    $arrows.removeAttr('hidden');
    $prev.on('click.hamamCollections', function () {
      $slider.slick('slickPrev');
    });
    $next.on('click.hamamCollections', function () {
      $slider.slick('slickNext');
    });
  }

  function initReviews($root) {
    var $ = get$();
    $root.find('.hamam-review-slider[data-hamam-slick="reviews"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      var count = slideCount($el);
      if (count < 1) return;

      $el.slick({
        slidesToShow: Math.min(3, count),
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
        responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }],
      });
    });
  }

  function initPress($root) {
    var $ = get$();
    $root.find('.hamam-press__track[data-hamam-slick="press"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      var count = slideCount($el);
      if (count < 2) return;

      $el.slick({
        slidesToShow: Math.min(5, count),
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        infinite: true,
        pauseOnHover: true,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: Math.min(3, count) } }],
      });
    });
  }

  function initHamamSliders(root) {
    var $ = get$();
    if (!$ || !$.fn.slick) return false;

    var $root = root ? $(root) : $(document);
    initHero($root);
    initProducts($root);
    initCollections($root);
    initReviews($root);
    initPress($root);
    return true;
  }

  function boot(attempt) {
    if (initHamamSliders()) return;
    if (attempt >= MAX_RETRIES) return;
    window.setTimeout(function () {
      boot(attempt + 1);
    }, 50);
  }

  whenReady(function () {
    boot(0);
  });

  window.addEventListener('load', function () {
    initHamamSliders();
  });

  document.addEventListener('shopify:section:unload', function (event) {
    if (event.target) destroyInRoot(event.target);
  });

  document.addEventListener('shopify:section:load', function (event) {
    boot(0);
    initHamamSliders(event.target);
  });
})();
