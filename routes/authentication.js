const User = require('../models/user'); // Import User Model Schema
const config = require('../config/database'); // Import database configuration

module.exports = (router) => { 

    router.post('/register',(req,res)=>{
        console.log(req.body);
       if(!req.body.firstname){
            res.json({ success:false , message:'No username found!!'});
       } else {
           if(!req.body.topic){
            res.json({ success:false , message:'No topics found'});
           } else {
               let user = new User({
                   firstname: req.body.firstname,
                   lastname: req.body.lastname,
                   gender: req.body.gender,
                   topics: [
                       {
                            topic: req.body.topic
                       }
                   ]
               });

               user.save((err) => {
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                        res.json({ success:true , message:'Account Registered'});
                    }
               });
           }
       }
    });

    router.get('/register',(req,res)=>{
        User.find({ },'firstname topics',(err,data)=>{
            if (err){
                res.json({ success:false , message:err});
            } else {
                res.json({ success:true , message:data});
            }
        });
    });

    return router;
}
