const announceEl = document.querySelector('#AnnounceOverlay');

const announceText = announceEl.querySelector('#AnnounceText');

// Flash announcement text popup, then hide it
async function announce(text, duration = 1800) {
	announceText.innerHTML = text;

	announceEl.classList.add("ShowAnnounce");

	await wait(duration);

	announceEl.classList.remove("ShowAnnounce");
}
