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

async function getAnime() {
  try {
    // dynamic import so we don't fail when `animejs` isn't installed
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mod = await import('animejs/lib/anime.es.js');
    return mod?.default || mod;
  } catch (e) {
    return null;
  }
}

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

  async play() {
    const targets = this.target;
    const anime = await getAnime();

    if (anime) {
      const tl = anime.timeline({});
      this.steps.forEach((step) => {
        const { duration, easing, ...props } = step;
        tl.add({ targets, ...props, duration, easing: easingMap[easing] || easing });
      });
      return tl;
    }

    // Fallback: use Web Animations API for basic transforms/opacity
    const els = resolveTarget(targets);
    const animations: Animation[] = [];

    for (const el of Array.from((els as unknown) as Element[])) {
      let delay = 0;
      for (const step of this.steps) {
        const { duration = 400, easing = 'ease', ...props } = step;
        const keyframes: Keyframe[] = [];
        const frame: Record<string, any> = {};
        const from: Record<string, any> = {};
        const to: Record<string, any> = {};

        if (props.opacity) {
          if (Array.isArray(props.opacity)) {
            from.opacity = props.opacity[0];
            to.opacity = props.opacity[1];
          } else {
            to.opacity = props.opacity;
          }
        }
        if (props.scale !== undefined) {
          from.transform = getComputedStyle(el).transform;
          to.transform = `scale(${props.scale})`;
        }
        if (props.rotate !== undefined) {
          from.transform = getComputedStyle(el).transform;
          to.transform = `rotate(${props.rotate}deg)`;
        }
        if (props.translateX !== undefined || props.translateY !== undefined) {
          const tx = props.translateX || 0;
          const ty = props.translateY || 0;
          from.transform = getComputedStyle(el).transform;
          to.transform = `translate(${tx}px, ${ty}px)`;
        }

        if (Object.keys(from).length === 0) {
          // try to infer a sensible from-state
          if (to.transform) from.transform = getComputedStyle(el).transform || 'none';
          if (to.opacity === undefined) from.opacity = getComputedStyle(el).opacity;
        }

        keyframes.push(from);
        keyframes.push(to);

        const anim = (el as Element).animate(keyframes, {
          duration,
          easing: easingMap[easing] || easing,
          fill: 'forwards',
          delay
        });
        animations.push(anim);
        delay += duration;
      }
    }

    return animations;
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

export async function timeline(params?: any) {
  const anime = await getAnime();
  if (anime) {
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

  // minimal fallback timeline using WAAPI (very small subset)
  const list: { selector: Target; props: any; offset?: number }[] = [];
  return {
    add: (selector: Target, props: any, offset?: number) => {
      list.push({ selector, props, offset });
      return this;
    },
    play: () => {
      for (const item of list) {
        const els = resolveTarget(item.selector);
        for (const el of Array.from((els as unknown) as Element[])) {
          const { duration = 400, easing = 'ease', ...props } = item.props;
          const keyframes: Keyframe[] = [];
          const from: Record<string, any> = {};
          const to: Record<string, any> = {};
          if (props.scale !== undefined) to.transform = `scale(${props.scale})`;
          if (props.rotate !== undefined) to.transform = `rotate(${props.rotate}deg)`;
          if (props.x !== undefined) to.transform = `translateX(${props.x}px)`;
          if (props.backgroundColor !== undefined) {
            from.backgroundColor = getComputedStyle(el).backgroundColor;
            to.backgroundColor = props.backgroundColor;
          }
          keyframes.push(from);
          keyframes.push(to);
          (el as Element).animate(keyframes, { duration, easing: easingMap[easing] || easing, fill: 'forwards' });
        }
      }
    }
  } as any;
}

export function remove(target: Target) {
  // try anime first, else use WAAPI cancel
  getAnime().then((anime) => {
    if (anime) {
      try {
        anime.remove(target as any);
      } catch (e) {
        // ignore
      }
      return;
    }

    const els = resolveTarget(target);
    for (const el of Array.from((els as unknown) as Element[])) {
      try {
        (el as Element).getAnimations().forEach((a) => a.cancel());
      } catch (e) {
        // ignore
      }
    }
  });
}

export default {
  motion,
  timeline,
  remove
};
