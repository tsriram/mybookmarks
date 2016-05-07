var express = require('express');
var router = express.Router();
var folder = require('../src/folder');
router.get('/', function(req, res, next){
  folder.getAll(function(err, folders){
  	if(err){
  		res.status(500).json(err)
  	}else{
  		res.send(folders);
  	}
  });
});

router.post('/', function(req, res, next){
	req.validateRequiredFields(['name']);
	
	var newFolder = {
		name: req.body.name
	};
	// var folder = new req.db.models.Folder();
	// folder.name = req.body.name;
	// folder.save(function(err, newFolder){
	// 	if(err){
	// 		if(err.code === 11000){
	// 			res.status(409).json({
	// 				status: 'error',
	// 				msg: 'Folder ' + newFolder.name + ' already exists'
	// 			});	
	// 		}else{
	// 			res.status(500).json({
	// 				status: 'error',
	// 				msg: err.message || err
	// 			})
	// 		}			
	// 	}else{
	// 		res.json({
	// 			status: 'success',
	// 			msg: 'Folder ' + newFolder.name + ' created successfully'
	// 		});	
	// 	}		
	// });
	folder.save(newFolder, function(err, result){
		if(err){
			res.status(500).json(err);
		}else{
			res.json(result);
		}
	})
});

module.exports = router;
