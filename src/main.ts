/**
 * Progressive enhancement for stevenhan.net.
 *
 * The page is fully authored in index.html and revealed with pure-CSS
 * animations, so it renders and reads correctly with no JavaScript at all.
 * This module only adds the cycling role flipper on top of the static content.
 *
 * Accessibility: the flipper opts out entirely under prefers-reduced-motion,
 * and otherwise pauses on hover, on keyboard focus within the hero, and while
 * the tab is hidden (WCAG 2.2.2 Pause, Stop, Hide). It is resilient to a
 * dropped `transitionend` (e.g. a backgrounded tab) via a timeout fallback and
 * a re-entrancy guard, so it can never wedge on a blank role.
 */

const ROLES = [
  "Solutions Architect",
  "Data Specialist",
  "Cyber Enthusiast",
  "First Responder",
  "Dog Dad",
  "Runner",
] as const;

const FLIP_INTERVAL_MS = 2500;
const FLIP_START_DELAY_MS = 2200; // let the on-load reveal settle first
const LEAVE_FALLBACK_MS = 720; // > the 0.62s leave transition, in case transitionend never fires

function initRoleFlipper(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const word = document.querySelector<HTMLElement>(".flip__word");
  if (!word || ROLES.length <= 1) return;

  let index = 0;
  let paused = false; // hover / keyboard focus
  let inFlight = false; // a flip is mid-transition
  let fallbackTimer = 0;

  const finishSwap = (next: string): void => {
    word.textContent = next;
    word.classList.remove("leaving");
    word.classList.add("entering"); // jump below with no transition
    void word.offsetWidth; // force reflow so the ease-up animates
    word.classList.remove("entering");
    index = (index + 1) % ROLES.length;
    inFlight = false;
  };

  const cycle = (): void => {
    // Pause/stop mechanism + guards: never start a flip while paused, hidden,
    // or one is already running.
    if (paused || inFlight || document.hidden) return;

    inFlight = true;
    const next = ROLES[(index + 1) % ROLES.length];
    word.classList.add("leaving");

    const onLeft = (event: TransitionEvent): void => {
      if (event.propertyName !== "transform") return;
      word.removeEventListener("transitionend", onLeft);
      window.clearTimeout(fallbackTimer);
      finishSwap(next);
    };
    word.addEventListener("transitionend", onLeft);

    // Safety net: if transitionend is never delivered (interrupted transition,
    // backgrounded tab), complete the swap anyway so the flipper can't wedge.
    fallbackTimer = window.setTimeout(() => {
      word.removeEventListener("transitionend", onLeft);
      finishSwap(next);
    }, LEAVE_FALLBACK_MS);
  };

  // WCAG 2.2.2: give the moving content a pause mechanism.
  const hero = word.closest(".hero") ?? document.body;
  hero.addEventListener("pointerenter", () => (paused = true));
  hero.addEventListener("pointerleave", () => (paused = false));
  hero.addEventListener("focusin", () => (paused = true));
  hero.addEventListener("focusout", () => (paused = false));

  window.setTimeout(() => {
    cycle();
    window.setInterval(cycle, FLIP_INTERVAL_MS);
  }, FLIP_START_DELAY_MS);
}

initRoleFlipper();

/**
 * Easter egg on the tagline's "wonderful":
 * - every click sends a wavefront across the page (expanding rings + a content
 *   ripple where each block lifts and settles, staggered by distance)
 * - the 10th click turns the word into a pulsing rainbow
 * Motion is skipped under prefers-reduced-motion; the rainbow still appears (static).
 */
function initWonderfulEasterEgg(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const word = document.querySelector<HTMLElement>(".tagline .wonderful");
  const layer = document.querySelector<HTMLElement>(".ripple-fx");
  if (!word || !layer) return;

  const CHAR_ROOTS = ".wordmark, .place, .kicker, .lead, .tagline, .experiments__head, .exp, .contact";
  const WAVE_SPEED = 0.6; // px per ms - how fast the wavefront travels across the page
  const RAINBOW_AT = 10;
  let clicks = 0;
  let hasSplit = false;

  // Wrap words + characters in spans so each character can float on its own.
  // Runs lazily on the first click, keeping the initial DOM clean for SEO and
  // screen readers (which never trigger it).
  const splitEl = (root: Element): void => {
    Array.from(root.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        if (!text.trim()) return;
        // Wrap the whole run in one inline box, so inside flex/grid parents the
        // words don't each become a separately-gapped flex item.
        const line = document.createElement("span");
        line.className = "wv-line";
        text.split(/(\s+)/).forEach((part) => {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            line.appendChild(document.createTextNode(part));
            return;
          }
          const wordSpan = document.createElement("span");
          wordSpan.className = "wv-word";
          for (const ch of part) {
            const charSpan = document.createElement("span");
            charSpan.className = "wv-char";
            charSpan.textContent = ch;
            wordSpan.appendChild(charSpan);
          }
          line.appendChild(wordSpan);
        });
        root.replaceChild(line, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.getAttribute("aria-hidden") === "true") return; // leave decorative marks alone
        if (el.classList.contains("wonderful")) {
          el.classList.add("wv-char"); // float as one unit so the rainbow stays intact
          return;
        }
        splitEl(el);
      }
    });
  };

  const ensureSplit = (): void => {
    if (hasSplit) return;
    hasSplit = true;
    document.querySelectorAll(CHAR_ROOTS).forEach(splitEl);
  };

  const fireWave = (x: number, y: number, rings: number): void => {
    const rMax = Math.hypot(window.innerWidth, window.innerHeight);
    const size = 2.5 * rMax; // ring band sits at 80% radius -> reaches rMax at scale 1
    const ringDuration = rMax / WAVE_SPEED;

    for (let i = 0; i < rings; i++) {
      const ring = document.createElement("span");
      ring.className = "ripple-ring";
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.animationDuration = `${ringDuration}ms`;
      ring.style.animationDelay = `${i * 260}ms`;
      ring.addEventListener("animationend", () => ring.remove());
      layer.appendChild(ring);
    }

    // Float each character as the wavefront reaches it (delay = distance / speed).
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".wv-char"));
    const role = document.querySelector<HTMLElement>(".role");
    if (role) targets.push(role); // the flip word is dynamic, so float it as a whole

    // read all positions first, then animate, to avoid layout thrash
    const plan = targets.map((el) => {
      const r = el.getBoundingClientRect();
      const dist = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
      return { el, delay: dist / WAVE_SPEED };
    });
    plan.forEach(({ el, delay }) => {
      el.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-11px)", offset: 0.32 },
          { transform: "translateY(0)" },
        ],
        { duration: 760, delay, easing: "ease-in-out" }
      );
    });
  };

  word.addEventListener("click", (event) => {
    clicks += 1;
    if (!reduce.matches) {
      ensureSplit();
      fireWave(event.clientX, event.clientY, clicks === RAINBOW_AT ? 3 : 2);
    }
    if (clicks >= RAINBOW_AT) word.classList.add("wonderful--rainbow");
  });
}

initWonderfulEasterEgg();
