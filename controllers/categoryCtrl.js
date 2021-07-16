const Categories= require('../models/categoryModel')

const categoryCtrl= {
    createCategory: async(req, res)=>{
        try{
            const { name, path} = req.body
            const existCategory= await Categories.findOne({name})
            if(existCategory) return res.status(400).json({msg: 'This category is used.'})

            const newCategory= new Categories({
                name, path
            })
            await newCategory.save()
            
            res.json({msg: 'Created a new category!'})


        }catch(err){
            if(err) return res.status(500).json({
                msg: err.message
            })
        }
        
    }
}
module.exports= categoryCtrl