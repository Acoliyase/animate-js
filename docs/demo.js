// Simple demo using only the Web Animations API (no external dependencies)
const box = document.getElementById('box');
const btnFade = document.getElementById('btn-fade');
const btnBounce = document.getElementById('btn-bounce');
const btnRotate = document.getElementById('btn-rotate');
const btnReset = document.getElementById('btn-reset');

function clearAnimations() {
  if (!box) return;
  box.getAnimations().forEach((a) => a.cancel());
  box.style.transform = '';
  box.style.opacity = '';
}

btnFade?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { opacity: 0, transform: 'scale(.85)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    { duration: 600, easing: 'cubic-bezier(.22,.9,.34,1)', fill: 'forwards' }
  );
});

btnBounce?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-48px) scale(1.06)' },
      { transform: 'translateY(0) scale(1)' }
    ],
    { duration: 700, easing: 'cubic-bezier(.22,.9,.34,1)', iterations: 1, fill: 'forwards' }
  );
});

btnRotate?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [ { transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' } ],
    { duration: 800, easing: 'ease-in-out', fill: 'forwards' }
  );
});

btnReset?.addEventListener('click', () => {
  clearAnimations();
});
