var express = require('express');
var router = express.Router();

let blogArray = [];
let id = 1;

/* GET home page. */
router.post('/create', function(req, res, next) {

	let body = req.body;
	body.id = id;
	id+=1;

	blogArray.push(req.body);
	console.log(blogArray);

  res.send('Update successful');
});


router.get('/read/:id', function(req, res, next) {
	let blogId = req.params.id;
	let result = blogArray.find(item =>  item.id == blogId);
	console.log(result);
	res.send(result);
  
});


router.put('/update', function(req, res, next) {
	let id = req.body.id;
	blogArray[id-1] = req.body;
	console.log(req.body); 
  res.send('app update');
});


router.delete('/delete', function(req, res, next) {
  res.send('app delete');
});

router.all('/all', function(req, res, next) {
	res.send(blogArray);
});

module.exports = router;



