const jwt = require("jsonwebtoken")

module.exports.verifyuser = async (req,res,next)=>{
    try{
        const token = req.cookies.token
        console.log(token)
        const decoded = await jwt.verify(token,"key")
        console.log(decoded.data.name) 
        req.name = decoded.data.name
        
        next()
    }
    catch(e){
        res.status(401).send({error:"please authenticate"})
    }
    
}