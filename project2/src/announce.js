const announceEl = document.querySelector('#AnnounceOverlay');

const announceText = announceEl.querySelector('#AnnounceText');

// Flash announcement text popup, then hide it
async function announce(text, duration = 1800, fadeDuration = 500) {
	announceEl.classList.add("ShowAnnounce");

	announceText.innerHTML = text;

	await wait(duration);

	announceEl.classList.remove("ShowAnnounce");

	await wait(fadeDuration);
}
