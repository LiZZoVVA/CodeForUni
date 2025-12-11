document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.slidercontainer');
  const track = document.querySelector('.slidertrack');
  const cards = [...document.querySelectorAll('.bigcard')];
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let current = 0;
  const update = () => {
    cards.forEach((c, i) => {
      c.classList.toggle('active', i === current);
      c.classList.toggle('near', Math.abs(i - current) === 1);
    });
    center(current);
  };
  const center = (i) => {
    const card = cards[i];
    if (!card) return;
    const target = card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
    const limit = track.scrollWidth - container.clientWidth;
    track.style.transform = `translateX(-${Math.min(Math.max(target, 0), limit)}px)`;
  };
  const move = (dir) => {
    current = Math.min(Math.max(current + dir, 0), cards.length - 1);
    update();
  };
  next.addEventListener('click', () => move(1));
  prev.addEventListener('click', () => move(-1));
  let startX = 0;
  container.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  container.addEventListener('touchend', e => move(startX - e.changedTouches[0].clientX > 50 ? 1 : (e.changedTouches[0].clientX - startX > 50 ? -1 : 0)));
  window.addEventListener('resize', () => {
    clearTimeout(window._resize);
    window._resize = setTimeout(() => center(current), 100);
  });
  const images = [...document.images];
  const unloaded = images.filter(img => !img.complete);
  if (unloaded.length)
    Promise.all(unloaded.map(img => new Promise(r => img.addEventListener('load', r)))).then(update);
  else
    update();
});
