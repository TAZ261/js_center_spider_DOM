'use strict';

// Position spider in the center of the wall after the page has loaded.
function positionSpider() {
  const wall = document.querySelector('.wall');
  const spider = document.querySelector('.spider');

  if (!wall || !spider) {
    // Elements missing: nothing to position.
    return;
  }

  const spiderWidth = spider.offsetWidth;
  const spiderHeight = spider.offsetHeight;

  spider.style.left = Math.round((wall.clientWidth - spiderWidth) / 2) + 'px';
  spider.style.top = Math.round((wall.clientHeight - spiderHeight) / 2) + 'px';
}

function onLoaded() {
  // initial positioning
  positionSpider();

  // Reposition on resize (debounced).
  let resizeTimer = null;

  window.addEventListener('resize', () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      positionSpider();
    }, 100);
  });
}

// Run immediately if already loaded; otherwise wait for load event.
if (document.readyState === 'complete') {
  onLoaded();
} else {
  window.addEventListener('load', onLoaded, { once: true });
}
