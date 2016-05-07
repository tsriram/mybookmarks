var db = require('./db');
var folder = require('./folder');

function getAll(cb){
	db.models.Bookmark.find({}, '_id title url folder').sort({_id:-1}).exec(function(err, results){
  	if(err){
  		cb({
  			status: 'error',
  			msg: err.message
  		}, null);
  	}
  	cb(null, results);
  });
}

function saveBookmark(data, cb){
	var newBookmark = new db.models.Bookmark();
	newBookmark.title = data.title;
	newBookmark.url = data.url;
	newBookmark.folder = data.folder;
	newBookmark.save(function(err, result){
		if(err){
			console.error(err);
			cb({
				status: 'error',
				msg: err.message
			}, null);
		}else{
			if(data.folder)
				folder.checkAndAdd({name: data.folder});
			cb(null, {
				status: 'success',
				msg: 'Bookmark ' + result.title + ' saved successfully'
			});
		}
	})
}

function updateBookmark(data, cb){
	var ObjectId = require('mongoose').Types.ObjectId;
	db.models.Bookmark.findOne({_id: new ObjectId(data.id)}, function(err, bookmark){
		if(err){
			cb({
				status: 'error',
				msg: err.message
			}, null);
		}else{
			bookmark.title = data.title;
			bookmark.url = data.url;
			bookmark.folder = data.folder;
			bookmark.save(function(err, result){
				if(err){
					cb({
						status: 'error',
						msg: err.message
					}, null);
				}else{
					if(data.folder)
						folder.checkAndAdd({name: data.folder});
					cb(null, {
						status: 'success',
						msg: 'Bookmark ' + result.title + ' updated successfully'
					});
				}
			})
		}
	})
}

exports.getAll = getAll;
exports.save = saveBookmark;
exports.update = updateBookmark;