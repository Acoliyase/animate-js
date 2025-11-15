import anime from 'animejs/lib/anime.es.js';

type Target = string | Element | Element[] | NodeList | null | undefined;

const easingMap: Record<string, string> = {
  ease: 'easeOutQuad',
  'ease-in': 'easeInQuad',
  'ease-out': 'easeOutQuad',
  'ease-in-out': 'easeInOutQuad',
  linear: 'linear',
  bounce: 'easeOutBounce',
  elastic: 'easeOutElastic'
};

function resolveTarget(target: Target, root?: Element | null) {
  if (!target) return [];
  if (typeof target === 'string') {
    try {
      const el = (root || document).querySelectorAll(target);
      return el;
    } catch (e) {
      return [];
    }
  }
  return target as any;
}

class MotionBuilder {
  target: Target;
  steps: any[];

  constructor(target: Target) {
    this.target = target;
    this.steps = [];
  }

  fadeIn(duration = 400, easing = 'ease') {
    this.steps.push({ opacity: [0, 1], duration, easing });
    return this;
  }

  fadeOut(duration = 400, easing = 'ease') {
    this.steps.push({ opacity: [1, 0], duration, easing });
    return this;
  }

  scale(value = 1, duration = 400, easing = 'ease') {
    this.steps.push({ scale: value, duration, easing });
    return this;
  }

  rotate(deg = 0, duration = 400, easing = 'ease') {
    this.steps.push({ rotate: deg, duration, easing });
    return this;
  }

  translateX(x = 0, duration = 400, easing = 'ease') {
    this.steps.push({ translateX: x, duration, easing });
    return this;
  }

  translateY(y = 0, duration = 400, easing = 'ease') {
    this.steps.push({ translateY: y, duration, easing });
    return this;
  }

  css(prop: Record<string, any>, duration = 400, easing = 'ease') {
    this.steps.push({ ...prop, duration, easing });
    return this;
  }

  play() {
    const targets = this.target;
    const tl = anime.timeline({});
    this.steps.forEach((step) => {
      const { duration, easing, ...props } = step;
      tl.add({ targets, ...props, duration, easing: easingMap[easing] || easing });
    });
    return tl;
  }
}

export function motion(target: Target | (() => Target)) {
  let resolved: any = null;
  if (typeof target === 'function') {
    resolved = (target as any)();
  } else {
    resolved = target;
  }
  return new MotionBuilder(resolved);
}

export function timeline(params?: any) {
  const tl = anime.timeline(params || {});
  return {
    add: (selector: Target, props: any, offset?: number) => {
      const targets = selector;
      tl.add({ targets, ...props }, offset);
      return this;
    },
    play: () => tl.play(),
    pause: () => tl.pause(),
    reverse: () => tl.reverse()
  } as any;
}

export function remove(target: Target) {
  try {
    anime.remove(target as any);
  } catch (e) {
    // ignore
  }
}

export default {
  motion,
  timeline,
  remove
};
