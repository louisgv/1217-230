"use strict";

// Loading all assets defined in the Store
const loadImages = () => new Promise(function (resolve, reject) {
    PIXI.loader.add(Store.getImages()).load(resolve);
});
