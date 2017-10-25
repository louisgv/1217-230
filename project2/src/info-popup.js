const InfoPopupEl = document.querySelector('#InfoPopup');

const InfoPopupText = InfoPopupEl.querySelector('#InfoText');

// Flash an info text popup, then retract it
function Info(text, duration = 3600) {
	InfoPopupText.innerHTML = text;

	InfoPopupEl.classList.add("ShowInfo");

	setTimeout(function () {
		InfoPopupEl.classList.remove("ShowInfo");
	}, duration);

}
