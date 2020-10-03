const mongoose=require('mongoose')
const schema =mongoose.Schema


const UserSchema = new schema({
    email:{
        type:String,
        require:true  
    },
    password:{
        type:String,
        require:true,
    },
    Modules:[{
        nom:{
            type:String,
        },
        description:{
            type:String,
        },
        cours:[{
            titre:{
                type:String,
            },
            description:{
                type:String
            }
        }]
    }]
},{
    timestamps:true
})


const User = mongoose.model('User',UserSchema)
module.exports=User
