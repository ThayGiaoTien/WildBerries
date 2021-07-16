const Products= require('../models/productModel')

const productCtrl= {
    createProduct: async(req, res)=>{
        try{
            const {title, price, description, images, category, quantity}= req.body
            if(!images) return res.status(400).json({ msg: "No image upload."})
            const existProduct= await Products.findOne({title})
            if(existProduct) return res.status(400).json({msg: "This product title already exists."})

            const newProduct= new Products({
                title, price, description, images, category, quantity
            })

            await newProduct.save()
            res.json({msg: "Created a new product! "})
        }catch(err){
            if(err) return res.json({msg: err.message})
        }

    },
    getProducts: async(req, res)=>{
        try{
            const products= await Products.find().populate(
                'category'
            )
            res.json({products})
            console.log({products})

        }
        catch(err){
            if(err) return res.status(500).json({msg: err.meassage})
        }
    }
}
 
module.exports= productCtrl