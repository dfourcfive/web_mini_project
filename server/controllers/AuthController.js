const User = require('../models/User')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const registre = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10 ,function(err,encrypted){
        if(err){
            res.json({
                error:err
            })
        }
        let user=new User({
            email:req.body.email,
            password:encrypted,
        })
        user.save().then(
            user=>{
                res.json({
                    id:user._id,
                    message:'user added successfully '+user.email
                    
                })
            }
        ).catch(error=>{
            res.json({
                message:'An error occured'
            })
        })
    })
}


const login=(req,res,next)=>{
    var email = req.body.email
    var password=req.body.password

    User.findOne({$or:[{email:email},{password:password}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                    return;
                }
                if(result){
                    let token=jwt.sign({
                        email:user.email
                    },'corona19',{expiresIn:'6h'})
                    res.json({
                        id:user.id,
                        message:'Login Succesful!',
                        token
                    })
                    return;
                }
                else{
                    res.json({
                        message:'Password does not matched '
                    })
                    return;
                }
            })
        }else{
            res.json({
                message:'no user found'
                
            })
            return;
        }
    })
}


module.exports={
    registre,login
}