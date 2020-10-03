const User = require('../models/User')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')


const getMyModules=(req,res)=>{
    /* User.find({"_id":req.params.id},function(err,users){
        var ModulesMap=[];
        users.forEach(function(user,i){
          ModulesMap[i]=user.Modules
        }) 
        res.send(users.Modules)
    }) 
    */
    User.findById(req.params.id,function(err,user){
        return res.send(user.Modules)
    })
}

const getAllModules=(req,res)=>{
  User.find({},function(err,users){
      var ModulesMap=[];
      users.forEach(function(user,i){
        user.Modules.forEach(function(m,j){
            ModulesMap[i+j]=m
        })
      })
      res.send(ModulesMap)
  })
}
const delete_module=(req,res)=>{
    User.update({"_id":req.params.id},{$pull:{"Modules":{_id:req.params.idModule}}},function(err,rew){
        if(!err){res.send('deleted succesfully')}
    });
}
const update_module=(req,res)=>{
    if(!req.body) {
        return res.status(400).send({
            message: "Body content cannot be empty"
        }); 
    }
    User.update({"_id":req.params.id,'Modules._id':req.params.idModule},{
        '$set':{
            'Modules.$.nom':req.body.nom,
            'Modules.$.description':req.body.description,
            'Modules.$.cours':req.body.cours
        }
    })
    .then(user=>{
        if(!user){
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }

        res.send(user)
    }).catch(err=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating module with id " + req.params.idModule
        });
    })
}


const create=(req, res) =>{
    if(!req.body) {
        return res.status(400).send({
            message: "Body content cannot be empty"
        });
    }
    User.findByIdAndUpdate(req.params.id,
        {$push:{Modules:req.body}}
    ,{new:true})
    .then(user=>{
        if(!user){
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }

        res.send(user)
    }).catch(err=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    })

}
module.exports={
    create,update_module,getAllModules,getMyModules,delete_module
}