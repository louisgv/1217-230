const data = {
	TURN: 0, // 0 Player, 1 NPC
	
}

function GetData(key) {
	if (data.hasOwnProperty(key)) {
		return data[key];
	} else {
		return null;
	}
}

function SetData(key, value) {
	data[key] = value;
}
