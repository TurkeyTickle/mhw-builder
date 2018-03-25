let fs = require('fs');

let heads = require('../src/assets/heads.json');
let chests = require('../src/assets/chests.json');
let hands = require('../src/assets/hands.json');
let legs = require('../src/assets/legs.json');
let feet = require('../src/assets/feet.json');
let charms = require('../src/assets/charms.json');

let greatSwords = require('../src/assets/great-swords.json');
let longSwords = require('../src/assets/long-swords.json');
let swordAndShields = require('../src/assets/sword-and-shields.json');
let dualBlades = require('../src/assets/dual-blades.json');
let hammers = require('../src/assets/hammers.json');
let huntingHorns = require('../src/assets/hunting-horns.json');
let lances = require('../src/assets/lances.json');
let gunlances = require('../src/assets/gunlances.json');
let switchAxes = require('../src/assets/switch-axes.json');
let chargeBlades = require('../src/assets/charge-blades.json');
let insectGlaives = require('../src/assets/insect-glaives.json');
let lightBowguns = require('../src/assets/light-bowguns.json');
let heavyBowguns = require('../src/assets/heavy-bowguns.json');
let bows = require('../src/assets/bows.json');

function addEmptySlotArrays() {
	addSlotArrays('./src/assets/heads.json', heads);
	addSlotArrays('./src/assets/chests.json', chests);
	addSlotArrays('./src/assets/hands.json', hands);
	addSlotArrays('./src/assets/legs.json', legs);
	addSlotArrays('./src/assets/feet.json', feet);
	addSlotArrays('./src/assets/charms.json', charms);
	
	addSlotArrays('./src/assets/great-swords.json', greatSwords);
	addSlotArrays('./src/assets/long-swords.json', longSwords);
	addSlotArrays('./src/assets/sword-and-shields.json', swordAndShields);
	addSlotArrays('./src/assets/dual-blades.json', dualBlades);
	addSlotArrays('./src/assets/hammers.json', hammers);
	addSlotArrays('./src/assets/hunting-horns.json', huntingHorns);
	addSlotArrays('./src/assets/lances.json', lances);
	addSlotArrays('./src/assets/gunlances.json', gunlances);
	addSlotArrays('./src/assets/switch-axes.json', switchAxes);
	addSlotArrays('./src/assets/charge-blades.json', chargeBlades);
	addSlotArrays('./src/assets/insect-glaives.json', insectGlaives);
	addSlotArrays('./src/assets/light-bowguns.json', lightBowguns);
	addSlotArrays('./src/assets/heavy-bowguns.json', heavyBowguns);
	addSlotArrays('./src/assets/bows.json', bows);	
}

function addSlotArrays(filePath, items) {
	let addedSlot = false;

	for (let item of items) {
		let slots = item['slots'];
		if (!slots) {
			item['slots'] = [];
			addedSlot = true;
			console.log('added slots to ' + item.name);
		}
	}

	if (addedSlot) {
		fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
	}
}

module.exports = addEmptySlotArrays;