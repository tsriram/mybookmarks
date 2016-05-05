var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  req.db.models.Bookmark.find({}, '_id title url folder', function(err, results){
  	res.send(results);
  });
});

router.post('/', function(req, res, next){
	var bookmark = new req.db.models.Bookmark();
	bookmark.title = req.body.title;
	bookmark.url = req.body.url;
	bookmark.folder = req.body.folder;
	bookmark.save(function(err, newBookmark){
		if(err){
			res.status(500).json({
				status: 'error',
				msg: err.message || err
			});
		}
		res.json({
			status: 'success',
			msg: 'Bookmark ' + newBookmark.title + ' saved successfully'
		});
	})
});

router.put('/:id', function(req, res, next){
	var id = req.params.id;
	var ObjectId = require('mongoose').Types.ObjectId;
	req.db.models.Bookmark.findOne({_id: new ObjectId(id)}, function(err, bookmark){
		if(err){
			res.status(500).json({
				status: 'error',
				msg: err.message || err
			});
		}
		bookmark.title = req.body.title || bookmark.title;
		bookmark.url = req.body.url || bookmark.url;
		bookmark.folder = req.body.folder || bookmark.folder;
		bookmark.save(function(err, newBookmark){
			if(err){
				res.status(500).json({
					status: 'error',
					msg: err.message || err
				});
			}
			res.json({
				status: 'success',
				msg: 'Bookmark ' + newBookmark.title + ' updated successfully'
			})
		})
	});
});

module.exports = router;
