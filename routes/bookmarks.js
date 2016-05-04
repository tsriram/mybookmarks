var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  req.db.models.Bookmark.find(function(err, results){
  	res.send(results);
  });
});

router.post('/', function(req, res, next){
	console.log(req.body);
	var bookmark = new req.db.models.Bookmark();
	bookmark.title = req.body.title;
	bookmark.url = req.body.url;
	bookmark.folder = req.body.folder;
	bookmark.save(function(err, bookmark){
		if(err){
			res.status(500).json({
				status: 'error',
				msg: err.message || err
			});
		}
		res.json({
			status: 'success',
			msg: 'Bookmark ' + bookmark.title + ' saved successfully'
		});
	})
});

module.exports = router;
