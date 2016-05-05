var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.connect = function(url){
	mongoose.connect(url, function(err){
		if(err)
			throw err;
	});
	return exports;
}

// Bookmark schema
var BookmarkSchema = new Schema({
	title: String,
	url: String,
	folder: String
});

var FolderSchema = new Schema({
	name: {type: String, unique: true}
});

exports.db = mongoose;
exports.models = {
	Bookmark: mongoose.model('Bookmark', BookmarkSchema),
	Folder: mongoose.model('Folder', FolderSchema)
};