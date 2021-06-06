var express = require('express');
var router = express.Router();
var adminController = require('../Controllers/User/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/fetchusers',function(req,res,next){
	adminController.fetchUserInfo((result) => {
        res.json(result);
    })
});

router.post('/insert',function(req,res){
  if(typeof req.body === 'undefined'){
      res.json({result:'0',message:'no request content'});
  }else{
      adminController.inserUserInfo(req.body,res,(result) => {
        console.log("from insert method from users router...",req.body);
        console.log('result',result.status);
          if(result.status === 400) {
              res.statusCode = result.status;
              res.send(result.data.message);
              return;
          }
          else{
            res.json(result.data);
          }
      });
  }
});

router.delete('/',(req,res) => {

  if(typeof req.body === 'undefined'){
      res.json({result:'error',message:'no content found'});
  }else {
    adminController.deleteUserInfo(req.body,(result) => {
          console.log('result...',result);
          res.json(result);
      })
  }

});


module.exports = router;
