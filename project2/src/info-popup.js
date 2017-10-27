const InfoPopupEl = document.querySelector('#InfoPopup');

const InfoPopupText = InfoPopupEl.querySelector('#InfoText');

// Flash an info text popup, then retract it
async function Info(text, duration = 3600) {
	InfoPopupText.innerHTML = text;

	InfoPopupEl.classList.add("ShowInfo");

	await Wait(duration);

	InfoPopupEl.classList.remove("ShowInfo");
}
