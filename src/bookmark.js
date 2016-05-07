var db = require('./db');
var folder = require('./folder');

/**
 * @api {get} /bookmarks Get all bookmarks
 * @apiName GetBookmarks
 * @apiGroup Bookmark
 *
 * @apiSuccessExample {json} Success:
 *   HTTP/1.1 200 OK
 *	[
 *		{
 *			"_id": <bookmark ID>,
 *			"title": <bookmark Title>,
 *			"url": <bookmark URL>,
 *			"folder": <bookmark Folder>,
 *	  }
 *	]
 *
 * @apiErrorExample {json} Error:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": "error",
 *     "msg": <Error Message>
 *   }
 */
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

/**
 * @api {post} /bookmarks Save bookmark
 * @apiName SaveBookmark
 * @apiGroup Bookmark
 *
 * @apiHeader Content-Type `application/json`
 *
 * @apiParam {String} URL Bookmark URL
 * @apiParam {String} Title Bookmark Title
 * @apiParam {String} Folder Bookmark Folder (Will be created if required)
 *
 * @apiSuccessExample {json} Success:
 *   HTTP/1.1 200 OK
 *		{
 *			"status": "success",
 *			"msg": <Success Message>,
 *	  }
 *
 * @apiErrorExample {json} Error:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": "error",
 *     "msg": <Error Message>
 *   }
 */

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

/**
 * @api {put} /bookmarks/:id Update bookmark
 * @apiName UpdateBookmark
 * @apiGroup Bookmark
 *
 * @apiHeader Content-Type `application/json`
 *
 * @apiParam {String} id Bookmark ID
 *
 * @apiParam {String} URL Bookmark URL
 * @apiParam {String} Title Bookmark Title
 * @apiParam {String} Folder Bookmark Folder (Will be created if required)
 *
 * @apiSuccessExample {json} Success:
 *   HTTP/1.1 200 OK
 *		{
 *			"status": "success",
 *			"msg": <Success Message>,
 *	  }
 *
 * @apiErrorExample {json} Error:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": "error",
 *     "msg": <Error Message>
 *   }
 */

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