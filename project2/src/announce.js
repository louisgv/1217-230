const AnnounceEl = document.querySelector('#AnnounceOverlay');

const AnnounceText = InfoPopupEl.querySelector('#AnnounceText');

// Flash announcement text popup, then hide it
async function Announce(text, duration = 1800) {
	AnnounceText.innerHTML = text;

	AnnounceEl.classList.add("ShowAnnounce");

	await Wait(duration);

	AnnounceEl.classList.remove("ShowAnnounce");
}
