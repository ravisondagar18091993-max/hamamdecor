/**
 * Hamam — video gallery: right thumbnails switch left player
 */
(function () {
  'use strict';

  function pauseVideos(container) {
    if (!container) return;
    container.querySelectorAll('video').forEach(function (v) {
      try {
        v.pause();
      } catch (e) {
        /* ignore */
      }
    });
    container.querySelectorAll('iframe').forEach(function (frame) {
      try {
        frame.src = frame.src;
      } catch (e) {
        /* ignore */
      }
    });
  }

  function initGallery(root) {
    if (!root || root.dataset.hamamVideoGalleryInit === 'true') return;
    root.dataset.hamamVideoGalleryInit = 'true';

    var thumbs = root.querySelectorAll('[data-hamam-video-select]');
    var panels = root.querySelectorAll('[data-hamam-video-panel]');
    if (!thumbs.length || !panels.length) return;

    function activate(index) {
      var idx = String(index);
      thumbs.forEach(function (btn) {
        var active = btn.getAttribute('data-hamam-video-select') === idx;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-current', active ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var active = panel.getAttribute('data-hamam-video-panel') === idx;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
        if (!active) pauseVideos(panel);
      });

      var activePanel = root.querySelector('[data-hamam-video-panel="' + idx + '"]');
      if (!activePanel) return;

      var video = activePanel.querySelector('video');
      if (video) {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {});
        }
        return;
      }

      var iframe = activePanel.querySelector('iframe[data-hamam-video-embed]');
      if (iframe) {
        var baseSrc = iframe.getAttribute('data-hamam-video-embed');
        if (baseSrc) {
          var join = baseSrc.indexOf('?') >= 0 ? '&' : '?';
          iframe.src = baseSrc + join + 'autoplay=1&mute=1';
        }
      }
    }

    thumbs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activate(btn.getAttribute('data-hamam-video-select'));
      });
    });

    activate(thumbs[0].getAttribute('data-hamam-video-select'));
  }

  function boot() {
    document.querySelectorAll('[data-hamam-video-gallery]').forEach(initGallery);
  }

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('shopify:section:load', function (event) {
    var gallery = event.target.querySelector('[data-hamam-video-gallery]');
    if (gallery) {
      delete gallery.dataset.hamamVideoGalleryInit;
      initGallery(gallery);
    }
  });
})();
