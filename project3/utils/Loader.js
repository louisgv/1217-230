"use strict";

// Loading all assets defined in the Store
const loadAssets = () => new Promise(function (resolve, reject) {
    PIXI.loader.add(ASSETS).load(resolve);
});
