let gulp = require('gulp');
let fs = require('fs');

let heads = require('./src/assets/heads.json');
let chests = require('./src/assets/chests.json');
let hands = require('./src/assets/hands.json');
let legs = require('./src/assets/legs.json');
let feet = require('./src/assets/feet.json');
let charms = require('./src/assets/charms.json');

gulp.task('updateItemIds', () => {
	let maxArmorId = 0;

	maxArmorId = getMaxId(heads, maxArmorId);
	maxArmorId = getMaxId(chests, maxArmorId);
	maxArmorId = getMaxId(hands, maxArmorId);
	maxArmorId = getMaxId(legs, maxArmorId);
	maxArmorId = getMaxId(feet, maxArmorId);
	maxArmorId = getMaxId(charms, maxArmorId);

	console.log('max id is ' + maxArmorId);

	maxArmorId = assignIds('./src/assets/heads.json', heads, maxArmorId);
	maxArmorId = assignIds('./src/assets/chests.json', chests, maxArmorId);
	maxArmorId = assignIds('./src/assets/hands.json', hands, maxArmorId);
	maxArmorId = assignIds('./src/assets/legs.json', legs, maxArmorId);
	maxArmorId = assignIds('./src/assets/feet.json', feet, maxArmorId);
	maxArmorId = assignIds('./src/assets/charms.json', charms, maxArmorId);

	console.log('new max id is ' + maxArmorId);
});

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