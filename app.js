const TWEMOJI = 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/';

const galleryPages = [
  { id: 'butterfly', title: 'Flutter by', meta: 'Small joys · 8 min', mood: 'Small joys', image: `${TWEMOJI}1f98b.svg`, bg: '#efeaff' },
  { id: 'sunflower', title: 'Good light', meta: 'Nature · 10 min', mood: 'Nature', image: `${TWEMOJI}1f33c.svg`, bg: '#fff0c9' },
  { id: 'dog', title: 'Best friend', meta: 'Animals · 12 min', mood: 'Animals', image: `${TWEMOJI}1f436.svg`, bg: '#e2f1ec' },
  { id: 'snail', title: 'Take it slow', meta: 'Nature · 7 min', mood: 'Nature', image: `${TWEMOJI}1f40c.svg`, bg: '#fce6dd' },
  { id: 'sparkle', title: 'Tiny magic', meta: 'Small joys · 5 min', mood: 'Small joys', image: `${TWEMOJI}2728.svg`, bg: '#e8e5fb' },
  { id: 'cat', title: 'Soft landing', meta: 'Animals · 11 min', mood: 'Animals', image: `${TWEMOJI}1f431.svg`, bg: '#f4e6ef' },
];

const palette = [
  { number: 1, name: 'coral', color: '#f2946f' },
  { number: 2, name: 'sun', color: '#f7c85d' },
  { number: 3, name: 'mint', color: '#99d8bc' },
  { number: 4, name: 'sky', color: '#84b8e5' },
  { number: 5, name: 'violet', color: '#a596e9' },
  { number: 6, name: 'blush', color: '#e6a7bd' },
];

const puzzle = {
  id: 'sunlit-meadow',
  name: 'Sunlit meadow',
  page: '01',
  regions: [
    { id: 'sky', number: 4, type: 'rect', attrs: { x: 0, y: 0, width: 360, height: 420 } },
    { id: 'sun', number: 2, type: 'circle', attrs: { cx: 278, cy: 88, r: 45 } },
    { id: 'cloud-left', number: 6, type: 'path', attrs: { d: 'M45 123c0-14 12-24 26-24 8 0 15 4 19 10 5-11 15-18 27-18 17 0 31 14 31 31H45Z' } },
    { id: 'cloud-right', number: 6, type: 'path', attrs: { d: 'M205 153c0-11 9-20 20-20 7 0 12 3 16 8 4-9 12-14 22-14 14 0 25 11 25 26H205Z' } },
    { id: 'back-hill', number: 3, type: 'path', attrs: { d: 'M0 247c39-36 75-48 113-37 37 11 61 7 96-20 39-31 85-30 151 19v211H0V247Z' } },
    { id: 'front-hill', number: 3, type: 'path', attrs: { d: 'M0 318c44-42 86-43 125-17 35 23 61 17 91-13 45-45 93-34 144 8v125H0V318Z' } },
    { id: 'big-flower-petal-a', number: 1, type: 'circle', attrs: { cx: 103, cy: 277, r: 16 } },
    { id: 'big-flower-petal-b', number: 1, type: 'circle', attrs: { cx: 135, cy: 277, r: 16 } },
    { id: 'big-flower-petal-c', number: 6, type: 'circle', attrs: { cx: 119, cy: 262, r: 16 } },
    { id: 'big-flower-petal-d', number: 6, type: 'circle', attrs: { cx: 119, cy: 292, r: 16 } },
    { id: 'big-flower-center', number: 2, type: 'circle', attrs: { cx: 119, cy: 277, r: 12 } },
    { id: 'big-flower-stem', number: 3, type: 'path', attrs: { d: 'M116 294c-3 38-5 59-13 88h12c8-31 11-59 13-88Z' } },
    { id: 'leaf-one', number: 5, type: 'path', attrs: { d: 'M112 338c-25-7-39 5-42 24 19 2 34-6 42-24Z' } },
    { id: 'leaf-two', number: 5, type: 'path', attrs: { d: 'M120 356c23-13 38-8 46 8-16 9-31 8-46-8Z' } },
    { id: 'small-flower-petal', number: 1, type: 'circle', attrs: { cx: 273, cy: 311, r: 13 } },
    { id: 'small-flower-center', number: 2, type: 'circle', attrs: { cx: 273, cy: 311, r: 7 } },
    { id: 'small-flower-stem', number: 3, type: 'path', attrs: { d: 'M272 323c-1 22 0 37-6 53h9c5-17 5-33 5-53Z' } },
    { id: 'small-leaf', number: 5, type: 'path', attrs: { d: 'M273 356c15-8 25-3 29 7-12 6-22 4-29-7Z' } },
    { id: 'butterfly-wing-left', number: 6, type: 'path', attrs: { d: 'M200 267c-20-20-39-10-31 10 8 18 23 20 34 6Z' } },
    { id: 'butterfly-wing-right', number: 5, type: 'path', attrs: { d: 'M205 267c20-20 39-10 31 10-8 18-23 20-34 6Z' } },
    { id: 'butterfly-body', number: 2, type: 'path', attrs: { d: 'M201 264c6-5 11 0 9 11-1 10-7 14-11 6-3-7-2-13 2-17Z' } },
  ],
};

