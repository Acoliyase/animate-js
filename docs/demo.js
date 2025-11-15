// Enhanced demo with multiple animation types and controls
const box = document.getElementById('box');
const btnFade = document.getElementById('btn-fade');
const btnBounce = document.getElementById('btn-bounce');
const btnRotate = document.getElementById('btn-rotate');
const btnPulse = document.getElementById('btn-pulse');
const btnSlide = document.getElementById('btn-slide');
const btnFlip = document.getElementById('btn-flip');
const btnShake = document.getElementById('btn-shake');
const btnReset = document.getElementById('btn-reset');

// Sliders
const durationSlider = document.getElementById('duration-slider');
const scaleSlider = document.getElementById('scale-slider');
const delaySlider = document.getElementById('delay-slider');
const colorPicker = document.getElementById('color-picker');

// Display elements
const durationValue = document.getElementById('duration-value');
const scaleValue = document.getElementById('scale-value');
const delayValue = document.getElementById('delay-value');
const colorValue = document.getElementById('color-value');
const statCount = document.getElementById('stat-count');
const statDuration = document.getElementById('stat-duration');
const statStatus = document.getElementById('stat-status');
const codeDisplay = document.getElementById('code-display');

// Preset buttons
const presetEntrance = document.getElementById('preset-entrance');
const presetAttention = document.getElementById('preset-attention');
const presetExit = document.getElementById('preset-exit');
const presetLoop = document.getElementById('preset-loop');

let animationCount = 0;
let currentDuration = 600;
let currentScale = 1;
let currentDelay = 0;
let currentColor = '#06b6d4';

// Slider event listeners
durationSlider?.addEventListener('input', (e) => {
  currentDuration = parseInt(e.target.value);
  durationValue.textContent = currentDuration;
  updateCodeDisplay();
});

scaleSlider?.addEventListener('input', (e) => {
  currentScale = parseFloat(e.target.value);
  scaleValue.textContent = currentScale.toFixed(1);
});

delaySlider?.addEventListener('input', (e) => {
  currentDelay = parseInt(e.target.value);
  delayValue.textContent = currentDelay;
});

colorPicker?.addEventListener('input', (e) => {
  currentColor = e.target.value;
  colorValue.textContent = currentColor;
  box.style.background = currentColor;
});

// Clear all animations
function clearAnimations() {
  if (!box) return;
  box.getAnimations().forEach((a) => a.cancel());
  box.style.transform = '';
  box.style.opacity = '';
}

// Update stats
function updateStats(duration) {
  animationCount++;
  statCount.textContent = animationCount;
  statDuration.textContent = duration + 'ms';
  statStatus.textContent = 'Playing...';
  setTimeout(() => {
    statStatus.textContent = 'Ready';
  }, duration + 100);
}

// Update code display
function updateCodeDisplay(code = '') {
  const defaultCode = `// Fade in animation
const box = document.getElementById('box');
box.animate([
  { opacity: 0, transform: 'scale(0.85)' },
  { opacity: 1, transform: 'scale(1)' }
], { duration: ${currentDuration}, easing: 'ease-out' });`;
  codeDisplay.textContent = code || defaultCode;
}

// Fade In
btnFade?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { opacity: 0, transform: 'scale(0.7)' },
      { opacity: 1, transform: `scale(${currentScale})` }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-out', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Fade in\nbox.animate([
  { opacity: 0, transform: 'scale(0.7)' },
  { opacity: 1, transform: 'scale(${currentScale})' }
], { duration: ${currentDuration}, delay: ${currentDelay}, easing: 'ease-out' });`
  );
});

// Bounce
btnBounce?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: `translateY(0) scale(${currentScale})` },
      { transform: `translateY(-60px) scale(${currentScale + 0.1})` },
      { transform: `translateY(0) scale(${currentScale})` }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'cubic-bezier(.22,.9,.34,1)', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Bounce\nbox.animate([
  { transform: 'translateY(0)' },
  { transform: 'translateY(-60px)' },
  { transform: 'translateY(0)' }
], { duration: ${currentDuration}, easing: 'cubic-bezier(.22,.9,.34,1)' });`
  );
});

// Rotate
btnRotate?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-in-out', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Rotate\nbox.animate([
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(360deg)' }
], { duration: ${currentDuration} });`
  );
});

// Pulse
btnPulse?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: `scale(${currentScale})`, opacity: 1 },
      { transform: `scale(${currentScale * 1.2})`, opacity: 0.7 },
      { transform: `scale(${currentScale})`, opacity: 1 }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-in-out', iterations: 3, fill: 'forwards' }
  );
  updateStats(currentDuration * 3);
  updateCodeDisplay(
    `// Pulse (repeating)\nbox.animate([...], { duration: ${currentDuration}, iterations: 3 });`
  );
});

// Slide
btnSlide?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: `translateX(-200px) scale(${currentScale})` },
      { transform: `translateX(0) scale(${currentScale})` }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-out', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Slide in\nbox.animate([
  { transform: 'translateX(-200px)' },
  { transform: 'translateX(0)' }
], { duration: ${currentDuration}, easing: 'ease-out' });`
  );
});

// Flip (3D-like using skew + rotate)
btnFlip?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: 'rotateY(0deg)', opacity: 1 },
      { transform: 'rotateY(90deg)', opacity: 0.5 },
      { transform: 'rotateY(180deg)', opacity: 1 }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-in-out', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Flip (3D rotation)\nbox.animate([
  { transform: 'rotateY(0deg)', opacity: 1 },
  { transform: 'rotateY(180deg)', opacity: 1 }
], { duration: ${currentDuration} });`
  );
});

// Shake
btnShake?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: `translateX(0) scale(${currentScale})` },
      { transform: `translateX(-10px) scale(${currentScale})` },
      { transform: `translateX(10px) scale(${currentScale})` },
      { transform: `translateX(-10px) scale(${currentScale})` },
      { transform: `translateX(0) scale(${currentScale})` }
    ],
    { duration: currentDuration, delay: currentDelay, easing: 'ease-in-out', fill: 'forwards' }
  );
  updateStats(currentDuration);
  updateCodeDisplay(
    `// Shake\nbox.animate([...], { duration: ${currentDuration}, easing: 'ease-in-out' });`
  );
});

// Reset
btnReset?.addEventListener('click', () => {
  clearAnimations();
  statStatus.textContent = 'Reset';
  setTimeout(() => {
    statStatus.textContent = 'Ready';
  }, 300);
});

// Presets
presetEntrance?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { opacity: 0, transform: 'translateY(-50px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { duration: 500, easing: 'ease-out', fill: 'forwards' }
  );
  updateStats(500);
});

presetAttention?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.1)' },
      { transform: 'scale(0.95)' },
      { transform: 'scale(1)' }
    ],
    { duration: 600, easing: 'ease-in-out', fill: 'forwards' }
  );
  updateStats(600);
});

presetExit?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(50px)' }
    ],
    { duration: 500, easing: 'ease-in', fill: 'forwards' }
  );
  updateStats(500);
});

presetLoop?.addEventListener('click', () => {
  clearAnimations();
  box.animate(
    [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ],
    { duration: 2000, easing: 'linear', iterations: Infinity }
  );
  statStatus.textContent = 'Looping...';
});

// Click to random animation
box?.addEventListener('click', () => {
  const animations = [btnFade, btnBounce, btnRotate, btnPulse, btnSlide, btnFlip, btnShake];
  const random = animations[Math.floor(Math.random() * animations.length)];
  random?.click();
});

// Initialize
updateCodeDisplay();
