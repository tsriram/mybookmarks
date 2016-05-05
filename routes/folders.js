var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  req.db.models.Folder.find({}, '_id name', function(err, results){
  	res.send(results);
  });
});

router.post('/', function(req, res, next){
	var folder = new req.db.models.Folder();
	folder.name = req.body.name;
	folder.save(function(err, newFolder){
		if(err){
			if(err.code === 11000){
				res.status(409).json({
					status: 'error',
					msg: 'Folder ' + newFolder.name + ' already exists'
				});	
			}else{
				res.status(500).json({
					status: 'error',
					msg: err.message || err
				})
			}			
		}else{
			res.json({
				status: 'success',
				msg: 'Folder ' + newFolder.name + ' created successfully'
			});	
		}		
	});
});

module.exports = router;
