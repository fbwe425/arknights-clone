const TRANSITION_MS = 720;
const WHEEL_THRESHOLD = 42;

const pageWrapper = document.getElementById('pageWrapper');
const pageTransition = document.getElementById('pageTransition');
const transitionLabel = document.getElementById('transitionLabel');
const navbar = document.getElementById('navbar');
const loadingScreen = document.getElementById('loadingScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');
const pageNum = document.getElementById('pageNum');
const pageTotal = document.getElementById('pageTotal');
const sections = Array.from(document.querySelectorAll('.page-wrapper > .section'));
const dots = Array.from(document.querySelectorAll('.side-dot'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

let currentPage = 0;
let isTransitioning = false;
let wheelDelta = 0;
let touchStartY = null;
let touchStartX = null;

const pageNames = ['INDEX', 'INFORMATION', 'OPERATOR', 'WORLD', 'MEDIA', 'MORE'];

function clampPage(index) {
  return Math.max(0, Math.min(index, sections.length - 1));
}

function restartClass(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function prepareEntrance(section) {
  section.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((element) => {
    element.classList.remove('visible');
  });

  section.querySelectorAll('.concept-item').forEach((element) => {
    element.classList.remove('in-view');
  });
}

function playEntrance(index) {
  const section = sections[index];
  if (!section) return;

  section.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((element, elementIndex) => {
    window.setTimeout(() => element.classList.add('visible'), 80 + elementIndex * 55);
  });

  if (index === 3) {
    section.querySelectorAll('.concept-item').forEach((element, elementIndex) => {
      window.setTimeout(() => element.classList.add('in-view'), 100 + elementIndex * 120);
    });
  }

  if (index === 0) section.classList.add('in-view');
}

function updateHud(index) {
  const displayIndex = String(index).padStart(2, '0');
  pageNum.textContent = displayIndex;
  pageTotal.textContent = `// ${displayIndex} / 05`;
  navbar.classList.toggle('nav-transparent', index === 0);
  dots.forEach((dot) => dot.classList.toggle('active', Number(dot.dataset.section) === index));
  navLinks.forEach((link) => link.classList.toggle('active', Number(link.dataset.section) === index));
}

function updateHash(index) {
  const sectionId = sections[index]?.id;
  if (sectionId && window.location.hash !== `#${sectionId}`) {
    history.replaceState(null, '', `#${sectionId}`);
  }
}

function cleanupPageClasses(section) {
  section.classList.remove('is-active', 'page--enter-next', 'page--enter-prev', 'page--exit-next', 'page--exit-prev');
}

function goToPage(target, { immediate = false } = {}) {
  target = clampPage(target);
  if (target === currentPage || isTransitioning) return;

  const previous = currentPage;
  const direction = target > previous ? 1 : -1;
  const currentSection = sections[previous];
  const targetSection = sections[target];

  isTransitioning = true;
  document.body.classList.add('is-transitioning');
  transitionLabel.textContent = pageNames[target];
  pageTransition.classList.add('is-running');
  prepareEntrance(targetSection);

  targetSection.classList.add(direction > 0 ? 'page--enter-next' : 'page--enter-prev');
  targetSection.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      currentSection.classList.add(direction > 0 ? 'page--exit-next' : 'page--exit-prev');
      targetSection.classList.remove('page--enter-next', 'page--enter-prev');
      targetSection.classList.add('is-active');
      currentSection.classList.remove('is-active');
    });
  });

  currentPage = target;
  updateHud(target);
  updateHash(target);
  playEntrance(target);

  window.setTimeout(() => {
    cleanupPageClasses(currentSection);
    currentSection.setAttribute('aria-hidden', 'true');
    pageTransition.classList.remove('is-running');
    document.body.classList.remove('is-transitioning');
    isTransitioning = false;
  }, immediate ? 0 : TRANSITION_MS);
}

