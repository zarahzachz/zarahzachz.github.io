const menuButton = document.querySelector('.js-settings-menu-trigger');
const menu = document.querySelector('.js-settings-menu');

menuButton.addEventListener('click', () => {
	if (menuButton.getAttribute('aria-expanded') === 'true') {
		menuButton.setAttribute('aria-expanded', 'false');
    menu.setAttribute('hidden', true)
  }	else if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.setAttribute('aria-expanded', 'true')
    menu.removeAttribute('hidden')
  }
})

const setting = {
  'font-size': {
    1: '12px',
    2: '14px',
    3: '16px',
    4: '18px',
    5: '20px',
    6: '22px',
    7: '24px',
    8: '26px',
    9: '28px',
    10: '32px',
    11: '40px',
    12: '56px',
    13: '72px',
    14: '96px',
    15: '128px'
  },
  'line-height': {
    1: '1em',
    2: '1.2em',
    3: '1.4em',
    4: '1.6em',
    5: '1.8em',
    6: '2em',
    7: '2.2em',
    8: '2.4em',
    9: '2.6em',
  },
  'content-width': {
    1: '20em',
    2: '25em',
    3: '30em',
    4: '35em',
    5: '40em',
    6: '45em',
    7: '50em',
    8: '55em',
    9: '60em'
  }
}

const typefaceGroup = menu.querySelector('[data-setting="typeface"]');
const typefaces = Array.from(typefaceGroup.querySelectorAll('[data-type]'));
const typefaceHandler = typefaces.map(typeface => {
  typeface.addEventListener('change', function(e) { 
    if (this.dataset.type === 'serif') {
      document.documentElement.style.setProperty('--font-family', 'var(--serif)');
    } else if (this.dataset.type === 'sans') {
      document.documentElement.style.setProperty('--font-family', 'var(--sans)');
    }
  })
});

const fontSizeGroup = menu.querySelector('[data-setting="font-size"]');
const fontSizeRange = fontSizeGroup.querySelector('input[type="range"]');
const fontSizeHandler = fontSizeRange.addEventListener('input', function() {
  let v = this.value;
  const n = this.getAttribute('name');

  // Assign range value to output element
  const o = fontSizeGroup.querySelector('output');
  o.value = parseInt(v);

  // Set aria-valuetext to range value, add label using name attr
  this.setAttribute('aria-valuetext', `${n.replace('-', ' ')}: ${v}`)

  // Assign mapped value from Setting obj to CSS custom property
  document.documentElement.style.setProperty('--font-size', setting[n][v]);
});

const contentWidthGroup = menu.querySelector('[data-setting="content-width"]');
const contentWidthRange = contentWidthGroup.querySelector('input[type="range"]');
const contentWidthHandler = contentWidthRange.addEventListener('input', function() {
  let v = this.value;
  const n = this.getAttribute('name');

  // Assign range value to output element
  const o = fontSizeGroup.querySelector('output');
  o.value = parseInt(v);

  // Set aria-valuetext to range value, add label using name attr
  this.setAttribute('aria-valuetext', `${n.replace('-', ' ')}: ${v}`)

  // Assign mapped value from Setting obj to CSS custom property
  document.body.style.setProperty('--content-width', setting[n][v]);
});

const lineHeightGroup = menu.querySelector('[data-setting="line-height"]');
const lineHeightRange = lineHeightGroup.querySelector('input[type="range"]');
const lineHeightHandler = lineHeightRange.addEventListener('input', function() {
  let v = this.value;
  const n = this.getAttribute('name');

  // Assign range value to output element
  const o = fontSizeGroup.querySelector('output');
  o.value = parseInt(v);

  // Set aria-valuetext to range value, add label using name attr
  this.setAttribute('aria-valuetext', `${n.replace('-', ' ')}: ${v}`)

  // Assign mapped value from Setting obj to CSS custom property
  document.documentElement.style.setProperty('--line-height', setting[n][v]);
});

const themeGroup = menu.querySelector('[data-setting="theme"]');
const themes = Array.from(themeGroup.querySelectorAll('[data-theme]'));

const themeHandler = themes.map(typeface => {
  typeface.addEventListener('change', function() {
    if (this.dataset.theme === 'light') {
      document.body.classList.add('light');
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
      }
    } else if (this.dataset.theme === 'dark') {
      document.body.classList.add('dark');
      if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
      }
    } 
  })
});