const Users= require('../models/userModel')

const authAdmin= async(req, res, next)=>{
    try{
        const user= await Users.findById(req.user.id)  // Get req.user from auth middleware
        if(user.role===0){
            return res.status(400).json({msg: "Admin resources asses denied!"})
        } 
        next()
    }catch(err){
        if(err) return res.status(400).json({msg: err.message})
    }
}
module.exports= authAdmin