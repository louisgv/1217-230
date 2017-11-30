// Async promise to wait for certain amount
const wait = (duration) => new Promise(function (resolve, reject) {
	setTimeout(resolve, duration);
})