let currentMood = 'All';
let selectedColor = 2;
let filled = new Set();
let toastTimer;

const $ = (selector) => document.querySelector(selector);

function renderGallery() {
  const grid = $('#page-grid');
  const visible = currentMood === 'All' ? galleryPages : galleryPages.filter((page) => page.mood === currentMood);
  grid.innerHTML = visible.map((page, index) => `
    <article class="page-card">
      <div class="page-image" style="background:${page.bg}">
        <span class="card-number">${String(index + 2).padStart(2, '0')}</span>
        <img src="${page.image}" alt="${page.title} sample artwork" loading="lazy" />
      </div>
      <div class="page-meta"><div><strong>${page.title}</strong><small>${page.meta}</small></div><span class="card-arrow">↗</span></div>
    </article>`).join('');
}

function createSvgElement(tag, attrs, className = '') {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  if (className) element.setAttribute('class', className);
  return element;
}

function renderPuzzle() {
  const canvas = $('#puzzle-canvas');
  canvas.innerHTML = '';
  const background = createSvgElement('rect', { x: 0, y: 0, width: 360, height: 420 }, 'puzzle-background');
  canvas.appendChild(background);
  puzzle.regions.forEach((region) => {
    const shape = createSvgElement(region.type, region.attrs, 'puzzle-region');
    shape.dataset.id = region.id;
    shape.dataset.number = region.number;
    shape.setAttribute('tabindex', '0');
    shape.setAttribute('role', 'button');
    shape.setAttribute('aria-label', `Color ${region.number} shape`);
    if (filled.has(region.id)) {
      shape.classList.add('filled');
      shape.style.fill = palette[region.number - 1].color;
    } else {
      shape.style.fill = '#f7f5ef';
    }
    shape.addEventListener('click', () => fillRegion(region.id));
    shape.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fillRegion(region.id); } });
    canvas.appendChild(shape);
    const labelPosition = getLabelPosition(region);
    const label = createSvgElement('text', { x: labelPosition.x, y: labelPosition.y }, 'puzzle-label');
    label.dataset.for = region.id;
    label.textContent = filled.has(region.id) ? '' : region.number;
    canvas.appendChild(label);
  });
}

function getLabelPosition(region) {
  if (region.type === 'circle') return { x: region.attrs.cx, y: region.attrs.cy };
  if (region.id.includes('hill')) return { x: region.id === 'front-hill' ? 195 : 260, y: region.id === 'front-hill' ? 370 : 278 };
  if (region.id.includes('cloud')) return { x: Number(region.attrs.d.match(/M(\d+)/)[1]) + 90, y: Number(region.attrs.d.match(/(\d+)c/)[1]) + 8 };
  if (region.id.includes('leaf')) return { x: region.id === 'leaf-one' ? 84 : 140, y: 350 };
  if (region.id.includes('wing')) return { x: region.id.includes('left') ? 184 : 226, y: 271 };
  if (region.id === 'butterfly-body') return { x: 205, y: 274 };
  if (region.id.includes('stem')) return { x: region.id.includes('small') ? 286 : 103, y: 370 };
  return { x: 180, y: 210 };
}

