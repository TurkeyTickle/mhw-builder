
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

let _ = require('lodash');
import fs from 'fs';

export function exportWeaponCSV() {
	// addSlotArrays('./src/assets/heads.json', heads);
	// addSlotArrays('./src/assets/chests.json', chests);
	// addSlotArrays('./src/assets/hands.json', hands);
	// addSlotArrays('./src/assets/legs.json', legs);
	// addSlotArrays('./src/assets/feet.json', feet);
	// addSlotArrays('./src/assets/charms.json', charms);

	let allRows = 'id,weaponType,rarity,name,baseAttack,baseAffinityPercent,baseDefense,element,elementBaseAttack,elementHidden,ailment,ailmentBaseAttack,ailmentHidden,elderseal,sharpnessDataNeeded,sharpnessLevels,slots,tags\n';

	allRows += getRows(bows)
	allRows += getRows(chargeBlades)
	allRows += getRows(dualBlades)
	allRows += getRows(greatSwords)
	allRows += getRows(gunlances)
	allRows += getRows(hammers)
	allRows += getRows(heavyBowguns)
	allRows += getRows(huntingHorns)
	allRows += getRows(insectGlaives)
	allRows += getRows(lances)
	allRows += getRows(lightBowguns)
	allRows += getRows(longSwords)
	allRows += getRows(switchAxes)
	allRows += getRows(swordAndShields)

	fs.writeFileSync('./src/assets/weapons.csv', allRows);
}

function importWeaponCSV() {
	fs.readFileSync('./src/assets/weapons.csv', 'utf8', function (err, data) {
		CSVParser
	});
}

function getRows(items) {
	let result = '';

	items = _.orderBy(items, ['rarity', 'name'], ['asc', 'asc'])

	for (let item of items) {
		result += addColumnValue(item['id'], 'NEED ID');
		result += addColumnValue(item['weaponType'], '');
		result += addColumnValue(item['rarity'], 0);
		result += addColumnValue(item['name'], '');
		result += addColumnValue(item['baseAttack'], 0);
		result += addColumnValue(item['baseAffinityPercent'], 0);
		result += addColumnValue(item['baseDefense'], 0);
		result += addColumnValue(item['element'], '');
		result += addColumnValue(item['elementBaseAttack'], '');
		result += addColumnValue(item['elementHidden'], '');
		result += addColumnValue(item['ailment'], '');
		result += addColumnValue(item['ailmentBaseAttack'], '');
		result += addColumnValue(item['ailmentHidden'], '');
		result += addColumnValue(item['elderseal'], '');
		result += addColumnValue(item['sharpnessDataNeeded'], false);

		if (item['sharpnessLevels']) {
			result += addColumnValue(_.map(item['sharpnessLevels'], function(i) { return `${i.color}-${i.value}`; }).join(';'), '');
		} else {
			result += ','
		}

		if (item['slots']) {
			let slotLevels = [];
			for (let slot of item['slots']) {
				slotLevels.push(slot.level)
			}

			result += addColumnValue(slotLevels.join(';'), '');
		} else {
			result += ','
		}

		if (item['tags']) {
			result += addColumnValue(item['tags'].join(';'), '', true);
		} else {
			result += '\n'
		}
	}

	return result;
}

function addColumnValue(value, defaultValue, endRow) {
	let result = '';

	if (value !== undefined) {
		result += value;
	} else {
		result += defaultValue;
	}

	if (endRow) {
		result = result + '\n';
	} else {
		result = result + ',';
	}

	return result;
}