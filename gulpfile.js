let gulp = require('gulp');

let updateItemIds = require('./gulp-tasks/update-item-ids')
let addEmptySlotArrays = require('./gulp-tasks/add-empty-slot-arrays')

gulp.task('updateItemIds', () => {
	updateItemIds();
});

gulp.task('addEmptySlotArrays', () => {
	addEmptySlotArrays();
});