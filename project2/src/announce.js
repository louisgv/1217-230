const announceEl = document.querySelector('#AnnounceOverlay');

const announceText = announceEl.querySelector('#AnnounceText');

// Flash announcement text popup, then hide it
async function announce(text, duration = 1800, fadeDuration = 500) {
	announceText.innerHTML = text;

	await toggleShow(announceEl, duration);

	await wait(fadeDuration);
}
