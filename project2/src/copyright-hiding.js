const KEY = "COPYRIGHT_STATE"

const CopyrightEl = document.querySelector('#Copyright');

const HideCopyrightEl = document.querySelector('#HideCopyright');

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
	SetData(KEY, newState);
}

// Switching between show and hide copyright element
function ToggleCopyRight() {
	if (GetData(KEY) === "show") {
		ChangeCopyright(true, "hide", "yellow", "black");
	} else {
		ChangeCopyright(false, "show", "#222", "white");
	}
}

// Restore the state of copyright footer from localStorage
function RestoreCopyRightState() {
	if (GetData(KEY) === "show") {
		ChangeCopyright(false, "show", "#222", "white");
	} else {
		ChangeCopyright(true, "hide", "yellow", "black");
	}
}

HideCopyrightEl.addEventListener('click', ToggleCopyRight);
