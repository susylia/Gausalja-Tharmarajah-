document.addEventListener('DOMContentLoaded', () => {
	// Make email links open Gmail's compose window. Read the address from the
	// existing mailto link so the actual email address is never guessed.
	document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
		const address = link.getAttribute('href').slice(7).split(/[?;]/)[0];
		if (!address) return;
		link.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		link.setAttribute('aria-label', `Envoyer un e-mail à ${address} avec Gmail`);
	});

	// Smoothly navigate to in-page sections and close a mobile navigation menu.
	const toggle = document.querySelector('.menu-toggle, .nav-toggle, [aria-controls="primary-navigation"]');
	const menu = document.querySelector('#primary-navigation, .nav-links, nav ul');
	const closeMenu = () => {
		if (!toggle || !menu) return;
		toggle.setAttribute('aria-expanded', 'false');
		menu.classList.remove('is-open', 'open', 'active');
	};

	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener('click', (event) => {
			const href = link.getAttribute('href');
			if (!href || href === '#') return;
			const target = document.getElementById(decodeURIComponent(href.slice(1)));
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			closeMenu();
		});
	});

	if (toggle && menu) {
		toggle.setAttribute('aria-expanded', 'false');
		toggle.addEventListener('click', () => {
			const opening = toggle.getAttribute('aria-expanded') !== 'true';
			toggle.setAttribute('aria-expanded', String(opening));
			menu.classList.toggle('is-open', opening);
			menu.classList.toggle('open', opening);
		});
	}

	// Activate optional reveal elements as they enter the viewport.
	const reveals = document.querySelectorAll('[data-reveal], .reveal');
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((entries, currentObserver) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				currentObserver.unobserve(entry.target);
			});
		}, { threshold: 0.12 });
		reveals.forEach((item) => observer.observe(item));
	} else {
		reveals.forEach((item) => item.classList.add('is-visible'));
	}
});