function renderPalette() {
  $('#palette').innerHTML = palette.map((item) => `
    <button class="color-choice ${selectedColor === item.number ? 'selected' : ''}" data-number="${item.number}" style="background:${item.color}" role="radio" aria-checked="${selectedColor === item.number}" aria-label="Color ${item.number}, ${item.name}">
      <span>${item.number}</span>
    </button>`).join('');
  document.querySelectorAll('.color-choice').forEach((button) => button.addEventListener('click', () => {
    selectedColor = Number(button.dataset.number);
    renderPalette();
    updateSelectedLabel();
  }));
}

function updateSelectedLabel() { $('#selected-label').textContent = `color ${selectedColor} selected`; }

function updateProgress() {
  const total = puzzle.regions.length;
  const count = filled.size;
  const percent = Math.round((count / total) * 100);
  $('#filled-count').textContent = count;
  $('#total-count').textContent = total;
  $('#progress-percent').textContent = `${percent}%`;
  $('#progress-ring').style.background = `conic-gradient(var(--purple) ${percent * 3.6}deg, var(--lavender) 0deg)`;
  palette.forEach((item) => {
    const allDone = puzzle.regions.filter((region) => region.number === item.number).every((region) => filled.has(region.id));
    document.querySelector(`.color-choice[data-number="${item.number}"]`)?.classList.toggle('done', allDone);
  });
}

function fillRegion(id) {
  const region = puzzle.regions.find((item) => item.id === id);
  if (!region || filled.has(id)) return;
  const target = document.querySelector(`.puzzle-region[data-id="${id}"]`);
  if (region.number !== selectedColor) {
    target.classList.remove('wrong');
    void target.offsetWidth;
    target.classList.add('wrong');
    showToast(`That shape needs color ${region.number}`);
    return;
  }
  filled.add(id);
  target.classList.add('filled');
  target.style.fill = palette[region.number - 1].color;
  target.nextElementSibling.textContent = '';
  updateProgress();
  if (filled.size === puzzle.regions.length) {
    window.setTimeout(showCompletion, 450);
  } else {
    showToast('Nice match ✦');
  }
}

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800); }

function openPlay() {
  $('#library-view').hidden = true;
  $('#play-view').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPuzzle(); renderPalette(); updateProgress(); updateSelectedLabel();
}

function resetPuzzle() { filled = new Set(); renderPuzzle(); renderPalette(); updateProgress(); showToast('Fresh page, fresh start'); }

function showCompletion() { $('#completion-page-name').textContent = puzzle.name; $('#completion-modal').hidden = false; }
function closeCompletion() { $('#completion-modal').hidden = true; $('#play-view').hidden = true; $('#library-view').hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' }); }

$('#page-grid').addEventListener('click', (event) => { if (event.target.closest('.page-card')) showToast('This page is joining the library soon ✦'); });
document.querySelectorAll('.mood-chip').forEach((chip) => chip.addEventListener('click', () => { currentMood = chip.dataset.mood; document.querySelectorAll('.mood-chip').forEach((item) => item.classList.toggle('active', item === chip)); renderGallery(); }));
$('#start-button').addEventListener('click', openPlay); $('#feature-play').addEventListener('click', openPlay); $('#back-button').addEventListener('click', closeCompletion); $('#home-button').addEventListener('click', closeCompletion); $('#reset-button').addEventListener('click', resetPuzzle);
$('#hint-button').addEventListener('click', () => { const next = puzzle.regions.find((region) => !filled.has(region.id)); if (!next) return; selectedColor = next.number; renderPalette(); updateSelectedLabel(); showToast(`Try color ${next.number} next ✦`); });
$('#shuffle-button').addEventListener('click', () => { currentMood = 'All'; document.querySelectorAll('.mood-chip').forEach((item) => item.classList.toggle('active', item.dataset.mood === 'All')); galleryPages.push(galleryPages.shift()); renderGallery(); showToast('A new little lineup ✦'); });
$('#help-button').addEventListener('click', () => { $('#help-modal').hidden = false; }); $('#close-help').addEventListener('click', () => { $('#help-modal').hidden = true; }); $('#got-it-button').addEventListener('click', () => { $('#help-modal').hidden = true; }); $('#continue-button').addEventListener('click', closeCompletion);
$('#help-modal').addEventListener('click', (event) => { if (event.target === $('#help-modal')) $('#help-modal').hidden = true; }); $('#completion-modal').addEventListener('click', (event) => { if (event.target === $('#completion-modal')) closeCompletion(); });

renderGallery();
