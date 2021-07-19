const Users= require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')


const userCtrl= {
    register: async(req, res)=>{
        try{
            const {name, email, password, telephone_number} = req.body
            const existUser= await Users.findOne({email}) 
            if(existUser) return res.status(400).json({msg: 'This email has been used.'})

            if(password.length<6) return res.status(400).json({msg: "Password is too weak!"})
            const hashedPassword= await bcrypt.hash(password, 9)

            const newUser= new Users({
                name, email, password: hashedPassword, telephone_number
            })
            await newUser.save()

            // Create access_token and refresh_token and write into cookie
            const access_token= createAccessToken({id: newUser._id})
            const refresh_token= createRefreshToken({id: newUser._id})
            
            res.cookie("refresh_token", refresh_token,{
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7days
            })

            res.json({access_token, msg: "Registered successful!"})

        }catch(err){
            if(err){
                return res.status(500).json({msg: err.message})
            }
        }
        

    }, 
    login: async(req, res)=>{
        try{
            const {email, password} = req.body
            const thisUser= await Users.findOne({email})

            if(!thisUser) return res.status(400).json({msg: "This email does not exists."})

            const isMatch= await bcrypt.compare(password, thisUser.password)
            if(!isMatch) return res.status(400).json({msg: "Invalid password. Try again! "})

            // Create access_token and refresh_token and write into cookie
            const access_token= createAccessToken({id: thisUser._id})
            const refresh_token= createRefreshToken({id: thisUser._id})
            res.cookie("refresh_token", refresh_token,{
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7days
            })

            res.json({access_token, refresh_token, msg: "Logged in successful!"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async(req, res)=>{
        try{
            res.clearCookie('refresh_token', {path: 'user/refresh_token'})
            res.json({msg: "Logged out!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: async(req, res)=>{
        try{
            const rf_token= req.cookies.refresh_token;
            if(!rf_token) return res.status(400).json({msg: "Please register or log in!"})

            // Verify to get user._id and create new access_token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
                if(err) return res.status(400).json({msg: "Invalid authentication"})
                const access_token= createAccessToken({id: user._id} )
                res.json(access_token)
            })
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    getUser: async(req, res)=>{
        try{
            const user= await Users.findById(req.user.id).select('-password')
            if(!user ) return res.status(400).json({msg: "This user does not exists."})
            res.json({user})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    history: async(req, res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    addCart: async(req, res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

}



const createAccessToken=  (user_id)=>{
    return jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '9m'})
}
const createRefreshToken= (user_id)=>{
    return jwt.sign(user_id, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports= userCtrl