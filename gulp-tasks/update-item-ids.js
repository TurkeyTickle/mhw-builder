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

let decorations = require('../src/assets/decorations.json');

function updateItemIds() {
	let maxArmorId = 0;

	maxArmorId = getMaxId(heads, maxArmorId);
	maxArmorId = getMaxId(chests, maxArmorId);
	maxArmorId = getMaxId(hands, maxArmorId);
	maxArmorId = getMaxId(legs, maxArmorId);
	maxArmorId = getMaxId(feet, maxArmorId);
	maxArmorId = getMaxId(charms, maxArmorId);

	console.log('max armor id is ' + maxArmorId);

	maxArmorId = assignIds('../src/assets/heads.json', heads, maxArmorId);
	maxArmorId = assignIds('../src/assets/chests.json', chests, maxArmorId);
	maxArmorId = assignIds('../src/assets/hands.json', hands, maxArmorId);
	maxArmorId = assignIds('../src/assets/legs.json', legs, maxArmorId);
	maxArmorId = assignIds('../src/assets/feet.json', feet, maxArmorId);
	maxArmorId = assignIds('../src/assets/charms.json', charms, maxArmorId);

	console.log('new max armor id is ' + maxArmorId);

	let maxWeaponId = 0;

	maxWeaponId = getMaxId(greatSwords, maxWeaponId);
	maxWeaponId = getMaxId(longSwords, maxWeaponId);
	maxWeaponId = getMaxId(swordAndShields, maxWeaponId);
	maxWeaponId = getMaxId(dualBlades, maxWeaponId);
	maxWeaponId = getMaxId(hammers, maxWeaponId);
	maxWeaponId = getMaxId(huntingHorns, maxWeaponId);
	maxWeaponId = getMaxId(lances, maxWeaponId);
	maxWeaponId = getMaxId(gunlances, maxWeaponId);
	maxWeaponId = getMaxId(switchAxes, maxWeaponId);
	maxWeaponId = getMaxId(chargeBlades, maxWeaponId);
	maxWeaponId = getMaxId(insectGlaives, maxWeaponId);
	maxWeaponId = getMaxId(lightBowguns, maxWeaponId);
	maxWeaponId = getMaxId(heavyBowguns, maxWeaponId);
	maxWeaponId = getMaxId(bows, maxWeaponId);

	console.log('max weapon id is ' + maxWeaponId);
	
	maxWeaponId = assignIds('../src/assets/great-swords.json', greatSwords, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/long-swords.json', longSwords, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/sword-and-shields.json', swordAndShields, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/dual-blades.json', dualBlades, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/hammers.json', hammers, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/hunting-horns.json', huntingHorns, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/lances.json', lances, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/gunlances.json', gunlances, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/switch-axes.json', switchAxes, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/charge-blades.json', chargeBlades, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/insect-glaives.json', insectGlaives, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/light-bowguns.json', lightBowguns, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/heavy-bowguns.json', heavyBowguns, maxWeaponId);
	maxWeaponId = assignIds('../src/assets/bows.json', bows, maxWeaponId);

	console.log('new max weapon id is ' + maxWeaponId);

	let maxDecorationId = 0;

	maxDecorationId = getMaxId(decorations, maxDecorationId);

	console.log('max decoration id is ' + maxDecorationId);
	
	maxDecorationId = assignIds('../src/assets/decorations.json', decorations, maxDecorationId);
	
	console.log('new max decoration id is ' + maxDecorationId);
}

function getMaxId(items, maxId) {
	for (let item of items) {
		let id = item['id'];
		if (id && id > maxId) {
			maxId = id;
		}
	}

	return maxId;
}

function assignIds(filePath, items, maxId) {
	let newMaxId = maxId;
	for (let item of items) {
		let id = item['id'];
		if (!id) {
			newMaxId++;
			item['id'] = newMaxId;
			console.log('added id ' + newMaxId + ' to ' + item.name);
		}
	}

	if (newMaxId > maxId) {
		fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
	}

	return newMaxId;
}

module.exports = updateItemIds;