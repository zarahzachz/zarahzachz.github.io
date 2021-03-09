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

const valueMap = {
  'font-size': ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '32px', '40px', '56px', '72px', '96px', '128px'],
  'line-height': ['1', '1.2', '1.4', '1.6', '1.8', '2', '2.2', '2.4', '2.6'],
  'content-width': ['20em', '25em', '30em', '35em', '40em', '45em', '50em', '55em', '60em']
}

let settings = {
  toggleOptions: function(dataAttr) {
    // Find all radio inputs in settings menu
    const radios = Array.from(menu.querySelectorAll('input[type="radio"]'));

    // Map change event onto each radio input
    return radios.map((radio) => {
      radio.addEventListener('change', function() {
        // If radio has 'checked' attr, grab value of 'data-option'
        if (this.checked) {
          const v = this.dataset.option;

          // If closest value of data-setting matches dataAttr parameter,
          // set CSS variable value to data-option value 
          const s = this.closest('[data-setting]').dataset.setting
          s === dataAttr ? document.body.dataset[dataAttr] = v : null
        }
      });
    });
  },
  rangeOptions: function() {
    // Find all range inputs
    const ranges = Array.from(menu.querySelectorAll('input[type="range"]'));

    // Map input event onto each range input
    return ranges.map(range => {
      range.addEventListener('input', function() {
        const s = this.closest('[data-setting]').dataset.setting;
        const v = this.value;
        const n = this.getAttribute('name');

        // Set aria-valuetext to range value, add label using name attr
        this.setAttribute('aria-valuetext', `${n.replace('-', ' ')}: ${v}`)

        // Assign mapped value from valueMap object to CSS custom property
        const main = document.querySelector('#main-content');
        main.style.setProperty(`--${s}`, valueMap[n][v-1]);
      })
    })
  }
}

settings.toggleOptions('font')
settings.toggleOptions('theme')
settings.rangeOptions()