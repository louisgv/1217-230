const CopyrightEl = document.querySelector('#Copyright');

const HideCopyrightEl = document.querySelector('#HideCopyright');

// Change the state of the copyright notice based on its new state
function ChangeCopyright(isShow, newState, background, color) {
	CopyrightEl.style.opacity = isShow
		? 1
		: 0;
	CopyrightEl.style.pointerEvents = isShow
	 	? "all"
		: "none";

	HideCopyrightEl.innerHTML = newState;
	HideCopyrightEl.style.background = background;
	HideCopyrightEl.style.color = color;
	SetData(STOREKEY.COPYRIGHT_STATE, newState);
}

// Switching between show and hide copyright element
function ToggleCopyRight() {
	if (GetData(STOREKEY.COPYRIGHT_STATE) === "show") {
		ChangeCopyright(true, "hide", "yellow", "black");
	} else {
		ChangeCopyright(false, "show", "#222", "white");
	}
}

// Restore the state of copyright footer from localStorage
function RestoreCopyRightState() {
	if (GetData(STOREKEY.COPYRIGHT_STATE) === "show") {
		ChangeCopyright(false, "show", "#222", "white");
	} else {
		ChangeCopyright(true, "hide", "yellow", "black");
	}
}

HideCopyrightEl.addEventListener('click', ToggleCopyRight);

window.addEventListener('load', RestoreCopyRightState);
