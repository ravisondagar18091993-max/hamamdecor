/**
 * Hamam Decor — Slick slider initialization (homepage sections)
 */
(function () {
  'use strict';

  function whenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function get$() {
    return window.jQuery;
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

  function initHero($root) {
    var $ = get$();
    $root.find('.hamam-hero-slider[data-hamam-slick="hero"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;

      var autoplay = $el.data('autoplay') === true || $el.data('autoplay') === 'true';
      var speed = parseInt($el.data('speed'), 10) || 6000;

      $el.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: true,
        speed: 900,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        autoplay: autoplay,
        autoplaySpeed: speed,
        pauseOnHover: true,
        adaptiveHeight: false,
        infinite: true,
      });
    });
  }

  function initProducts($root) {
    var $ = get$();
    $root.find('.hamam-product-slider[data-hamam-slick="products"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;

      $el.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
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

      $el.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        responsive: [
          { breakpoint: 1000, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1, arrows: false } },
        ],
      });
    });
  }

  function initVideos($root) {
    var $ = get$();
    $root.find('.hamam-video-slider[data-hamam-slick="videos"]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;

      $el.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        centerMode: true,
        centerPadding: '8%',
        infinite: true,
        speed: 600,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, centerMode: false, centerPadding: '0' } }],
      });
    });
  }

  function initHamamSliders(root) {
    var $ = get$();
    if (!$ || !$.fn.slick) return;

    var $root = root ? $(root) : $(document);
    initHero($root);
    initProducts($root);
    initBlog($root);
    initVideos($root);
  }

  whenReady(function () {
    initHamamSliders();
  });

  document.addEventListener('shopify:section:unload', function (event) {
    if (event.target) destroyInRoot(event.target);
  });

  document.addEventListener('shopify:section:load', function (event) {
    initHamamSliders(event.target);
  });
})();
