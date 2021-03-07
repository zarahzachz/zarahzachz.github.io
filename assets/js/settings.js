const menuButton = document.querySelector('.js-settings-menu-trigger');
const menu = document.querySelector('.js-settings-menu');

menuButton.addEventListener('click', (e) => {
	if (menuButton.getAttribute('aria-expanded') === 'true') {
		menuButton.setAttribute('aria-expanded', 'false');
    menu.setAttribute('hidden', true)
  }	else if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.setAttribute('aria-expanded', 'true')
    menu.removeAttribute('hidden')
  }
})
