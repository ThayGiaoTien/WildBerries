const router= require('express').Router()
const categoryCtrl= require('../controllers/categoryCtrl')
const { route } = require('./productRouter')

router.route('/category')
    .post(categoryCtrl.createCategory)
    .get(categoryCtrl.getCategories)
router.get('/descendants', categoryCtrl.getDescendants)

module.exports= router