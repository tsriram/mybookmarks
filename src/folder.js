var db = require('./db');

function getAll(cb){
	db.models.Folder.find({}, '_id name', function(err, results){
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

function save(data, cb){
	var newFolder = new db.models.Folder();
	newFolder.name = data.name;
	newFolder.save(function(err, folder){
		if(err){
			cb({
				status: 'error',
				msg: err.message
			}, null);
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