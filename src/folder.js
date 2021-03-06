var db = require('./db');

/**
 * @api {get} /folders Get all bookmark folders
 * @apiName GetFolders
 * @apiGroup Folder
 *
 * @apiSuccessExample {json} Success:
 *   HTTP/1.1 200 OK
 *	[
 *		{
 *			"_id": <folder ID>,
 *			"name": <folder name>,
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
	db.models.Folder.find({}, '_id name').sort({_id:-1}).exec(function(err, results){
  	if(err){
  		cb({
  			status: 'error',
  			msg: err.message
  		}, null);
  	}else{
  		cb(null, results);
  	}
  });
}

/**
 * @api {post} /folders Save folder
 * @apiName SaveFolder
 * @apiGroup Folder
 *
 * @apiHeader Content-Type `application/json`
 *
 * @apiParam {String} name Folder name
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

function save(data, cb){
	var newFolder = new db.models.Folder();
	newFolder.name = data.name;
	newFolder.save(function(err, folder){
		if(err){
			if(err.code === 11000){
				cb({
					status: 'error',
					msg: 'Folder ' + data.name + ' exists already'
				}, null);
			}else{
				cb({
					status: 'error',
					msg: err.message
				}, null);	
			}			
		}else{
			cb(null, {
				status: 'success',
				msg: 'Folder ' + folder.name + ' created successfully'
			});
		}
	});
}

function checkAndAdd(data){
	console.log('checkAndAdd', data.name);
	db.models.Folder.findOne({name: data.name}, function(err, result){
		console.log(err, result);
		if(result){
			console.log('Folder ' + data.name + ' exists already');			
		}else{
			var newFolder = new db.models.Folder();
			newFolder.name = data.name;
			newFolder.save(function(err, folder){
				if(err){
					console.error(err);
				}else{
					console.log('Folder ' + folder.name + ' saved successfully');
				}
			});
		}
	})
	
}

exports.getAll = getAll;
exports.save = save;
exports.checkAndAdd = checkAndAdd;