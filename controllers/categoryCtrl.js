const Category= require('../models/categoryModel')



const categoryCtrl= {
    createCategory: async(req, res)=>{
        let parent= req.body.parent ? req.body.parent : null;

        try{
            // const { name} = req.body
            // const existCategory= await Categories.findOne({name})
            // if(existCategory) return res.status(400).json({msg: 'This category is used.'})

            const newCategory= new Category({
                name: req.body.name,
                parent
            })
            await newCategory.save()
            buildAncestors(newCategory._id, parent)
            res.json({msg: 'Created a new category!'})


        }catch(err){
            if(err) return res.status(500).json({
                msg: err.message
            })
        }
        
    }, 
    getCategories: async(req, res)=>{                         // slug: req.query.slug 
        try {
            const result = await Category.find({})
            .select({
            "_id": true, 
            "name": true,
            "parent": true,
            "ancestors": true}).exec();
            res.status(201).send({ "status": "success", "result": result     });
       } catch (err) {
           res.status(500).send(err);
       }
    },
    getDescendants: async(req, res)=>{
        try{
            const result = await Category.find({ "ancestors._id":   req.query.category_id })   // vd "60f2d9a45949663c1d8b3c94"
            .select({ "_id": false, "name": true })
            .exec();

             res.status(201).send({ "status": "success", "result": result });
        } catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}


const buildAncestors = async (id, parent_id) => {
   let ancest= []
    try {
        let parent_category = await Category.findOne({ "_id": parent_id },{ "name": 1, "slug": 1, "ancestors": 1 });
        if( parent_category ) {
            const { _id, name, slug } = parent_category;
            const ancest = [...parent_category.ancestors];                              // if parent_category has ancestors, extends it by adding {_id, name, slug} of parent_category                    
            ancest.unshift({ _id, name, slug })                                                         // unshift add one or more elements to the beginning of an array and return the new length of the array.
            const category = await Category.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });   // replaces the value of a field with specified value.
        }
    } catch (err) {
            console.log(err.message)
        }
}


module.exports= categoryCtrl


// https://medium.com/swlh/crud-operations-on-mongodb-tree-data-structure-f5afaeca1550

