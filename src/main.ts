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
