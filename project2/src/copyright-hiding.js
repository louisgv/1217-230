const KEY = "COPYRIGHT_STATE"

const CopyrightEl = document.querySelector('#Copyright');

const HideCopyrightEl = document.querySelector('#HideCopyright');

function changeCopyright(currentState, innerHTML, background, color) {
	CopyrightEl.style.opacity = currentState
		? 1
		: 0;
	CopyrightEl.style.pointerEvents = currentState
	 	? "all"
		: "none";

	HideCopyrightEl.innerHTML = innerHTML;
	HideCopyrightEl.style.background = background;
	HideCopyrightEl.style.color = color;
	SetData(KEY, !currentState);
}

HideCopyrightEl.addEventListener('click', function (e) {
	if (GetData(KEY)) {
		changeCopyright(true, "hide", "yellow", "black");
	} else {
		changeCopyright(false, "show", "#222", "white");
	}
});
