var express = require('express');
var router = express.Router();
var bookmark = require('../src/bookmark');
router.get('/', function(req, res, next){
  bookmark.getAll(function(err, bookmarks){
  	if(err){
  		res.status(500).json(err)
  	}else{
  		res.send(bookmarks);
  	}
  });
});

router.post('/', function(req, res, next){
	req.validateRequiredFields(['url']);

	var newBookmark = {
		title: req.body.title,
		url: req.body.url,
		folder: req.body.folder
	};

	bookmark.save(newBookmark, function(err, result){
		if(err){
			res.status(500).json(err);
		}else{
			res.json(result);
		}
	})
});

router.put('/:id', function(req, res, next){
	req.validateRequiredFields(['url']);

	var newBookmark = {
		id: req.params.id,
		title: req.body.title,
		url: req.body.url,
		folder: req.body.folder
	};
	
	bookmark.update(newBookmark, function(err, result){
		if(err){
			res.status(500).json(err);
		}else{
			res.json(result);
		}
	})
});

module.exports = router;
