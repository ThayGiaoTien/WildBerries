const router= require('express').Router()
const categoryCtrl= require('../controllers/categoryCtrl')
const { route } = require('./productRouter')
const auth=require('../middleware/auth')
const authAdmin= require('../middleware/authAdmin')

router.route('/category')
    .post(auth, authAdmin, categoryCtrl.createCategory)
    .get(categoryCtrl.getCategories)
router.get('/descendants', categoryCtrl.getDescendants)



module.exports= router