function bootPages() {
  const initialHash = window.location.hash.replace('#', '');
  const hashIndex = sections.findIndex((section) => section.id === initialHash);
  currentPage = hashIndex >= 0 ? hashIndex : 0;

  sections.forEach((section, index) => {
    cleanupPageClasses(section);
    section.classList.toggle('is-active', index === currentPage);
    section.setAttribute('aria-hidden', index === currentPage ? 'false' : 'true');
    prepareEntrance(section);
  });

  updateHud(currentPage);
  updateHash(currentPage);
  playEntrance(currentPage);
}

function onWheel(event) {
  if (isTransitioning || Math.abs(event.deltaY) < 2) return;
  event.preventDefault();
  wheelDelta += event.deltaY;
  if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) return;
  const direction = wheelDelta > 0 ? 1 : -1;
  wheelDelta = 0;
  goToPage(currentPage + direction);
}

function onKeydown(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const nextKeys = ['ArrowDown', 'PageDown', ' ', 'Spacebar'];
  const previousKeys = ['ArrowUp', 'PageUp'];
  if (nextKeys.includes(event.key)) {
    event.preventDefault();
    goToPage(currentPage + 1);
  }
  if (previousKeys.includes(event.key)) {
    event.preventDefault();
    goToPage(currentPage - 1);
  }
  if (event.key === 'Home') {
    event.preventDefault();
    goToPage(0);
  }
  if (event.key === 'End') {
    event.preventDefault();
    goToPage(sections.length - 1);
  }
}

function onTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStartY = touch.clientY;
  touchStartX = touch.clientX;
}

function onTouchEnd(event) {
  if (touchStartY === null || isTransitioning) return;
  const touch = event.changedTouches[0];
  const deltaY = touch.clientY - touchStartY;
  const deltaX = touch.clientX - touchStartX;
  touchStartY = null;
  touchStartX = null;
  if (Math.abs(deltaY) < 55 || Math.abs(deltaY) <= Math.abs(deltaX)) return;
  goToPage(currentPage + (deltaY < 0 ? 1 : -1));
}

function initialiseSwipers() {
  if (!window.Swiper) return;
  new Swiper('.info-swiper', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
  });
  new Swiper('.operator-swiper', {
    slidesPerView: 5,
    spaceBetween: 8,
    freeMode: true,
  });
}

function initialiseControls() {
  dots.forEach((dot) => dot.addEventListener('click', () => goToPage(Number(dot.dataset.section))));
  navLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    goToPage(Number(link.dataset.section));
  }));
  document.querySelectorAll('[data-page-target]').forEach((control) => {
    control.addEventListener('click', () => goToPage(Number(control.dataset.pageTarget)));
  });

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeydown);
  pageWrapper.addEventListener('touchstart', onTouchStart, { passive: true });
  pageWrapper.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('hashchange', () => {
    const index = sections.findIndex((section) => `#${section.id}` === window.location.hash);
    if (index >= 0) goToPage(index);
  });

  const soundIcon = document.querySelector('.sound-icon');
  if (soundIcon) {
    soundIcon.addEventListener('click', () => soundIcon.classList.toggle('active'));
  }

  document.querySelectorAll('.progress-seg').forEach((segment, index, segments) => {
    segment.addEventListener('click', () => {
      segments.forEach((item, itemIndex) => {
        item.style.background = itemIndex <= index ? 'var(--cyan)' : '#5a5a5a';
      });
    });
  });
}

function runLoadingSequence() {
  let progress = 0;
  const interval = window.setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 16 + 7);
    loadingBar.style.width = `${progress}%`;
    loadingText.textContent = `LOADING - ${Math.round(progress)}% .....`;

    if (progress < 100) return;
    window.clearInterval(interval);
    window.setTimeout(() => {
      loadingScreen.classList.add('hidden');
      pageWrapper.classList.add('loaded');
    }, 420);
  }, 170);
}

bootPages();
initialiseSwipers();
initialiseControls();
runLoadingSequence();
