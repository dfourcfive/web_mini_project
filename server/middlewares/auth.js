const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode =jwt.verify(token,'corona19')

        req.user=decode
        next()
    }catch(error){
        res.json({
            message:'auth failed'
        })
    }
}
module.export=authenticate