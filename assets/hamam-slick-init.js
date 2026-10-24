/**
 * Hamam Decor — Slick slider initialization (homepage sections)
 */
(function () {
  'use strict';

  var MAX_RETRIES = 40;

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
      if (slideCount($el) < 1) return;

      var autoplay = $el.data('autoplay') === true || $el.data('autoplay') === 'true';
      var speed = parseInt($el.data('speed'), 10) || 6000;
      var infinite = slideCount($el) > 1;

      $el.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: infinite,
        dots: infinite,
        fade: true,
        speed: 900,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        autoplay: autoplay && infinite,
        autoplaySpeed: speed,
        pauseOnHover: true,
        infinite: infinite,
      });
    });
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
        speed: 500,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: Math.min(3, count), arrows: count > 3 } },
          { breakpoint: 900, settings: { slidesToShow: Math.min(2, count), arrows: count > 2 } },
          { breakpoint: 550, settings: { slidesToShow: 1, arrows: false } },
        ],
      });
    });
  }

  function initBlog($root) {
    var $ = get$();
    $root.find('.hamam-blog-slider[data-hamam-slick="blog"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;

      var count = slideCount($el);
      if (count < 1) return;

      $el.slick({
        slidesToShow: Math.min(3, count),
        slidesToScroll: 1,
        arrows: count > 3,
        dots: false,
        infinite: false,
        speed: 500,
        responsive: [
          { breakpoint: 1000, settings: { slidesToShow: Math.min(2, count), arrows: count > 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1, arrows: false } },
        ],
      });
    });
  }

  function initHamamSliders(root) {
    var $ = get$();
    if (!$ || !$.fn.slick) return false;

    var $root = root ? $(root) : $(document);
    initHero($root);
    initProducts($root);
    initBlog($root);
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
